from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from database import SessionLocal,engine,get_db
import database_models
from sqlalchemy.orm import Session
from fastapi import Depends,HTTPException,APIRouter
import schemas
from sqlalchemy.sql.expression import func
from services.auth_service import hash_password
from services.auth_service import verify_password,create_access_token
from services.auth_service import get_current_user
from services.auth_service import get_current_user_optional
from services.payment_service import simulate_payment
from services.email_service import send_order_email
import random

router = APIRouter(
    tags=["Wishlist"]
)

@router.post("/wishlist/{book_id}")
def add_to_wishlist(
    book_id:str,
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user)
):
    #Checking if book exists
    book=db.query(database_models.Books).filter(
        database_models.Books.isbn==book_id
    ).first()

    if not book:
        raise HTTPException(status_code=404,detail="Book not found")
    
    #Preventing duplicate wishlist entry
    existing=db.query(database_models.Wishlist).filter(
        database_models.Wishlist.user_id==current_user.id,
        database_models.Wishlist.book_id==book_id
    ).first()

    if existing:
        raise HTTPException(status_code=400,detail="Book already added in wishlist")
    
    wishlist_item=database_models.Wishlist(
        user_id=current_user.id,
        book_id=book_id
    )

    db.add(wishlist_item)
    db.commit()

    return {"message":"Book added to wishlist"}

@router.delete("/wishlist/{book_id}")
def remove_from_wishlist(
    book_id:str,
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user)
):
    item=db.query(database_models.Wishlist).filter(
        database_models.Wishlist.user_id==current_user.id,
        database_models.Wishlist.book_id==book_id
    ).first()

    if not item:
        raise HTTPException(status_code=404,detail="Book not in wishlist")
    
    db.delete(item)
    db.commit()

    return{"message":"Book removed from wishlist"}

@router.get("/wishlist",response_model=list[schemas.WishlistResponse])
def get_wishlist(
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user)
):
    items=db.query(database_models.Wishlist).filter(
        database_models.Wishlist.user_id==current_user.id
    ).all()

    return items