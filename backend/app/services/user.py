from database.settings import doc_orders
from datetime import datetime
from bson.objectid import ObjectId
import fastapi



async def add_user(tg_id: int, name: str, 
                   surname: str,avatar_url: str = None,
                   username: str = None
                   ) -> dict:
    user : dict = {
        "tg_id" : tg_id,
        "username" : username,
        "name": name,
        "surname": surname,
        "avatar_url": avatar_url
        
    }
    inserted_user = await doc_orders.insert_one(user)
    doc_order : dict = await doc_orders.find_one({"_id" : inserted_user.inserted_id})

    doc_order["_id"] = str(doc_order["_id"])
    
    return doc_order


async def get_user_by_tg_id(tg_id: int) -> dict:
    existing_user = await doc_orders.find_one({"tg_id": tg_id})
    if existing_user:
        existing_user["_id"] = str(existing_user["_id"])  
    return existing_user