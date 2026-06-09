import "./InfoPages.css";

import { useEffect } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

function Contact() {

  useEffect(() => {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }, []);

  return (

    <div className="info-page">

      <Navbar />

      {/* HERO */}

      <div className="info-hero">

        <h1>
          Contact Us
        </h1>

        <p>
          We'd love to hear from you.
        </p>

      </div>

      {/* CONTENT */}

      <div className="info-content">

        <div className="info-card">

          <h2>
            Reach Out
          </h2>

          <p>

            Have a question about a
            book recommendation,
            need help with your account,
            or just want to chat about
            your latest favorite read?

            <br />
            <br />

            We’d love to hear from you!

            <br />
            <br />

            Our virtual doors are
            always open.

          </p>

          <h2>
            Send Us a Letter
            (Or an Email)
          </h2>

          <p>

            Whether you have a technical
            question or a suggestion for
            a hidden gem we should feature,
            drop us a line.

            <br />
            <br />

            We promise a real human will
            read it and get back to you.

            <br />
            <br />

            <span className="quote">

              Email:
              support@cozylibrary.com

            </span>

          </p>

          <h2>
            Join the Community
          </h2>

          <p>

            For daily reading inspiration,
            cozy aesthetics,
            and interactive book discussions,
            come hang out with us on
            social media.

            <br />
            <br />

            <span className="quote">

              Instagram:
              @thecozylibrary

            </span>

          </p>

          <h2>
            Check Under the Hood
          </h2>

          <p>

            The Cozy Library is built
            with love and open-source code.

            <br />
            <br />

            If you are a developer who
            loves books, come look at
            our shelves, report bugs,
            or contribute to our platform.

            <br />
            <br />

            <span className="quote">

              GitHub:
              github.com/cozylibrary

            </span>

          </p>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Contact;