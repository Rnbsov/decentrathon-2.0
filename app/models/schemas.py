from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class User(BaseModel):
    uid : UUID
    tg_id: str
    username : str = None
    name: str
    surname: str
    avatar_url: str = None
    

class User_data(BaseModel):
    uid : UUID
    user_id: str
    height: int
    weight: int
    age: datetime
    sex: str
    symptomes: str


class OpenAI_Answer(BaseModel):
    uid: UUID
    created_at: datetime
    answer: str
    emergence: str
    language: str