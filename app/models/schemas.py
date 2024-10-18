from pydantic import BaseModel
from uuid import UUID


class User(BaseModel):
    _id : UUID
    email : str
    password : str
    
    