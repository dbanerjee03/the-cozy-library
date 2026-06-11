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
    tags=["Orders"]
)

@router.post("/purchase/{book_id}")
def purchase_book(
    book_id:str,
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user)
):
    
    #Checking if the book exists or not
    book=db.query(database_models.Books).filter(
        database_models.Books.isbn==book_id
    ).first()

    if not book:
        raise HTTPException(status_code=404,detail="Book not found")
    
    #Simulating Payment Processing
    payment_status=simulate_payment(book.price)

    if not payment_status:
        raise HTTPException(status_code=400,detail="Payment failed")
    
    #Creating order
    new_order=database_models.Orders(
        user_id=current_user.id,
        book_id=book_id
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Sending Email
    email_books = [
    {  
        "title": book.book_title,
        "author": book.book_author,
        "price": book.price,
        "image_url": book.img_url_m
    }
]

    try:
        send_order_email(
            current_user.email,
            email_books,
            book.price,
            [new_order.id]
    )
    except Exception as e:
        print(f"Email failed: {e}")

    return {
        "message": "Thank You for Ordering. Payment successful. Your order placed successfully",
        "order_id": new_order.id
}
@router.get("/orders")

def get_orders(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    orders = db.query(
        database_models.Orders
    ).filter(
        database_models.Orders.user_id ==
        current_user.id
    ).all()

    order_response = []

    for order in orders:

        book = db.query(
            database_models.Books
        ).filter(
            database_models.Books.isbn ==
            order.book_id
        ).first()

        order_response.append({

            "id": order.id,

            "order_date":
            order.order_date,

            "book": {

                "isbn":
                book.isbn,

                "book_title":
                book.book_title,

                "book_author":
                book.book_author,

                "price":
                book.price,

                "img_url_m":
                book.img_url_m

            }

        })

    return order_response

@router.post("/checkout")

def checkout_cart(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    cart_items = db.query(
        database_models.Cart
    ).filter(
        database_models.Cart.user_id ==
        current_user.id
    ).all()

    if not cart_items:

        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    created_orders = []

    email_books = []

    total_price = 0

    for item in cart_items:

        book = item.book

        # CREATE ORDER

        new_order = database_models.Orders(

            user_id = current_user.id,

            book_id = item.book_id

        )

        db.add(new_order)

        db.commit()

        db.refresh(new_order)

        created_orders.append(
            new_order.id
        )

        # EMAIL DATA

        email_books.append({

            "title":
            book.book_title,

            "author":
            book.book_author,

            "price":
            book.price,

            "image_url":
            book.img_url_m

        })

        total_price += (
            float(book.price)
            * item.quantity
        )

        # REMOVE CART ITEM

        db.delete(item)

    db.commit()

    # SEND SINGLE EMAIL

    send_order_email(

        current_user.email,

        email_books,

        total_price,

        created_orders

    )

    return {

        "message":
        "Order placed successfully",

        "orders":
        created_orders

    }