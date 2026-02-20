import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light pt-5 pb-4 mt-5"
      style={{
        background: "rgba(2,6,23,0.95)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Logo and About */}

          <div className="col-12 col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
            <h5
              className="fw-bold mb-3"
              style={{
                color: "#38bdf8",
              }}
            >
              {"<Ananda.dev />"}
            </h5>

            <p
              className="text-secondary small"
              style={{
                maxWidth: "300px",
              }}
            >
              Backend Developer experienced in building scalable APIs,
              distributed systems, and cloud-based applications.
            </p>
          </div>

          {/* Quick Links */}

          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h6 className="fw-semibold mb-3" style={{ color: "#38bdf8" }}>
              Quick Links
            </h6>

            <div className="d-flex flex-column gap-2">
              <a href="/" className="text-secondary text-decoration-none small">
                Home
              </a>

              <a
                href="/about"
                className="text-secondary text-decoration-none small"
              >
                About
              </a>

              <a
                href="/projects"
                className="text-secondary text-decoration-none small"
              >
                Projects
              </a>

              <a
                href="/contact"
                className="text-secondary text-decoration-none small"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Connect */}

          <div className="col-12 col-md-4">
            <h6 className="fw-semibold mb-3" style={{ color: "#38bdf8" }}>
              Connect
            </h6>

            <div className="d-flex justify-content-center justify-content-md-start gap-4">
              <a href="#" className="text-secondary fs-5">
                <i className="bi bi-github"></i>
              </a>

              <a href="#" className="text-secondary fs-5">
                <i className="bi bi-linkedin"></i>
              </a>

              <a href="#" className="text-secondary fs-5">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#" className="text-secondary fs-5">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}

        <hr className="border-secondary my-4" />

        {/* Bottom */}

        <div className="text-center text-secondary small">
          © {new Date().getFullYear()} Ananda Sankar | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
