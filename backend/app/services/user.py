from database.settings import doc_orders


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


async def add_user_data(user_id: str, height: int, 
                   weight: int,age: int,
                   sex: str, symptoms: str = None
                   ) -> dict:
    user_data : dict = {
        "user_id" : user_id,
        "height" : height,
        "weight": weight,
        "age": age,
        "sex": sex,
        "symptoms": symptoms
        
    }
    inserted_user = await doc_orders.insert_one(user_data)
    doc_order : dict = await doc_orders.find_one({"_id" : inserted_user.inserted_id})

    doc_order["_id"] = str(doc_order["_id"])
    
    return doc_order


async def get_user_by_tg_id(tg_id: int) -> dict:
    existing_user = await doc_orders.find_one({"tg_id": tg_id})
    if existing_user:
        existing_user["_id"] = str(existing_user["_id"])  
    return existing_user


async def get_user_data_by_user_id(user_id: str) -> dict:
    existing_user_data = await doc_orders.find_one({"user_id": user_id})
    if existing_user_data:
        existing_user_data["_id"] = str(existing_user_data["_id"])  
    return existing_user_data