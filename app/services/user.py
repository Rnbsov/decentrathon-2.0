from database.settings import doc_orders
from datetime import datetime
from bson.objectid import ObjectId
import fastapi



async def add_user(email: str, password : str) -> dict:
    user : dict = {
        "email" : email,
        "password" : password,
        
    }
    inserted_user = await doc_orders.insert_one(user)
    doc_order : dict = await doc_orders.find_one({"_id" : inserted_user.inserted_id})

    doc_order["_id"] = str(doc_order["_id"])
    
    return doc_order


async def get_user_by_email(email: str) -> dict:
    existing_user = await doc_orders.find_one({"email": email})
    if existing_user:
        existing_user["_id"] = str(existing_user["_id"])  
    return existing_user