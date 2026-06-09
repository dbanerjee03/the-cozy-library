import "./InfoPages.css";

import { useEffect } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

function About() {

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
          Our Story: Welcome to The Cozy Library
        </h1>

        <p>
          A place where stories feel
          like home.
        </p>

      </div>

      {/* CONTENT */}

      <div className="info-content">

        <div className="info-card">

          <h2>
            The Spark of an Idea
          </h2>

          <p>

            The Cozy Library was created
            with one simple idea:
            helping readers discover books
            that truly stay with them.

            <br />
            <br />

            It didn’t start in a boardroom;
            it started in a drafty room with
            a hot mug of tea, a stack of
            well-worn paperbacks, and a
            familiar frustration.

            <br />
            <br />

            In a world of endless scrolling
            and algorithmic recommendations,
            we realized that the joy of
            finding your next great read
            was getting lost in the noise.

            <br />
            <br />

            We missed the feeling of a
            friend handing you a book and
            saying:

            <br />
            <br />

            <span className="quote">

              "You have to read this —
              it made me think of you."

            </span>

          </p>

          <h2>
            Our Philosophy
          </h2>

          <p>

            From timeless classics to
            hidden gems, our goal is to
            make book discovery feel warm,
            personal, and magical.

            <br />
            <br />

            We believe that a book
            shouldn't just pass the time;
            it should leave a footprint
            on your soul.

            <br />
            <br />

            <span className="quote">

              "A truly great book doesn't
              end when you turn the final
              page. It stays with you,
              altering the way you view
              the world."

            </span>

          </p>

          <h2>
            How We Do Things Differently
          </h2>

          <p>

            <strong>
              Curated, Not Computed:
            </strong>

            <br />

            We trade cold algorithms
            for human hearts.
            Every recommendation is
            hand-selected by people who
            read, dream, and care.

            <br />
            <br />

            <strong>
              Celebrating the Overlooked:
            </strong>

            <br />

            While we love a bestseller,
            we make it our mission to
            shine a spotlight on indie
            authors, forgotten classics,
            and hidden gems that deserve
            a spot on your shelf.

            <br />
            <br />

            <strong>
              The Cozy Standard:
            </strong>

            <br />

            We measure a book's success
            not by its sales rank,
            but by its comfort level.

            Whether it’s a gripping mystery
            or a sweeping historical epic,
            it has to have that
            unputdownable magic.

          </p>

          <h2>
            Pull Up a Chair
          </h2>

          <p>

            Whether you are a lifelong
            bibliophile looking to break
            out of a reading slump,
            or a casual reader searching
            for that one special story
            to spark your imagination,
            you have a place at our table.

            <br />
            <br />

            Grab your favorite blanket,
            pour a fresh cup of tea,
            and let’s find your next
            unforgettable story together.

            <br />
            <br />

            <span className="quote">

              Welcome to the family.
              Welcome to The Cozy Library.

            </span>

          </p>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default About;