import "./Footer.css";

import logo from "../assets/logo.png";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTwitter
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Footer() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  const handleProtectedFooter =
    (path) => {

      if (!token) {

        toast.error(
          "Please login first 💜"
        );

        return;
      }

      navigate(path);

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

  };

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <div className="footer-logo-section">

            <img
              src={logo}
              alt="Logo"
              className="footer-logo"
            />

            <h2>
              The Cozy Library
            </h2>

          </div>

          <p>
            Your cozy corner for discovering
            timeless stories, bestselling
            novels, and personalized book
            recommendations.
          </p>

        </div>

        {/* ABOUT */}

        <div className="footer-column">

          <h4>
            About
          </h4>

          <Link to="/about">
            Our Story
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-column">

          <h4>
            Explore
          </h4>

          <Link to="/home">
            Home
          </Link>

          <button
            onClick={() =>
              handleProtectedFooter(
                "/top50"
              )
            }
          >
            Top 50
          </button>

          <button
            onClick={() =>
              handleProtectedFooter(
                "/wishlist"
              )
            }
          >
            Wishlist
          </button>

          <button
            onClick={() =>
              handleProtectedFooter(
                "/orders"
              )
            }
          >
            Orders
          </button>

        </div>

        {/* SOCIALS */}

        <div className="footer-column">

          <h4>
            Follow Us
          </h4>

          <div className="footer-socials">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <FaGithub />
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        <p>
          © 2026 The Cozy Library.
          Crafted with 💜 for book lovers.
        </p>

      </div>

    </footer>

  );

}

export default Footer;