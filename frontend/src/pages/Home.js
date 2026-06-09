import "./Home.css";

import {
  useEffect,
  useState
} from "react";

import Auth from "./Auth";

import { FaTimes } from "react-icons/fa";

import API from "../services/api";

import BookCard from "../components/BookCard";

import Loader from "../components/Loader";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

function Home() {

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [showAuth, setShowAuth] =
  useState(false);

  useEffect(() => {

    fetchRandomBooks();

    window.scrollTo(
      {
        top:0,
        behavior: "smooth"
      }
    );

  }, [page]);

  const fetchRandomBooks = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        `/books/random?page=${page}&limit=32`
      );

      setBooks(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="home-page">

      <Navbar
  openAuthModal={() =>
    setShowAuth(true)
  }
/>

      {/* HERO SECTION */}

      <div className="hero-section">

        <div className="hero-overlay">

          <h1>
            Discover Your Next Favorite Book 
          </h1>

          <p>
            Explore thousands of books,
            recommendations, and hidden gems.
          </p>

        </div>

      </div>

      {/* BOOK SECTION */}

      <div className="books-section">

        <div className="section-header">

          <h2>
            Discover Your Next Read 
          </h2>

          <p>
            Page {page}
          </p>

        </div>

        {loading ? (

          <Loader />

        ) : (

          <div className="books-grid">

            {books.map((book, index) => (

              <BookCard
                key={index}
                book={book}
                fromHome={true}
              />

            ))}

          </div>

        )}

        {/* PAGINATION */}

        <div className="pagination-section">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            ← Previous
          </button>

          <span>
            Page {page}
          </span>

          <button
            onClick={() =>
              setPage(page + 1)
            }
          >
            Next →
          </button>

        </div>

      </div>
      {/* AUTH MODAL */}

{showAuth && (

  <div className="auth-modal-overlay">

    <div className="auth-modal">

      <button
        className="close-modal-btn"

        onClick={() =>
          setShowAuth(false)
        }
      >

        <FaTimes />

      </button>

      <Auth />

    </div>

  </div>

)}
<Footer/>
    </div>

  );
}

export default Home;