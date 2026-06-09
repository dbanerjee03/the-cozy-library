import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import Loader from "../components/Loader";

import BookCard from "../components/BookCard";


import "./Wishlist.css";
import Footer from "../components/Footer";

function Wishlist() {

  useEffect(() => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}, []);

  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchWishlist();

  }, []);

  const fetchWishlist = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setWishlist(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };
  const removeWishlist = async (bookId) => {

  try {

    const token = localStorage.getItem("token");

    await API.delete(
      `/wishlist/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setWishlist(
      wishlist.filter(
        (item) => item.book_id !== bookId
      )
    );

  } catch (error) {

    console.log(error);

  }

};
  return (

    <div className="wishlist-page-container">

      <Navbar />

      <div className="wishlist-page">

        <div className="wishlist-header">

          <h2>
            My Wishlist ❤️
          </h2>

          <p>
            Your saved cozy reads.
          </p>

        </div>

        {loading ? (

          <Loader />

        ) : wishlist.length > 0 ? (

          <div className="wishlist-grid">

            {wishlist.map((item, index) => (

              <BookCard
                key={index}
                book={item.book}
                initiallyWishlisted={true}
                showRemoveButton={true}
                onRemove={() =>
                removeWishlist(item.book_id)
                }
              />

            ))}

          </div>

        ) : (

          <div className="empty-wishlist">

            <h3>
              Your wishlist is empty 💜
            </h3>

            <p>
              Start saving books you love.
            </p>

          </div>

        )}

      </div>
<Footer/>
    </div>

  );

}

export default Wishlist;