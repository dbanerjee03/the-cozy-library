import "./Navbar.css";

import { useState, useEffect } from "react";

import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import logo from "../assets/logo.png";

import toast from "react-hot-toast";

import API from "../services/api";

import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaUser
} from "react-icons/fa";


function Navbar({
  openAuthModal
}) {

  const location = useLocation();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [user, setUser] =
  useState(null);

  const [logoutLoading,
  setLogoutLoading] =
  useState(false);

  // SEARCH STATES

  const [query, setQuery] = useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [selectedIndex, setSelectedIndex] =
    useState(-1);

  // FETCH SUGGESTIONS

  const fetchSuggestions = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        `/search/suggestions?query=${query}`
      );

      setSuggestions(response.data);

      setShowSuggestions(true);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // DEBOUNCE SEARCH

  useEffect(() => {

    const delaySearch = setTimeout(() => {

      if (query.trim() !== "") {

        fetchSuggestions();

      } else {

        setSuggestions([]);

        setShowSuggestions(false);

      }

    }, 300);

    return () => clearTimeout(delaySearch);

  }, [query]);

  useEffect(() => {

  const fetchUser = async () => {

    if (!token) return;

    try {

      const response = await API.get(
        "/me",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setUser(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchUser();

}, [token]);

  // SEARCH SUBMIT

  const handleSearch = (e) => {

    e.preventDefault();

    if (query.trim()) {

      navigate(
        `/search/${query}`
      );

      setShowSuggestions(false);

    }

  };

  // LOGOUT

  const handleLogout = () => {

  setLogoutLoading(true);

  setTimeout(() => {

    localStorage.removeItem("token");
    localStorage.removeItem(
  "refresh_token"
);

    localStorage.setItem(
  "loggedOut",
  "true"
);

    navigate("/");

    

  }, 2200);

};

  const handleProtectedNavigation = (
  path
) => {

  if (!token) {

    toast.error(
      "Please login first 💜"
    );

    return;

  }

  navigate(path);

};

const playToastSound = () => {

  const audio = new Audio(
    "/toast.mp3"
  );

  audio.volume = 0.4;

  audio.play();

};

const protectRoute = (
  e,
  path
) => {

  if (!token) {

    e.preventDefault();
    playToastSound();
    

    toast.error(
      "Please login first 💜"
    );

  }

};

if (logoutLoading) {

  return (

    <div className="logout-loading-overlay">

      <div className="logout-loading-box">

        <div className="logout-spinner"></div>

        <h3>
          Logging you out...
        </h3>

      </div>

    </div>

  );

}

  return (

    <>

      {/* TOP NAVBAR */}

      <nav className="main-navbar">

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
        >

          <img
            src={logo}
            alt="Logo"
            className="logo-img"
          />

          <span>
            The Cozy Library
          </span>

        </Link>

        {/* SEARCH */}

        <div className="search-wrapper">

          <form
            className="search-bar"
            onSubmit={handleSearch}
          >

            <input
  type="text"
  placeholder="Search books..."
  value={query}
  onChange={(e) => {

    setQuery(e.target.value);

    setSelectedIndex(-1);

  }}

  onKeyDown={(e) => {

    // DOWN ARROW

    if (e.key === "ArrowDown") {

      e.preventDefault();

      setSelectedIndex((prev) =>
        prev < suggestions.length - 1
          ? prev + 1
          : prev
      );

    }

    // UP ARROW

    else if (e.key === "ArrowUp") {

      e.preventDefault();

      setSelectedIndex((prev) =>
        prev > 0
          ? prev - 1
          : 0
      );

    }

    // ENTER

    else if (e.key === "Enter") {

      e.preventDefault();

      if (
        selectedIndex >= 0 &&
        suggestions[selectedIndex]
      ) {

        navigate(
          `/search/${suggestions[selectedIndex].book_title}`
        );

      } else {

        navigate(`/search/${query}`);

      }

      setShowSuggestions(false);

    }

  }}

  onFocus={() => {

    if (suggestions.length > 0) {

      setShowSuggestions(true);

    }

  }}
/>

            <button type="submit">

              <FaSearch />

            </button>

          </form>

          {/* SUGGESTIONS */}

          {showSuggestions && (

            <div className="suggestions-dropdown">

              {loading ? (

                <p className="suggestion-loading">
                  Searching...
                </p>

              ) : suggestions.length > 0 ? (

                suggestions.map((book, index) => (

                  <div
                    key={index}
                    className={`suggestion-item ${
                      selectedIndex === index
                      ? "active-suggestion"
                      : ""
                    }`}
                    onClick={() => {

                      navigate(
                        `/search/${book.book_title}`
                      );

                      setQuery("");

                      setShowSuggestions(false);

                    }}
                  >

                    {book.book_title}

                  </div>

                ))

              ) : (

                <p className="no-results">
                  No books found
                </p>

              )}

            </div>

          )}

        </div>

        {/* RIGHT SECTION */}

        <div className="nav-icons">

          <Link
            to="/wishlist"

            onClick={(e) =>
    protectRoute(
      e,
      "/wishlist"
    )
  }

            className={`icon-btn wishlist-heart ${
              location.pathname === "/wishlist"
                ? "active-heart"
                : ""
            }`}
          >

            <FaHeart className="heart-icon" />

          </Link>

          <Link
            to="/cart"
            onClick={(e) =>
  protectRoute(
    e,
    "/cart"
  )
}
            className="icon-btn"
          >

            <FaShoppingCart />

          </Link>

          {token ? (

  <div className="user-section">

    <span className="user-greeting">

      Hi,
      {" "}
      {user?.name} 👋

    </span>

    <button
      className="login-btn"
      onClick={handleLogout}
    >

      Logout

    </button>

  </div>

) : (

  <button
    className="login-btn"

    onClick={openAuthModal}
  >

    <FaUser className="me-2" />

    Login / Signup

  </button>

)}

        </div>

      </nav>

      {/* SECOND NAVBAR */}

      <div className="bottom-navbar">

  <Link
    to={
      token
        ? "/home"
        : "/"
    }

    className={
      location.pathname === "/" ||
      location.pathname === "/home"
        ? "active-tab"
        : ""
    }
  >
    Home
  </Link>

        <Link
          to="/top50"
          onClick={(e) =>
  protectRoute(
    e,
    "/top50"
  )
}
          className={
            location.pathname === "/top50"
              ? "active-tab"
              : ""
          }
        >
          Top 50
        </Link>

        <Link
  to="/ebooks"

  className={
    location.pathname === "/ebooks"
      ? "active-tab"
      : ""
  }
>
  Ebooks
</Link>

        <Link
          to="/orders"
          onClick={(e) =>
  protectRoute(
    e,
    "/orders"
  )
}
          className={
            location.pathname === "/orders"
              ? "active-tab"
              : ""
          }
        >
          Orders
        </Link>

      </div>

    </>

  );
}

export default Navbar;