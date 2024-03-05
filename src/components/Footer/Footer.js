import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Thanks for visiting my Web App!
        </p>
        <p className="footer-subscription-text">
          Developed by Davis Morales
        </p>
      </section>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              NBA Reference
              <i className="fa-solid fa-basketball" />
            </Link>
          </div>
          <div class="social-icons">
            <Link
              class="social-icon-link github"
              to="https://github.com/davismorales"
              target="_blank"
              aria-label="Github"
            >
              <i class="fab fa-github" />
            </Link>
            <Link
              class="social-icon-link linkedin"
              to="https://www.linkedin.com/in/davis-morales"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
