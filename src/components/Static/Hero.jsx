import React from "react";
import profile from "../../assets/photo.png";

const Hero = () => {
  return (
    <section
      className="d-flex align-items-center py-5"
      style={{ minHeight: "90vh" }}
    >
      <div className="container">
        <div className="row align-items-center gy-5">
          {/* TEXT */}

          <div className="col-12 col-md-6 text-center text-md-start order-2 order-md-1">
            {/* Name */}

            <h1 className="fw-bold text-info mb-3 display-5">Hi, I'm Ananda</h1>

            {/* Role */}

            <h4 className="mb-3 fs-4">Backend Developer</h4>

            {/* Description */}

            <p className="mb-4 fs-6">
              I design and build scalable backend systems, RESTful APIs, and
              cloud-ready applications.
            </p>

            {/* Buttons */}

            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
              <a
                href="mailto:anandasankar.info@gmail.com"
                className="btn btn-info px-4 d-flex align-items-center gap-2"
              >
                <i className="bi bi-envelope"></i>
                Contact
              </a>

              <a
                href="#projects"
                className="btn btn-outline-info px-4 d-flex align-items-center gap-2"
              >
                <i className="bi bi-code-slash"></i>
                Projects
              </a>

              <a
                href="mailto:anandasankar.info@gmail.com"
                className="btn btn-outline-info px-4 d-flex align-items-center gap-2"
              >
                <i className="bi bi-download"></i>
                Resume
              </a>
            </div>
          </div>

          {/* IMAGE */}

          <div className="col-12 col-md-6 text-center order-1 order-md-2">
            <img
              src={profile}
              alt="Ananda"
              className="img-fluid rounded-circle shadow"
              style={{
                width: "280px",
                height: "280px",
                objectFit: "cover",
                border: "4px solid #38bdf8",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
