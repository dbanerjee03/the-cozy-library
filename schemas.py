from pydantic import BaseModel,EmailStr
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    name:str
    email:EmailStr
    password:str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id:int
    name: str
    email: EmailStr
    created_at: datetime

    model_config = {
    "from_attributes": True
    }


class BookResponse(BaseModel):
    isbn:str
    book_title:str
    book_author:str
    price:int | None=None
    img_url_m:str | None=None

    class Config:
        from_attributes=True

class WishlistResponse(BaseModel):
    id:int
    book_id:str
    book:BookResponse

    class Config:
        from_attributes=True