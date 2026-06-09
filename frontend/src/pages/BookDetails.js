import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import Loader from "../components/Loader";

import BookCard from "../components/BookCard";

import {
  useParams,
  useNavigate,useLocation
} from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

import "./BookDetails.css";

function BookDetails() {

  const { isbn } = useParams();

  const navigate =
  useNavigate();

  const location =
  useLocation();

const fromHome =
  location.state?.fromHome;

  const [book, setBook] =
    useState(null);

  const [recommendations, setRecommendations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchBookDetails();

  }, [isbn]);

  /* FETCH DETAILS */

  const fetchBookDetails = async () => {

    try {

      setLoading(true);

      /* BOOK DETAILS */

      const bookResponse =
        await API.get(
          `/books/${isbn}`
        );

      setBook(bookResponse.data);

      /* RECOMMENDATIONS */

      if (!fromHome) {

      const recommendResponse =
        await API.get(
          `/books/recommend/${encodeURIComponent(
  bookResponse.data.book_title
)}`
        );

      setRecommendations(
        recommendResponse.data.recommendations
      );
    }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  /* BUY */

  const handleBuy = () => {

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

const handleAddToCart = async () => {

  try {

    const token =
      localStorage.getItem("token");

    if (!token) {

      toast.error(
        "Please login first 💜"
      );

      return;

    }

    await API.post(

      `/cart/${isbn}`,

      {},

      {
        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

    toast.success(
      "Cart updated 💜"
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed to update cart"
    );

  }

};

  return (

    <div className="book-details-page">

      <Navbar />

      {loading ? (

        <Loader />

      ) : book ? (

        <>

          {/* HERO SECTION */}

          <div className="book-details-container">

            {/* IMAGE */}

            <div className="book-image-section">

              <img
                src={
                  book.image_url ||
                  book.img_url_m
                }

                alt={book.book_title}
              />

            </div>

            {/* INFO */}

            <div className="book-info-section">

              <span className="book-tag">
                Featured Book
              </span>

              <h1>
                {book.book_title}
              </h1>

              <p className="book-author">

                by {book.book_author}

              </p>

              {book.avg_rating && (

                <div className="details-rating">

                  ⭐ {book.avg_rating}

                </div>

              )}

              {book.price && (

                <h2 className="book-price">

                  ₹{book.price}

                </h2>

              )}

              <p className="book-description">

                Discover this beautifully
                curated book from our
                premium collection.

              </p>

              {/* ACTIONS */}

              <div className="details-buttons">

                <button
                  className="buy-btn"

                  onClick={handleBuy}
                >

                  Buy Now

                </button>

                <button
  className="cart-btn"

  onClick={handleAddToCart}
>

                  Add to Cart

                </button>

              </div>

            </div>

          </div>

          {/* RECOMMENDATIONS */}

          {/* RECOMMENDATIONS */}

{!fromHome && (

  <div className="details-recommend-section">

    <h2>
      Readers Also Loved ✨
    </h2>

    <div className="details-scroll-row">

      {recommendations.map(
        (book, index) => (

          <div
            key={index}
            className="details-scroll-item"
          >

            <BookCard
              book={book}
            />

          </div>

        )
      )}

    </div>

  </div>

)}

        </>

      ) : null}

      <Footer />

    </div>

  );

}

export default BookDetails;