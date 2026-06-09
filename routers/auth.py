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
from services.auth_service import (
    verify_password,
    create_access_token,
    create_refresh_token
)
from services.auth_service import (
    verify_refresh_token
)
from services.auth_service import get_current_user
from services.auth_service import get_current_user_optional
from services.payment_service import simulate_payment
from services.email_service import send_order_email
import random

router = APIRouter(
    tags=["auth"]
)

@router.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(database_models.Users).filter(
    database_models.Users.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = database_models.Users(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)  
    )
    

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login")
def login(user:schemas.UserLogin,db:Session=Depends(get_db)):

    db_user=db.query(database_models.Users).filter(
        database_models.Users.email==user.email
    ).first()

    if not db_user:
        raise HTTPException(status_code=400,detail="Invalid email or password")
    
    if not verify_password(user.password,db_user.password_hash):
        raise HTTPException(status_code=400,detail="Invalid email or password")
    
    access_token = create_access_token(
    data={"user_id": db_user.id}
)

    refresh_token = create_refresh_token(
    data={"user_id": db_user.id}
)

    return {

    "access_token": access_token,

    "refresh_token": refresh_token,

    "token_type": "bearer"

}

@router.post("/refresh")

def refresh_token(data: dict):

    refresh_token = data.get(
        "refresh_token"
    )

    user_id = verify_refresh_token(
        refresh_token
    )

    new_access_token = create_access_token(

        data={
            "user_id": user_id
        }

    )

    return {

        "access_token":
        new_access_token

    }

@router.get("/me")
def read_current_user(current_user=Depends(get_current_user)):
    return {
        "id":current_user.id,
        "name": current_user.name,
        "email":current_user.email
    }
