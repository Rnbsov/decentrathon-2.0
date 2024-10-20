from fastapi import APIRouter, Body, HTTPException,UploadFile,File,Request
from fastapi.responses import JSONResponse
from typing import Dict
from app.services.doc import add_doctor, get_doctor_by_doctor_id
from app.models.schemas import Doctors,OpenAI_Answer,User_data,User
from app.services.user import (add_user, get_user_by_tg_id,
                               get_user_data_by_user_id,add_user_data
                               )
from app.services.ai import get_answer_by_user_id,add_answer
from database.settings import doc_orders
from openai import OpenAI
from datetime import datetime
from pathlib import Path
from pydub import AudioSegment
from aiogram import Bot
import httpx
from fastapi.responses import StreamingResponse
import io
import aiofiles
# import speech_recognition as sr
import hashlib, os, hmac
import asyncio
import json

API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=API_KEY)
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
LINK = os.getenv("LINK")

tmp_dir = "/tmp/"
if not os.path.exists(tmp_dir):
    os.makedirs(tmp_dir)

bot = Bot(token=TOKEN)

#if not TELEGRAM_BOT_TOKEN:
#    raise ValueError("Please set the TELEGRAM_BOT_TOKEN environment variable.")

#SECRET_KEY = hashlib.sha256(TELEGRAM_BOT_TOKEN.encode()).digest()

#=======================NEED PZDC TEST============================

async def convert_mp3_to_wav(mp3_file_path: str, wav_file_path: str):
    audio = AudioSegment.from_mp3(mp3_file_path) #using ffmpeg
    audio.export(wav_file_path, format="wav")


async def transcribe_audio_async(wav_file_path: str) -> str:
    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_file_path) as source:
        audio_data = recognizer.record(source)
        try:
            return await asyncio.to_thread(
                recognizer.recognize_google, audio_data, language="ru-RU"
            )
        except sr.UnknownValueError:
            return "Sorry, could not understand the audio."
        except sr.RequestError as e:
            return f"Could not request results from Google Web Speech API; {e}"

#===================================================


async def request_to_openai(message):
    try:
        completion = await asyncio.to_thread(
            client.chat.completions.create,
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Вы — консультант и помощник в сфере медицины. Отвечайте лаконично на запросы пользователей, анализируя их данные. Отвечайте в дружелюбной форме, обращаясь на «вы». На неуместные вопросы не реагируйте. По вопросам ментального здоровья предлагайте техники, упражнения или ресурсы для снятия стресса, но не ставьте диагнозов — лишь рекомендуйте возможные и предлагайте записаться к специалисту всегда упоминая MediCare+ Clinic. Делайте вид, что делаете запись"},
                {"role": "user", "content": f"Сообщение пациента: {message}"}
            ]
        )
        print("test123")
        return completion.choices[0].message.content
    
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return "Error retrieving response from OpenAI."


async def check_init_data(init_data: dict, secret_key: bytes) -> bool:
    check_string = "\n".join([f"{k}={v}" for k, v in sorted(init_data.items()) if k != "hash"])
    secret_hash = hmac.new(secret_key, check_string.encode(), hashlib.sha256).hexdigest()
    return secret_hash == init_data.get("hash")

api_router: APIRouter = APIRouter()


@api_router.post("/auth", response_model=User)
async def api_auth(body: Dict[str, str] = Body(...)):
    tg_id: int = body.get("tg_id")
    username: str = body.get("username")
    name: str = body.get("name")
    surname: str = body.get("surname")
    avatar_url: str = body.get("avatar_url")

    if not tg_id:
        return JSONResponse(content={"result": 400, "data": "Неверный формат данных."}, status_code=400)

    try:
        existing_user = await get_user_by_tg_id(tg_id=tg_id)
        if existing_user:
            return JSONResponse(content={"result": 400, "data": "Пользователь с таким ID уже существует."}, status_code=400)

        user = await add_user(
            tg_id=tg_id, name=name, surname=surname,
            avatar_url=avatar_url, username=username
        )
        data = request_to_openai(xd=name)
        print(data)
        return JSONResponse(content={"result": 201, "user": user}, status_code=201)

    except Exception as e:
        print(e)
        return JSONResponse(content={"result": 500, "data": "Произошла ошибка."}, status_code=500)

@api_router.get("/auth")
async def api_auth(tg_id: int):
    user = await doc_orders.find_one({"tg_id": tg_id})

    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь с таким telegram ID не найден.")

    user["_id"] = str(user["_id"])
    return {"user": user}

#=====================NEED TEST==============================
@api_router.get("/doctors/{speciality}")
async def api_get_doctor(speciality: str):
    doctors = await doc_orders.find({"speciality": speciality}).to_list(length=100)

    if not doctors:
        raise HTTPException(status_code=404, detail="Доктора с такой специальностей не найдены.")

    for doctor in doctors:
        doctor["_id"] = str(doctor["_id"])

    return {"doctors": doctors}


