import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import Loader from "../components/Loader";


import API from "../services/api";

import {
  FaBoxOpen
} from "react-icons/fa";

import "./Orders.css";

function Orders() {

  useEffect(() => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}, []);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchOrders();

  }, []);

  /* FETCH ORDERS */

  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/orders",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="orders-page">

      <Navbar />

      <div className="orders-container">

        {/* HERO */}

        <div className="orders-hero">

          <h1>
            My Orders 📦
          </h1>

          <p>
            Track all your purchased
            books in one place.
          </p>

        </div>

        {loading ? (

          <Loader />

        ) : orders.length > 0 ? (

          <div className="orders-grid">

            {orders.map(
              (order, index) => (

                <div
                  key={index}
                  className="order-card"
                >

                  {/* IMAGE */}

                  <img
                    src={
                      order.book.img_url_m
                    }

                    alt={
                      order.book.book_title
                    }
                  />

                  {/* INFO */}

                  <div className="order-info">

                    <h2>
                      {
                        order.book.book_title
                      }
                    </h2>

                    <p>
                      {
                        order.book.book_author
                      }
                    </p>

                    <div className="order-price">

                      ₹{
                        order.book.price
                      }

                    </div>

                    <div className="order-meta">

                      <span>
                        Order ID:
                        {" "}
                        {order.id}
                      </span>

                      <span>
                        {
                          new Date(
                            order.order_date
                          ).toLocaleDateString()
                        }
                      </span>

                    </div>

                    {/* STATUS */}

                    <div className="delivered-badge">

                      ✅ Delivered

                    </div>

                    {/* BUTTON */}

                    <Link
                      to={`/book/${order.book.isbn}`}
                      className="view-book-btn"
                    >

                      View Book

                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          <div className="empty-orders">

            <FaBoxOpen />

            <h2>
              No Orders Yet
            </h2>

            <p>
              Start discovering amazing
              books today.
            </p>

          </div>

        )}

      </div>

      <Footer />

    </div>

  );

}

export default Orders;