import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import { HiOutlinePencilAlt } from "react-icons/hi";

import { FaBookOpen } from "react-icons/fa";

import Loader from "../components/Loader";

import API from "../services/api";

import "./EbookDetails.css";

function EbookDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [ebook, setEbook] =
    useState(null);

  const [relatedBooks,
  setRelatedBooks] =
  useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

  fetchEbook();

  fetchRelatedBooks();

}, [id]);

  const fetchEbook = async () => {

    try {

      const response =
        await API.get(
          `/ebooks/${id}`
        );

      setEbook(
        response.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const fetchRelatedBooks =
  async () => {

    try {

      const response =
        await API.get(
          `/ebooks/related/${id}`
        );

      setRelatedBooks(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

};

  if (loading) {

    return <Loader />;

  }

  

  return (

    <div className="ebook-details-page">

      <Navbar />

      <div className="ebook-details-container">

        <div className="ebook-details-layout">

          <img

            src={`/covers/${ebook.file_name
              .replace(".epub", "")
              .toLowerCase()
              .replace(/ /g, "_")}.jpg`}

            alt={ebook.title}

            className="ebook-details-cover"

          />

          <div
            className="ebook-details-info"
          >

            <h1>

              {ebook.title}

            </h1>

            <div className="author-badge">

  < HiOutlinePencilAlt/>

  <span>

    {ebook.author}

  </span>

</div>

            <div className="description-card">

  <h3>

     About This Book

  </h3>

  <p>

    {ebook.description}

  </p>

</div>

            <button

              className="read-now-btn"

              onClick={() =>

                navigate(
                  "/ebook/read",
                  {
                    state: {
                      fileName:
                      ebook.file_name
                    }
                  }
                )

              }

            >
              <FaBookOpen/>

              <span>

                Start Reading
              </span>
               

            </button>

          </div>

        </div>

        <div className="related-section">

  <h2>

     You May Also Like

  </h2>

  <div className="related-grid">

    {relatedBooks.map(

      (book) => (

        <div

          key={book.id}

          className="related-card"

          onClick={() =>

            navigate(
              `/ebook/${book.id}`
            )

          }

        >

          <img

            src={`/covers/${book.file_name
              .replace(".epub", "")
              .toLowerCase()
              .replace(/ /g, "_")}.jpg`}

            alt={book.title}

          />

          <h3>

            {book.title}

          </h3>

        </div>

      )

    )}

  </div>

</div>

      </div>

      <Footer />

    </div>

  );

}

export default EbookDetails;