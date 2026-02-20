import React from "react";

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        background: "rgba(2,6,23,0.95)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="container">
        <div className="row gy-4 text-center text-md-start">
          {/* Logo & About */}

          <div className="col-12 col-md-4">
            <h5
              className="fw-bold mb-3"
              style={{
                color: "#38bdf8",
                fontSize: "20px",
              }}
            >
              {"<Ananda.dev />"}
            </h5>

            <p
              className="text-secondary"
              style={{
                fontSize: "14px",
                lineHeight: "1.7",
                maxWidth: "320px",
              }}
            >
              Backend Developer experienced in building scalable APIs,
              distributed systems, and cloud-based applications.
            </p>
          </div>

          {/* Quick Links */}

          <div className="col-12 col-md-4">
            <h6
              className="fw-semibold mb-3"
              style={{
                color: "#38bdf8",
                fontSize: "16px",
              }}
            >
              Quick Links
            </h6>

            <div className="d-flex flex-column gap-2">
              <a
                href="/"
                className="text-secondary text-decoration-none"
                style={{ fontSize: "14px" }}
              >
                Home
              </a>

              <a
                href="/about"
                className="text-secondary text-decoration-none"
                style={{ fontSize: "14px" }}
              >
                About
              </a>

              <a
                href="/skill"
                className="text-secondary text-decoration-none"
                style={{ fontSize: "14px" }}
              >
                Projects
              </a>

              <a
                href="/contact"
                className="text-secondary text-decoration-none"
                style={{ fontSize: "14px" }}
              >
                Contact
              </a>
            </div>
          </div>

          {/* Connect */}

          <div className="col-12 col-md-4">
            <h6
              className="fw-semibold mb-3"
              style={{
                color: "#38bdf8",
                fontSize: "16px",
              }}
            >
              Connect
            </h6>

            <div className="d-flex justify-content-center justify-content-md-start gap-3">
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

        {/* Bottom */}

        <hr className="border-secondary mt-4" />

        <div
          className="text-center text-secondary"
          style={{
            fontSize: "13px",
          }}
        >
          © {new Date().getFullYear()} Ananda Sankar | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