@api_router.post("/doctors" ,response_model=Doctors)
async def api_add_doctor(body: Dict[str, str] = Body(...)):
    print(Request.body)
    print('123')
    doctor_id: int = body.get("doctor_id")
    name: str = body.get("name")
    surname: str = body.get("surname")
    avatar_url: str = body.get("avatar_url")
    speciality: str = body.get("speciality")
    experience: int = body.get("experience")
    rating: float = body.get("rating")
    price: float = body.get("price")
    description: str = body.get("description")
    email: str = body.get("email")

    try:
        existing_doctor = await get_doctor_by_doctor_id(doctor_id=doctor_id)
        if existing_doctor:
            return JSONResponse(content={"result": 400, "data": "Доктор с таким ID уже существует."}, status_code=400)

        doctor = await add_doctor(
            doctor_id=doctor_id, name=name, surname=surname,
            avatar_url=avatar_url, speciality=speciality, experience=experience,
            rating=rating, price=price, description=description, email=email
        )
        return JSONResponse(content={"result": 201, "doctor": doctor}, status_code=201)

    except Exception as e:
        print(e)
        return JSONResponse(content={"result": 500, "data": "Произошла ошибка."}, status_code=500)

@api_router.delete("/all_doctors")
async def delete_all_doctors():
    result = await doc_orders.delete_many({"doctor_id": {"$exists": True}})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No doctors found to delete.")
    return {"deleted_count": result.deleted_count}

@api_router.get("/all_doctors")
async def api_get_all_doctors():
    doctors = await doc_orders.find({"doctor_id": {"$exists": True}}).to_list(length=100)

    if not doctors:
        raise HTTPException(status_code=404, detail="Доктора не найдены.")

    for doctor in doctors:
        doctor["_id"] = str(doctor["_id"])

    return {"doctors": doctors}

#===================================================



# дабуди дабдудай

@api_router.post("/api/v1/sendMessage")
async def api_send_message(body: Dict[str, str] = Body(...)):

    user_id: str = body.get("user_id")
    height: float = float(body.get("height"))
    weight: float = float(body.get("weight"))
    age: int = int(body.get("age"))
    sex: str = body.get("sex")
    symptoms: str = body.get("symptoms")

    try:
        height = float(body.get("height"))
        weight = float(body.get("weight"))
        age = int(body.get("age"))
    except (TypeError, ValueError):
        return JSONResponse(content={"result": 400, "data": "Invalid format for height, weight, or age."}, status_code=400)

    
    
    if not all([user_id, height, weight, age, sex, symptoms]):
        return JSONResponse(content={"result": 400, "data": "Неполные данные. Проверьте, что все поля заполнены."}, status_code=400)

    user_data = await add_user_data(user_id=user_id, height= height, weight= weight, age=age,
                                    sex=sex,symptoms=symptoms)
    
    
    
    return JSONResponse(content={"result": 201, "user_data": user_data}, status_code=201)


# работает не трогай,ок да?

@api_router.post("/api/v1/request_to_openai",response_model=OpenAI_Answer)
async def api_request_to_openai(body: Dict[str, str] = Body(...)):
    user_id = body.get("user_id")
    user_message = body.get("message")
    if not user_message or not user_id:
        return JSONResponse(content={"result": 400, "data": "Сообщение пользователя отсутствует."}, status_code=400)

    try:
        user_data = await get_user_data_by_user_id(user_id=user_id)
        if not user_data:
            return JSONResponse(content={"result": 404, "data": "User data not found."}, status_code=404)

        openai_response = await request_to_openai(message=user_message)
        formatted_response = openai_response.replace('\n', ' ')
        await add_answer(created_at=datetime.now(),answer = formatted_response,language="ru",
                         user_id=user_id,emergence="based")
        return JSONResponse(content={"result": 200, "response": formatted_response}, status_code=200)
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return JSONResponse(content={"result": 500, "data": "Произошла ошибка при запросе к OpenAI."}, status_code=500)
    

#===================NEED PZDCPZDC TESTS================================


@api_router.post("/api/v1/upload_mp3_to_text")
async def upload_mp3_to_text(file: UploadFile = File(...)):
    if file.content_type != "audio/mpeg":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an MP3 file.")
    
    try:
        
        mp3_file_path = f"/tmp/{file.filename}"
        wav_file_path = f"/tmp/{file.filename.split('.')[0]}.wav"
        
        async with aiofiles.open(mp3_file_path, 'wb') as out_file:
            content = await file.read()  
            await out_file.write(content)  
        
        
        await convert_mp3_to_wav(mp3_file_path, wav_file_path)

        
        text = transcribe_audio_async(wav_file_path)
        
        os.remove(mp3_file_path)
        os.remove(wav_file_path)
        airesponse = await request_to_openai(message = text)

        return JSONResponse(content={"result": 200, "response": airesponse}, status_code=200)
    

    except Exception as e:
        return JSONResponse(content={"result": 500, "message": f"An error occurred: {e}"}, status_code=500)
#===================================================


@api_router.get("/bot-api/{file_path:path}")
async def proxy_file(file_path: str):
    url = f"https://api.telegram.org/file/bot{TOKEN}/{file_path}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Картинки нет ошибочка")
        return StreamingResponse(io.BytesIO(response.content), media_type=response.headers.get('Content-Type'))


@api_router.get("/{id}")
async def get_user_profile_photos(id: int):
    user_photos = await bot.get_user_profile_photos(user_id=id)

    if user_photos.total_count > 0:
        current_photo = user_photos.photos[0]
        file_id = current_photo[-1].file_id

        file = await bot.get_file(file_id)
        return {"src": f"{LINK}/bot-api/{file.file_path}"}

    return {"src": ""}
