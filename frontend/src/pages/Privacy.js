import "./InfoPages.css";

import { useEffect } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

function Privacy() {

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
          Privacy Policy
        </h1>

        <p>
          Your trust means everything to us.
        </p>

      </div>

      {/* CONTENT */}

      <div className="info-content">

        <div className="info-card">

          <p className="effective-date">

            Effective Date:
            May 27, 2026

          </p>

          <p>

            Welcome to The Cozy Library.

            Just like a favorite reading
            nook, we believe your personal
            space should feel safe, secure,
            and entirely your own.

            <br />
            <br />

            Your trust means everything
            to us.

            <br />
            <br />

            This Privacy Policy outlines
            how we collect, use, and
            protect your information when
            you visit our website and use
            our services.

          </p>

          <h2>
            1. Our Core Promise
          </h2>

          <p>

            We do not sell, rent, or share
            your personal information with
            third parties for their
            marketing purposes.

            <br />
            <br />

            <span className="quote">

              Your reading habits,
              your late-night wishlists,
              and your personal details
              belong to you.

            </span>

            <br />

            We are in the business of
            recommending great books,
            not selling data.

          </p>

          <h2>
            2. Information We Collect
          </h2>

          <p>

            To provide you with a warm,
            personalized, and magical
            experience, we only collect
            the necessary information
            required to run our library.

            <br />
            <br />

            <strong>
              Account Details:
            </strong>

            <br />

            Your name, email address,
            and password when you create
            an account.

            <br />
            <br />

            <strong>
              Reading Preferences:
            </strong>

            <br />

            Your wishlist, book reviews,
            and reading history help us
            tailor recommendations to
            your unique taste.

            <br />
            <br />

            <strong>
              Order & Transaction Data:
            </strong>

            <br />

            If you make a purchase,
            we securely process your
            shipping address and billing
            details.

            <br />
            <br />

            We never store your full
            credit card information on
            our servers.

          </p>

          <h2>
            3. How We Use Your Information
          </h2>

          <p>

            The Cozy Library only uses
            necessary information to
            improve your reading
            experience.

            <br />
            <br />

            Specifically, we use it to:

            <br />
            <br />

            • Fulfill and ship your
            book orders.

            <br />
            <br />

            • Remember your wishlist
            and account settings.

            <br />
            <br />

            • Send personalized
            recommendations and updates.

            <br />
            <br />

            • Improve website functionality
            to keep your browsing
            experience seamless and cozy.

          </p>

          <h2>
            4. Keeping Your Data Private & Secure
          </h2>

          <p>

            We take data security seriously.

            <br />
            <br />

            <strong>
              Encryption:
            </strong>

            <br />

            We use secure SSL technology
            to encrypt data transmissions.

            <br />
            <br />

            <strong>
              Strict Access Controls:
            </strong>

            <br />

            Only essential team members
            who need your information
            have access to your data.

          </p>

          <h2>
            5. Cookies and Tracking
          </h2>

          <p>

            We use cookies solely to
            make our website functional.

            <br />
            <br />

            Cookies help remember your
            cart, keep you logged in,
            and improve your browsing
            experience.

            <br />
            <br />

            You may disable cookies
            through your browser settings,
            though some features may not
            function perfectly without them.

          </p>

          <h2>
            6. Your Rights and Choices
          </h2>

          <p>

            Because this is your data,
            you have total control over it.

            <br />
            <br />

            At any time, you can:

            <br />
            <br />

            • Update or correct your
            account details.

            <br />
            <br />

            • Request a copy of the data
            we hold about you.

            <br />
            <br />

            • Request permanent deletion
            of your account and associated
            data.

          </p>

          <h2>
            7. Updates to This Policy
          </h2>

          <p>

            Occasionally, we may update
            this policy to reflect changes
            in our practices or legal
            requirements.

            <br />
            <br />

            If significant changes occur,
            we will notify you through
            our website or by email.

          </p>

          <h2>
            Contact Us
          </h2>

          <p>

            If you have any questions,
            concerns, or simply want to
            know more about how we keep
            your data safe, please reach
            out to us at:

            <br />
            <br />

            <span className="quote">

              privacy@thecozylibrary.com

            </span>

          </p>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Privacy;