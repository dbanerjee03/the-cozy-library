import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import API from "../services/api";

import Loader from "../components/Loader";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import "./Ebooks.css";

function Ebooks() {

  const navigate = useNavigate();

const token =
  localStorage.getItem("token");

  const [ebooks, setEbooks] =
    useState([]);

  const [searchTerm, setSearchTerm] =
  useState("");

    const [continueReading,
  setContinueReading] =
  useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchEbooks();

  }, []);

  const fetchEbooks = async () => {

    try {

      const response =
        await API.get(
          "/ebooks"
        );

      setEbooks(
        response.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleDownload = (

  ebookId

) => {

  if (!token) {

    toast.error(
      "Please login first 💜"
    );

    return;

  }

  window.open(

    `http://127.0.0.1:8000/ebooks/download/${ebookId}`,

    "_blank"

  );

};

useEffect(() => {

  if (!ebooks.length) return;

  const lastReadBook =

    localStorage.getItem(
      "last-read-book"
    );

  if (!lastReadBook) return;

  const book = ebooks.find(

    (ebook) =>

      ebook.file_name ===
      lastReadBook

  );

  if (book) {

    setContinueReading(
      book
    );

  }

}, [ebooks]);

const filteredEbooks =
  ebooks.filter((ebook) =>
    ebook.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

return (

  <div className="ebooks-page">

```
<Navbar />

<div className="ebooks-container">

  <div
    className="ebooks-hero"
    style={{
      backgroundImage:
        `url(${process.env.PUBLIC_URL}/hero-library.jpg)`
    }}
  >
    <div className="hero-overlay">

      <span className="hero-tag">
         Cozy Ebook Library
      </span>

      <h1>
        Discover Timeless Stories
      </h1>

      <p>
        Read classic literature online,
        continue where you left off,
        and build your personal digital
        library.
      </p>

      <button
        className="hero-btn"
        onClick={() => {

          document
            .querySelector(".ebooks-grid")
            ?.scrollIntoView({
              behavior: "smooth"
            });

        }}
      >
        Browse Collection
      </button>

    </div>
  </div>

  {continueReading && (

    <div className="continue-reading-card">

      <img

        src={`/covers/${continueReading.file_name
          .replace(".epub", "")
          .toLowerCase()
          .replace(/ /g, "_")}.jpg`}

        alt={continueReading.title}

        style={{
          width: "140px",
          cursor: "pointer"
        }}

        onClick={() =>
          navigate(
            `/ebook/${continueReading.id}`
          )
        }

      />

      <div>

        <h2>
           Continue Reading
        </h2>

        <h3  className="continue-book-title">
          {continueReading.title}
        </h3>

        <button

          className="continue-btn"

          onClick={() =>

            navigate(
              "/ebook/read",
              {
                state: {
                  fileName:
                  continueReading.file_name
                }
              }
            )

          }

        >

          Continue Reading

        </button>

      </div>

    </div>

  )}

  {loading ? (

    <Loader />

  ) : (

    <>

      <div
  className="ebooks-header"
>

  <h2>

     Available Ebooks

  </h2>

  <input

    type="text"

    placeholder=
      "Search ebooks..."

    value={searchTerm}

    onChange={(e) =>

      setSearchTerm(
        e.target.value
      )

    }

    className=
      "ebook-search"

  />

</div>

      {filteredEbooks.length === 0 ? (

  <div
    className="empty-state"
  >

    <h2>

      📚 No ebooks found

    </h2>

    <p>

      Try searching for
      another title.

    </p>

  </div>

) : (

  <div
    className="ebooks-grid"
  >

    {filteredEbooks.map((ebook) => (

  <div
    key={ebook.id}
    className="ebook-card"
  >

    <img

      src={`/covers/${ebook.file_name
        .replace(".epub", "")
        .toLowerCase()
        .replace(/ /g, "_")}.jpg`}

      alt={ebook.title}

      className="ebook-cover"

      style={{
        cursor: "pointer"
      }}

      onClick={() =>
        navigate(
          `/ebook/${ebook.id}`
        )
      }

    />

    <h2>
      {ebook.title}
    </h2>

    <p>
      {ebook.author}
    </p>

  </div>

))}

  </div>

)}

    </>

  )}

</div>

<Footer />
```

  </div>

);



}

export default Ebooks;