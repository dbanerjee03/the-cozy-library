import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import Loader from "../components/Loader";

import API from "../services/api";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import {
  FaTrash
} from "react-icons/fa";

import "./Cart.css";

function Cart() {

    const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchCart();

  }, []);

  /* FETCH CART */

  const fetchCart = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/cart",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setCartItems(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  /* REMOVE ITEM */

  const removeCartItem = async (
    bookId
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(
        `/cart/${bookId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setCartItems(

        cartItems.filter(
          (item) =>
            item.book_id !== bookId
        )

      );

      toast.success(
        "Removed from cart"
      );

    } catch (error) {

      console.log(error);

    }

  };

  /* INCREASE */

const increaseQuantity =
  async (bookId) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.put(

        `/cart/increase/${bookId}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

};

/* DECREASE */

const decreaseQuantity =
  async (bookId) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.put(

        `/cart/decrease/${bookId}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

};

  /* TOTAL */

  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +
        (
          Number(item.book.price) || 0
        ) * item.quantity,

      0

    );

  return (

    <div className="cart-page">

      <Navbar />

      <div className="cart-container">

        <h1>
          My Shopping Cart 🛒
        </h1>

        {loading ? (

          <Loader />

        ) : cartItems.length > 0 ? (

          <div className="cart-layout">

            {/* LEFT */}

            <div className="cart-items-section">

              {cartItems.map(
                (item, index) => (

                  <div
                    key={index}
                    className="cart-item-card"
                  >

                    <img
                      src={
                        item.book.img_url_m
                      }

                      alt={
                        item.book.book_title
                      }
                    />

                    <div className="cart-item-info">

                      <h2>
                        {
                          item.book.book_title
                        }
                      </h2>

                      <p>
                        {
                          item.book.book_author
                        }
                      </p>

                      <div className="cart-price">

                        ₹{
                          item.book.price
                        }

                      </div>

                      <div className="cart-quantity">

  <button
    className="qty-btn"

    onClick={() =>
      decreaseQuantity(
        item.book_id
      )
    }
  >

    -

  </button>

  <span>

    {item.quantity}

  </span>

  <button
    className="qty-btn"

    onClick={() =>
      increaseQuantity(
        item.book_id
      )
    }
  >

    +

  </button>

</div>

                    </div>

                    <button
                      className="remove-cart-btn"

                      onClick={() =>
                        removeCartItem(
                          item.book_id
                        )
                      }
                    >

                      <FaTrash />

                    </button>

                  </div>

                )
              )}

            </div>

            {/* RIGHT */}

            <div className="cart-summary">

              <h2>
                Order Summary
              </h2>

              <div className="summary-row">

                <span>
                  Items
                </span>

                <span>
                  {
                    cartItems.length
                  }
                </span>

              </div>

              <div className="summary-row">

                <span>
                  Total
                </span>

                <span>
                  ₹{
                    totalPrice.toFixed(2)
                  }
                </span>

              </div>

              <button
                className="checkout-btn"

                onClick={() => 
                    navigate("/checkout")
                }
              >

                Proceed to Checkout

              </button>

            </div>

          </div>

        ) : (

          <div className="empty-cart">

            <h2>
              Your cart feels lonely 🛒
            </h2>

            <p>
              Add some amazing books
              to start shopping.
            </p>

          </div>

        )}

      </div>

      <Footer />

    </div>

  );

}

export default Cart;