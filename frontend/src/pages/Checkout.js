import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import Loader from "../components/Loader";

import API from "../services/api";

import toast from "react-hot-toast";

import { useLocation } from "react-router-dom";

import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const location =
  useLocation();

const buyNowBook =
  location.state?.book;

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

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

  /* TOTAL */

  const totalPrice =
  buyNowBook

    ? Number(
        buyNowBook.price
      ) || 0

    : cartItems.reduce(

        (total, item) =>

          total +
          (
            Number(
              item.book.price
            ) || 0
          ) * item.quantity,

        0

      );

  /* PLACE ORDER */

  const placeOrder = async () => {

  if (!address || !phone) {

    toast.error(
      "Please fill all details"
    );

    return;

  }

  try {

    setPlacingOrder(true);

    const token =
      localStorage.getItem("token");

    let response;

    if (buyNowBook) {

      response = await API.post(

        `/purchase/${buyNowBook.isbn || buyNowBook.ISBN}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

    } else {

      response = await API.post(

        "/checkout",

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

    }

    toast.success(
      response.data.message
    );

    navigate("/orders");

  } catch (error) {

  console.log(error);

  console.log(error.response);

  toast.error(
    error.response?.data?.detail ||
    "Checkout failed"
  );

} finally {

    setPlacingOrder(false);

  }

};

  return (

    <div className="checkout-page">

      <Navbar />

      <div className="checkout-container">

        <h1>
          Checkout 🛒
        </h1>

        {loading ? (

          <Loader />

        ) : (

          <div className="checkout-layout">

            {/* LEFT */}

            <div className="checkout-form-section">

              <div className="checkout-card">

                <h2>
                  Delivery Details
                </h2>

                <input
                  type="text"

                  placeholder="Full Address"

                  value={address}

                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"

                  placeholder="Phone Number"

                  value={phone}

                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* PAYMENT */}

              <div className="checkout-card">

                <h2>
                  Payment Method
                </h2>

                <div className="cod-box">

                  ✅ Cash on Delivery

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="checkout-summary">

              <h2>
                Order Summary
              </h2>

              {buyNowBook && (

  <div className="checkout-book-preview">

    <img
      src={
        buyNowBook.image_url ||
        buyNowBook.img_url_m
      }

      alt={
        buyNowBook.book_title
      }
    />

    <div>

      <h3>
        {
          buyNowBook.book_title
        }
      </h3>

      <p>
        ₹{
          buyNowBook.price
        }
      </p>

    </div>

  </div>

)}

              <div className="summary-row">

  <span>
    Items
  </span>

  <span>

    {
      buyNowBook
        ? 1
        : cartItems.length
    }

  </span>

</div>

              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <span>
                  Free
                </span>

              </div>

              <div className="summary-row total-row">

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
                className="place-order-btn"

                onClick={placeOrder}

                disabled={placingOrder}
              >

                {
                  placingOrder
                    ? "Placing Order..."
                    : "Place Order"
                }

              </button>

            </div>

          </div>

        )}

      </div>

      <Footer />

    </div>

  );

}

export default Checkout;