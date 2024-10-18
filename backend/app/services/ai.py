from database.settings import doc_orders
from datetime import datetime


async def add_answer(created_at: datetime, answer: str, 
                   emergence: str,language: str,
                   user_id: str
                   ) -> dict:
    answer : dict = {
        "created_at" : created_at,
        "answer" : answer,
        "emergence": emergence,
        "language": language,
        "user_id": user_id
    }
    inserted_answer = await doc_orders.insert_one(answer)
    doc_order : dict = await doc_orders.find_one({"_id" : inserted_answer.inserted_id})

    doc_order["_id"] = str(doc_order["_id"])
    
    return doc_order


async def get_answer_by_user_id(user_id: int) -> dict:
    existing_answer = await doc_orders.find_one({"user_id": user_id})
    if existing_answer:
        existing_answer["_id"] = str(existing_answer["_id"])  
    return existing_answer