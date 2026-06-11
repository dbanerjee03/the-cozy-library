from database import SessionLocal,engine,get_db
import database_models
from sqlalchemy.orm import Session
from fastapi import Depends,HTTPException
from sqlalchemy.sql.expression import func
from services.auth_service import get_current_user
from services.auth_service import get_current_user_optional
import random
from fastapi import APIRouter
import schemas
from services.recommendation_service import recommend_books,get_top50_books

router = APIRouter(
    tags=["Books"]
)

@router.get("/search", response_model=list[schemas.BookResponse])
def search_books(
    query:str,
    skip: int=0,
    limit: int=20,
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user_optional)
):
    print("Query received:",query)


    books=db.query(database_models.Books).filter(
        database_models.Books.book_title.ilike(f"%{query}%")
    ).offset(skip).limit(limit).all()

    print("Books found:",books)

    

    #Save history only if logged in 
    if current_user:
        for book in books:
            history=database_models.SearchHistory(
                user_id=current_user.id,
                book_id=book.isbn
            )
            db.add(history)
        db.commit()
    return books
    
#Random Books api for homepage
@router.get("/books/random")
def get_random_books(
    page: int = 1,
    limit: int = 30,
    db: Session = Depends(get_db)
):

    offset = (page - 1) * limit

    books = db.query(database_models.Books).filter(
        database_models.Books.isbn != None,
        database_models.Books.isbn != ""
    ).offset(offset).limit(limit).all()

    return books
#Top 50 books section api
@router.get("/books/top50")
def top50_books(
    limit: int = 50,
    db: Session = Depends(get_db)
):

    books = get_top50_books()

    for book in books:

        db_book = db.query(
            database_models.Books
        ).filter(
            database_models.Books.isbn ==
            book["ISBN"]
        ).first()

        if db_book:

            book["price"] = (
                float(db_book.price)
                if db_book.price
                else 0
            )

        else:

            book["price"] = 0

    return books

#search suggestions api
@router.get("/search/suggestions")
def search_suggestions(
    query:str,
    limit:int=10,
    db:Session=Depends(get_db)
):
    books=db.query(database_models.Books).filter(
        database_models.Books.book_title.ilike(f"{query}%")
    ).limit(limit).all()
    return books

#book details api
@router.get("/books/{isbn}")
def get_book_details(
    isbn:str,
    db:Session=Depends(get_db)
):
    book=db.query(database_models.Books).filter(
        database_models.Books.isbn==isbn
    ).first()

    if not book:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )
    return book

@router.get("/books/recommend/{book_name}")
def get_recommendations(book_name: str):

    recommendations = recommend_books(
        book_name
    )

    # FALLBACK TO TOP BOOKS

    if recommendations is None:

        fallback_books = get_top50_books()

        random.shuffle(
            fallback_books
        )

        recommendations = fallback_books[:8]

    return {

        "searched_book":
        book_name,

        "recommendations":
        recommendations

    }