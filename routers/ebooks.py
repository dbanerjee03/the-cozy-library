from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
import database_models

from fastapi.responses import FileResponse
import os

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)


router = APIRouter(
    tags=["ebooks"]
)

@router.get("/ebooks")

def get_ebooks(

    db: Session = Depends(get_db)

):

    ebooks = db.query(
        database_models.Ebook
    ).all()

    return ebooks

@router.get("/ebooks/download/{ebook_id}")

def download_ebook(

    ebook_id: int,

    db: Session = Depends(get_db)

):

    ebook = db.query(
        database_models.Ebook
    ).filter(
        database_models.Ebook.id == ebook_id
    ).first()

    if not ebook:

        raise HTTPException(
            status_code=404,
            detail="Ebook not found"
        )

    file_path = os.path.join(

        "ebooks",

        ebook.file_name

    )

    if not os.path.exists(
        file_path
    ):

        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    return FileResponse(

        path=file_path,

        filename=ebook.file_name,

        media_type=
        "application/epub+zip"

    )

@router.get("/ebooks/read/{ebook_id}")

def read_ebook(

    ebook_id: int,

    db: Session = Depends(get_db)

):

    ebook = db.query(
        database_models.Ebook
    ).filter(
        database_models.Ebook.id == ebook_id
    ).first()

    if not ebook:

        raise HTTPException(
            status_code=404,
            detail="Ebook not found"
        )

    file_path = os.path.join(

        "ebooks",

        ebook.file_name

    )

    if not os.path.exists(
        file_path
    ):

        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    return FileResponse(

        path=file_path,

        media_type=
        "application/epub+zip"

    )
@router.get("/ebooks/{ebook_id}")

def get_ebook_details(

    ebook_id: int,

    db: Session = Depends(get_db)

):

    ebook = db.query(
        database_models.Ebook
    ).filter(
        database_models.Ebook.id == ebook_id
    ).first()

    if not ebook:

        raise HTTPException(
            status_code=404,
            detail="Ebook not found"
        )

    return ebook

@router.get("/ebooks/related/{ebook_id}")

def get_related_ebooks(

    ebook_id: int,

    db: Session = Depends(get_db)

):

    ebook = db.query(
        database_models.Ebook
    ).filter(
        database_models.Ebook.id == ebook_id
    ).first()

    if not ebook:

        raise HTTPException(
            status_code=404,
            detail="Ebook not found"
        )

    related_books = db.query(
        database_models.Ebook
    ).filter(
        database_models.Ebook.author
        == ebook.author,

        database_models.Ebook.id
        != ebook.id

    ).limit(4).all()

    return related_books