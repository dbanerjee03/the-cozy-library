from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from database import get_db

import database_models

from services.auth_service import (
    get_current_user
)

router = APIRouter(
    tags=["cart"]
)

# ADD TO CART

@router.post("/cart/{book_id}")

def add_to_cart(

    book_id: str,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    # CHECK BOOK EXISTS

    book = db.query(
        database_models.Books
    ).filter(
        database_models.Books.isbn == book_id
    ).first()

    if not book:

        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    # CHECK IF ALREADY IN CART

    existing_item = db.query(
        database_models.Cart
    ).filter(

        database_models.Cart.user_id ==
        current_user.id,

        database_models.Cart.book_id ==
        book_id

    ).first()

    # INCREASE QUANTITY

    if existing_item:

        existing_item.quantity += 1

        db.commit()

        return {
            "message":
            "Quantity updated in cart"
        }

    # ADD NEW ITEM

    new_item = database_models.Cart(

        user_id = current_user.id,

        book_id = book_id,

        quantity = 1

    )

    db.add(new_item)

    db.commit()

    db.refresh(new_item)

    return {
        "message":
        "Book added to cart"
    }

# GET CART

@router.get("/cart")

def get_cart(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    cart_items = db.query(
        database_models.Cart
    ).filter(
        database_models.Cart.user_id ==
        current_user.id
    ).all()

    cart_response = []

    for item in cart_items:

        cart_response.append({

            "book_id": item.book_id,

            "quantity": item.quantity,

            "book": {

                "isbn": item.book.isbn,

                "book_title":
                item.book.book_title,

                "book_author":
                item.book.book_author,

                "price":
                item.book.price,

                "img_url_m":
                item.book.img_url_m

            }

        })

    return cart_response

# REMOVE ITEM

@router.delete("/cart/{book_id}")

def remove_cart_item(

    book_id: str,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    item = db.query(
        database_models.Cart
    ).filter(

        database_models.Cart.user_id ==
        current_user.id,

        database_models.Cart.book_id ==
        book_id

    ).first()

    if not item:

        raise HTTPException(
            status_code=404,
            detail="Item not found in cart"
        )

    db.delete(item)

    db.commit()

    return {
        "message":
        "Removed from cart"
    }

# INCREASE QUANTITY

@router.put("/cart/increase/{book_id}")

def increase_quantity(

    book_id: str,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    item = db.query(
        database_models.Cart
    ).filter(

        database_models.Cart.user_id ==
        current_user.id,

        database_models.Cart.book_id ==
        book_id

    ).first()

    if not item:

        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    item.quantity += 1

    db.commit()

    return {
        "message":
        "Quantity increased"
    }

# DECREASE QUANTITY

@router.put("/cart/decrease/{book_id}")

def decrease_quantity(

    book_id: str,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    item = db.query(
        database_models.Cart
    ).filter(

        database_models.Cart.user_id ==
        current_user.id,

        database_models.Cart.book_id ==
        book_id

    ).first()

    if not item:

        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    # REMOVE IF 1

    if item.quantity == 1:

        db.delete(item)

        db.commit()

        return {
            "message":
            "Item removed"
        }

    item.quantity -= 1

    db.commit()

    return {
        "message":
        "Quantity decreased"
    }