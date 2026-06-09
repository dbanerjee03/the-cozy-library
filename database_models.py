from sqlalchemy import Column,Integer,String,Float,TIMESTAMP,VARCHAR,ForeignKey,DateTime,func,Numeric,UniqueConstraint,Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base=declarative_base()

class Users(Base):

    __tablename__="users"
    id= Column(Integer, primary_key=True, index=True)
    name= Column(String, nullable=False)
    email= Column(String,nullable=False,index=True,unique=True)
    password_hash=Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Books(Base):

    __tablename__="books"
    isbn= Column(VARCHAR, primary_key=True, index=True)
    book_title= Column(String, nullable=False)
    book_author= Column(String,nullable=False)
    year_of_publication=Column(Integer)
    publisher=Column(String)
    price=Column(Numeric(10,2))
    img_url_s=Column(String)
    img_url_m=Column(String)
    img_url_l=Column(String)
    

class Orders(Base):

    __tablename__="orders"
    id=Column(Integer,primary_key=True,nullable=False,index=True)
    user_id =Column(Integer, ForeignKey("users.id",ondelete="CASCADE"),nullable=False)
    book_id = Column(String,ForeignKey("books.isbn", ondelete="CASCADE"),nullable=False)
    order_date = Column(DateTime(timezone=True),server_default=func.now())
    access_granted = Column(Boolean, default=False)
    
class SearchHistory(Base):

    __tablename__ = "search_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer,ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    book_id = Column(String,ForeignKey("books.isbn", ondelete="CASCADE"),nullable=False)
    searched_at = Column(DateTime(timezone=True),server_default=func.now())

class Wishlist(Base):

    __tablename__ = "wishlist"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer,ForeignKey("users.id", ondelete="CASCADE"))
    book_id = Column(String,ForeignKey("books.isbn", ondelete="CASCADE"))
    added_at = Column(DateTime(timezone=True),server_default=func.now())
    book= relationship("Books")
    __table_args__ = (
        UniqueConstraint('user_id', 'book_id', name='unique_user_book'),
    )

class Cart(Base):

    __tablename__ = "cart"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        )
    )

    book_id = Column(
        String,
        ForeignKey(
            "books.isbn",
            ondelete="CASCADE"
        )
    )

    quantity = Column(
        Integer,
        default=1
    )

    added_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    book = relationship("Books")

    __table_args__ = (
        UniqueConstraint(
            'user_id',
            'book_id',
            name='unique_cart_book'
        ),
    )

class Ebook(Base):

    __tablename__ = "ebooks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    author = Column(
        String,
        nullable=False
    )

    description = Column(
        String
    )

    cover_image = Column(
        String
    )

    file_name = Column(
        String,
        nullable=False
    )