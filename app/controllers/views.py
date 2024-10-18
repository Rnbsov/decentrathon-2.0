from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import JSONResponse
from typing import Dict
from app.models.schemas import User
from app.services.user import add_user,get_user_by_email
from database.settings import doc_orders


api_router: APIRouter = APIRouter()

@api_router.post("/auth", response_model=User)
async def api_auth(body: Dict[str, str] = Body(...)):
    email: str = body.get("email")
    password: str = body.get("password")

    if not email or not password:
        return JSONResponse(content={"result": 400, "data": "Неверный формат данных."}, status_code=400)

    try:
        existing_user = await get_user_by_email(email)  
        if existing_user:
            return JSONResponse(content={"result": 400, "data": "Пользователь с таким email уже существует."}, status_code=400)
        
        user = await add_user(email=email, password=password)
        return JSONResponse(content={"result": 201, "user": user}, status_code=201)
    except Exception as e:  
        print(e)
        return JSONResponse(content={"result": 500, "data": "Произошла ошибка."}, status_code=500)


@api_router.get("/auth")
async def api_auth(email: str):
    user = await doc_orders.find_one({"email": email})
    
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь с таким email не найден.")
    

    user["_id"] = str(user["_id"])
    return {"user": user}
