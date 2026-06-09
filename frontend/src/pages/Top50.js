import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/Navbar";

import Loader from "../components/Loader";

import BookCard from "../components/BookCard";

import "./Top50.css";
import Footer from "../components/Footer";



function Top50() {

  const token =
  localStorage.getItem("token");

  useEffect(() => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}, []);

  const [books, setBooks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchTopBooks();

  }, []);

  const fetchTopBooks = async () => {

    try {

      const response = await API.get(
        "/books/top50"
      );

      setBooks(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="top50-page">

      <Navbar />

      {/* HERO SECTION */}

      <div className="top50-hero">

        <div className="hero-overlay">

          <h1>
            Our Top 50 Books 
          </h1>

          <p>
            Discover the highest rated
            books loved by readers
            around the world.
          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="top50-content">

        {loading ? (

          <Loader />

        ) : (

          <div className="top50-grid">

            {books.map((book, index) => (

              <div
                key={index}
                className="top50-book-wrapper"
              >

                {/* RANK */}

                <div className="rank-badge">

                  #{index + 1}

                </div>

                <BookCard book={book} 
                ratingBottom={true}
                />

              </div>

            ))}

          </div>

        )}

      </div>
<Footer/>
    </div>

  );

}

export default Top50;