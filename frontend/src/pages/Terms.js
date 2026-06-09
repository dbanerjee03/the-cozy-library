import "./InfoPages.css";

import { useEffect } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

function Terms() {

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
          Terms & Conditions
        </h1>

        <p>
          Simple guidelines for using
          The Cozy Library.
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

            Welcome to The Cozy Library!

            We are thrilled to have you here.

            <br />
            <br />

            By pulling up a chair and
            exploring our website,
            mobile applications,
            and services
            (collectively, the "Platform"),
            you agree to follow and be
            bound by the following
            Terms and Conditions.

            <br />
            <br />

            Please read them carefully.

            If you do not agree with
            any part of these terms,
            we kindly ask that you do
            not use our Platform.

          </p>

          <h2>
            1. Responsible Use of the Platform
          </h2>

          <p>

            By using this platform,
            you agree to use it responsibly.

            <br />
            <br />

            The Cozy Library is a safe,
            welcoming space for book lovers.

            We expect all community
            members to interact with
            kindness and respect.

            <br />
            <br />

            When using our Platform,
            you agree not to:

            <br />
            <br />

            • Post or transmit unlawful,
            harmful, threatening,
            abusive, or defamatory content.

            <br />
            <br />

            • Attempt to disrupt the
            website’s functionality,
            introduce viruses,
            or scrape data.

            <br />
            <br />

            • Impersonate any person
            or entity or falsely state
            your affiliation.

          </p>

          <h2>
            2. Your Account and Security
          </h2>

          <p>

            To access certain features,
            like keeping a digital wishlist
            or tracking your reading journey,
            you may need to create an account.

            <br />
            <br />

            <span className="quote">

              Users are responsible for
              maintaining account security.

            </span>

            <br />

            You agree to provide accurate,
            current, and complete information
            during registration.

            <br />
            <br />

            You are entirely responsible
            for safeguarding your password
            and restricting access to your device.

            <br />
            <br />

            If you suspect unauthorized use
            of your account, please notify us
            immediately at:

            <br />
            <br />

            <span className="quote">

              support@thecozylibrary.com

            </span>

          </p>

          <h2>
            3. Intellectual Property & Personal Use
          </h2>

          <p>

            We pour a lot of love into
            curating this space.

            <br />
            <br />

            All text, graphics, logos,
            images, and curated lists on
            The Cozy Library are protected
            by intellectual property laws.

            <br />
            <br />

            <span className="quote">

              Content and recommendations
              are provided for personal
              use only.

            </span>

            <br />

            You are granted a limited,
            non-exclusive,
            non-transferable license
            to access the Platform for
            personal, non-commercial use.

            <br />
            <br />

            You may not reproduce,
            duplicate, copy, sell,
            or exploit any portion of
            our website or curated content
            without explicit written
            permission.

          </p>

          <h2>
            4. Limitation of Liability
          </h2>

          <p>

            While we strive to provide
            the most accurate and magical
            book discovery experience possible,
            our services are provided
            on an "as is" basis.

            <br />
            <br />

            The Cozy Library does not
            guarantee uninterrupted,
            error-free functionality.

            <br />
            <br />

            We are not liable for any
            direct or indirect damages
            resulting from your use of,
            or inability to use,
            our Platform.

          </p>

          <h2>
            5. Changes to the Terms
          </h2>

          <p>

            As our library grows,
            we may occasionally update
            these Terms and Conditions.

            <br />
            <br />

            When we do,
            we will update the
            "Effective Date"
            at the top of this page.

            <br />
            <br />

            Your continued use of
            The Cozy Library after
            changes are posted
            constitutes acceptance
            of the updated terms.

          </p>

          <h2>
            Contact Us
          </h2>

          <p>

            If you have any questions
            or need clarification regarding
            these Terms and Conditions,
            please reach out to us at:

            <br />
            <br />

            <span className="quote">

              hello@thecozylibrary.com

            </span>

            <br />

            Thank you for being part
            of our reading community.

          </p>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Terms;