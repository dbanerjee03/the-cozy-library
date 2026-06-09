import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

import BookCard from "../components/BookCard";

import Loader from "../components/Loader";

import "./SearchResults.css";
import Footer from "../components/Footer";

function SearchResults() {

  const { query } = useParams();

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    searchBooks();

  }, [query]);

  const searchBooks = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        `/search?query=${query}`
      );

      setBooks(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="search-page">

      <Navbar />

      <div className="search-results-container">

        <div className="search-header">

          <h2>
            Search Results
          </h2>

          <p>
            Showing results for:
            <span> {query}</span>
          </p>

        </div>

        {loading ? (

          <Loader />

        ) : books.length > 0 ? (

          <div className="books-grid">

            {books.map((book, index) => (

              <BookCard
                key={index}
                book={book}
              />

            ))}

          </div>

        ) : (

          <div className="no-results-box">

            <h3>
              No Books Found 📚
            </h3>

            <p>
              Try searching with another title.
            </p>

          </div>

        )}

      </div>
<Footer/>
    </div>

  );
}

export default SearchResults;