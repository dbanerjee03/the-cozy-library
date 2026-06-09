import { useState } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import Loader from "../components/Loader";

import BookCard from "../components/BookCard";

import API from "../services/api";

import "./Recommendations.css";

function Recommendations() {

  const [query, setQuery] = useState("");

  const [searchedBook, setSearchedBook] =
    useState(null);

  const [recommendations, setRecommendations] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const fetchRecommendations = async () => {

    if (!query.trim()) return;

    try {

      setLoading(true);

      /* RECOMMENDATIONS */

      const response = await API.get(
        `/books/recommend/${query}`
      );

      setRecommendations(
        response.data.recommendations
      );

      /* SEARCHED BOOK */

      const searchedResponse = await API.get(
        `/search?query=${query}`
      );

      if (
        searchedResponse.data.length > 0
      ) {

        setSearchedBook(
          searchedResponse.data[0]
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="recommend-page">

      <Navbar />

      {/* HERO */}

      <div className="recommend-hero">

        <h1>
          Discover Similar Books 
        </h1>

        <p>
          Search a book and uncover
          recommendations curated
          just for you.
        </p>

        {/* SEARCH */}

        <div className="recommend-search">

          <input
            type="text"
            placeholder="Search a book..."
            value={query}

            onChange={(e) =>
              setQuery(e.target.value)
            }
          />

          <button
            onClick={fetchRecommendations}
          >
            Recommend
          </button>

        </div>

      </div>

      {/* CONTENT */}

      <div className="recommend-content">

        {loading ? (

          <Loader />

        ) : recommendations.length > 0 ? (

          <>

            {/* FEATURED BOOK */}

            <div className="featured-book-section">

              <h2>
                Because You Searched
              </h2>

              <div className="featured-book-wrapper">

                {searchedBook && (

                  <div className="featured-book-card">

                    <img
                      src={
                        searchedBook.image_url ||
                        searchedBook.img_url_m
                      }

                      alt={
                        searchedBook.book_title
                      }
                    />

                    <div className="featured-book-info">

                      <span className="featured-tag">
                        Featured Book
                      </span>

                      <h1>
                        {
                          searchedBook.book_title
                        }
                      </h1>

                      <p>
                        by {
                          searchedBook.book_author
                        }
                      </p>

                      {searchedBook.avg_rating && (

                        <div className="featured-rating">

                          ⭐ {
                            searchedBook.avg_rating
                          }

                        </div>

                      )}

                    </div>

                  </div>

                )}

              </div>

            </div>

            {/* RECOMMENDATIONS */}

            <div className="recommend-title-row">

              <h2>
                Readers Also Loved ✨
              </h2>

            </div>

            <div className="recommend-scroll-row">

              {recommendations.map(
                (book, index) => (

                  <div
                    key={index}
                    className="recommend-scroll-item"
                  >

                    <BookCard
                      book={book}
                    />

                  </div>

                )
              )}

            </div>

          </>

        ) : (

          <div className="recommend-empty">

            <h3>
              Start exploring books 💜
            </h3>

            <p>
              Search any book title to
              get personalized recommendations.
            </p>

          </div>

        )}

      </div>

      <Footer />

    </div>

  );

}

export default Recommendations;