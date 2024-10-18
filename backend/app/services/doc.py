from database.settings import doc_orders


async def add_doctor(doctor_id: str, name: str,
                   surname: str, speciality: str,experience: int,rating: float,
                   price: float,description: str,email: str,
                   avatar_url: str = None
                   ) -> dict:
    doctor: dict = {
        "doctor_id": doctor_id,
        "name": name,
        "surname": surname,
        "speciality": speciality,
        "avatar_url": avatar_url,
        "experience": experience,
        "rating": rating,
        "price": price,
        "description": description,
        "email": email

    }
    inserted_user = await doc_orders.insert_one(doctor)
    doc_order: dict = await doc_orders.find_one({"_id": inserted_user.inserted_id})

    doc_order["_id"] = str(doc_order["_id"])

    return doc_order


async def get_doctor_by_doctor_id(doctor_id: str) -> dict:
    existing_doc = await doc_orders.find_one({"doctor": doctor_id})
    if existing_doc:
        existing_doc["_id"] = str(existing_doc["_id"])

    return existing_doc


