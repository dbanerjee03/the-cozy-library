from fastapi import FastAPI

from database import engine
import database_models
from fastapi.middleware.cors import CORSMiddleware

from routers import books,auth,wishlist,orders,cart,ebooks

#Creating database tables
database_models.Base.metadata.create_all(bind=engine)

#Creating FastAPI app
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Include routers
app.include_router(auth.router)
app.include_router(books.router)
app.include_router(wishlist.router)
app.include_router(orders.router)
app.include_router(cart.router)
app.include_router(ebooks.router)