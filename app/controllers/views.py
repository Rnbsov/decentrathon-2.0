from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import JSONResponse
from typing import Dict
from app.models.schemas import User
from app.services.user import add_user,get_user_by_tg_id
from database.settings import doc_orders
import hashlib, os, hmac

#проверка епта
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
if not TELEGRAM_BOT_TOKEN:
    raise ValueError("Please set the TELEGRAM_BOT_TOKEN environment variable.")

SECRET_KEY = hashlib.sha256(TELEGRAM_BOT_TOKEN.encode()).digest()

def check_init_data(init_data: dict, secret_key: bytes) -> bool:
    check_string = "\n".join([f"{k}={v}" for k, v in sorted(init_data.items()) if k != "hash"])
    secret_hash = hmac.new(secret_key, check_string.encode(), hashlib.sha256).hexdigest()
    return secret_hash == init_data.get("hash")

api_router: APIRouter = APIRouter()

@api_router.post("/auth", response_model=User)
async def api_auth(body: Dict[str, str] = Body(...)):
    tg_id: int = body.get("telegram_id")
    username: str = body.get("username")
    name: str = body.get("name")
    surname: str = body.get("last_name")
    avatar_url: str = body.get("photo_url")

    if not check_init_data(body, SECRET_KEY):
        raise HTTPException(status_code=403, detail="Invalid initData")

    if not tg_id:
        return JSONResponse(content={"result": 400, "data": "Неверный формат данных."}, status_code=400)

    try:
        existing_user = await get_user_by_tg_id(tg_id=tg_id)  
        if existing_user:
            return JSONResponse(content={"result": 400, "data": "Пользователь с таким email уже существует."}, status_code=400)
        
        user = await add_user(
            tg_id=tg_id,name=name,surname=surname,
            avatar_url=avatar_url,username=username
                )
        
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
