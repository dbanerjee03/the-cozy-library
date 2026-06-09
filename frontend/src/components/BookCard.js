import { useNavigate } from "react-router-dom";

import { useState } from "react";

import API from "../services/api";

import {
  FaHeart,
  FaShoppingCart
} from "react-icons/fa";

import "./BookCard.css";

import toast from "react-hot-toast";

function BookCard({
  book,
  fromHome=false,
  initiallyWishlisted = false,
  showRemoveButton = false,
  onRemove = null,
  ratingBottom = false
}) {

  const navigate = useNavigate();

  const [wishlisted, setWishlisted] =
    useState(initiallyWishlisted);

  /* OPEN DETAILS PAGE */

  const openBookDetails = () => {

  navigate(

    `/book/${book.isbn || book.ISBN}`,

    {

      state: {

        fromHome: fromHome

      }

    }

  );

};

  /* BUY FUNCTION */

  const handleBuy = (e) => {

  e.stopPropagation();

  const token =
    localStorage.getItem("token");

  if (!token) {

    toast.error(
      "Please login first 💜"
    );

    return;

  }

  navigate("/checkout", {

    state: {

      book: book

    }

  });

};

  const handleAddToCart = async (e) => {

  e.stopPropagation();

  try {

    const token =
      localStorage.getItem("token");

    const response = await API.post(

      `/cart/${book.isbn || book.ISBN}`,

      {},

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    );

    toast.success(
      response.data.message
    );

  } catch (error) {

    console.log(error);

    if (
      error.response &&
      error.response.status === 401
    ) {

      toast.error(
        "Please login first"
      );

    }

    else {

      toast.error(
        "Failed to add to cart"
      );

    }

  }

};

  /* WISHLIST FUNCTION */

  const handleWishlist = async (e) => {

    e.stopPropagation();

    try {

      const token =
        localStorage.getItem("token");

      /* REMOVE */

      if (wishlisted) {

        await API.delete(
          `/wishlist/${book.isbn || book.ISBN}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setWishlisted(false);

        toast.success(
          "Removed from wishlist"
        );

      }

      /* ADD */

      else {

        await API.post(
          `/wishlist/${book.isbn || book.ISBN}`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setWishlisted(true);

        toast.success(
          "Added to wishlist 💜"
        );

      }

    } catch (error) {

      console.log(error);

      /* ALREADY EXISTS */

      if (
        error.response &&
        error.response.status === 400
      ) {

        setWishlisted(true);

        toast(
          "Already in wishlist 💜"
        );

      }

      /* NOT LOGGED IN */

      else if (
        error.response &&
        error.response.status === 401
      ) {

        toast.error(
          "Please login first"
        );

      }

      else {

        toast.error(
          "Something went wrong"
        );

      }

    }

  };
console.log(book);
  return (

    <div
      className="card h-100 shadow-sm border-0"
      onClick={openBookDetails}
    >

      {/* WISHLIST */}

      <button
        className={`wishlist-floating-btn ${
          wishlisted
            ? "wishlisted"
            : ""
        }`}
        onClick={handleWishlist}
      >

        <FaHeart />

      </button>

      {/* IMAGE */}

      <img
        src={
          book.image_url ||
          book.img_url_m
        }

        className="card-img-top"

        alt={book.book_title}

        style={{
          height: "300px",
          objectFit: "cover"
        }}
      />

      {/* BODY */}

      <div className="card-body d-flex flex-column">

        <h6 className="fw-bold">
          {book.book_title}
        </h6>

        <p className="text-muted mb-1">
          {book.book_author}
        </p>

        {book.price != null && (

          <p className="fw-bold text-success">
            ₹{book.price}
          </p>

        )}

        {/* TOP RATING */}

        {book.avg_rating != null &&
         !ratingBottom && (

          <p>

            <span className="rating-badge">

              ⭐ {book.avg_rating}

            </span>

          </p>

        )}

        {/* BUTTON SECTION */}

        <div className="mt-auto d-flex flex-column gap-2">

          {/* BOTTOM RATING */}

          {book.avg_rating != null &&
           ratingBottom && (

            <p>

              <span className="rating-badge">

                ⭐ {book.avg_rating}

              </span>

            </p>

          )}

          {/* BUY */}

          <div className="bookcard-actions">

  {/* ADD TO CART */}

  <button
    className="cart-small-btn"

    onClick={handleAddToCart}
  >

    <FaShoppingCart />

  </button>

  {/* BUY NOW */}

  <button
    className="btn btn-success flex-grow-1"

    onClick={handleBuy}
  >

    Buy Now

  </button>

</div>

          {/* REMOVE */}

          {showRemoveButton && (

            <button
              className="remove-btn"

              onClick={(e) => {

                e.stopPropagation();

                onRemove(
                  book.isbn || book.ISBN
                );

              }}
            >

              Remove from Wishlist

            </button>

          )}

        </div>

      </div>

    </div>

  );

}

export default BookCard;