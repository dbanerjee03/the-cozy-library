import { useState } from "react";

import { Link } from "react-router-dom";

import { useEffect } from "react";
import toast from "react-hot-toast";

import {
  FaHeart,
  FaBook,
  FaBoxOpen,
  FaMagic,
  FaTimes
} from "react-icons/fa";

import Auth from "./Auth";

import "./Landing.css";

function Landing() {

  const [showAuth, setShowAuth] =
    useState(false);

    useEffect(() => {

  if (
    localStorage.getItem("loggedOut")
  ) {

    toast.success(
      "Logged out successfully 💜"
    );

    localStorage.removeItem(
      "loggedOut"
    );

  }

}, []);

  return (

    <div className="landing-page">

      {/* GLOW EFFECTS */}

      <div className="glow glow1"></div>

      <div className="glow glow2"></div>

      <div className="glow glow3"></div>

      {/* LEFT SIDE */}

      <div className="landing-left">

        <h1>

          The Cozy
          <span>
            {" "}
            Library
          </span>

        </h1>

        <p>

          Find books that feel
          like home.

        </p>

        <div className="landing-buttons">

          <button
            className="landing-login-btn"

            onClick={() =>
              setShowAuth(true)
            }
          >

            Login / Signup

          </button>

          <Link
            to="/home"
            className="landing-guest-btn"
          >

            Explore as Guest

          </Link>

        </div>

      </div>

      
      {/* AUTH MODAL */}

      {showAuth && (

        <div className="auth-modal-overlay">

          <div className="auth-modal">

            {/* CLOSE BUTTON */}

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

    </div>

  );

}

export default Landing;