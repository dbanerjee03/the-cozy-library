from passlib.context import CryptContext
from jose import JWTError,jwt
from datetime import datetime,timedelta
from fastapi import HTTPException,Depends
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from database import SessionLocal,get_db
import database_models


from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv(
    "SECRET_KEY"
)

ALGORITHM = os.getenv(
    "ALGORITHM"
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES"
    )
)

REFRESH_TOKEN_EXPIRE_DAYS = int(
    os.getenv(
        "REFRESH_TOKEN_EXPIRE_DAYS"
    )
)

pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

#hash password
def hash_password(password:str):
    return pwd_context.hash(password)

#Veryfy password
def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

#Create JWT token
def create_access_token(data:dict):
    to_encode=data.copy()
    expire=datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    encoded_jwt=jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwt

# CREATE REFRESH TOKEN

def create_refresh_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(

        days=REFRESH_TOKEN_EXPIRE_DAYS

    )

    to_encode.update({

        "exp": expire

    })

    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM

    )

    return encoded_jwt

security=HTTPBearer(auto_error=False)

def get_current_user(credentials:HTTPAuthorizationCredentials=Depends(security),db:Session=Depends(get_db)):

    token=credentials.credentials
    print("Token Received:",token)
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        user_id:int=payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401,detail="Invalid token")
    
    user=db.query(database_models.Users).filter(database_models.Users.id==user_id).first()

    if user is None:
        raise HTTPException(status_code=401,detail="User not found")
    
    
    return user

def get_current_user_optional(
        credentials:HTTPAuthorizationCredentials=Depends(security),db:Session=Depends(get_db)):
    if credentials is None:
        return None
    
    token=credentials.credentials

    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        user_id=payload.get("user_id")

        if user_id is None:
            return None
        
    except JWTError:
        return None
    
    user=db.query(database_models.Users).filter(
        database_models.Users.id==user_id
    ).first()
    return user

def verify_refresh_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get(
            "user_id"
        )

        if user_id is None:

            raise HTTPException(
                status_code=401,
                detail="Invalid refresh token"
            )

        return user_id

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token"
        )

        
