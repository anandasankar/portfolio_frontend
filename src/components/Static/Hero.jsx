import React from "react";
import profile from "../../assets/photo.png";
import "./hero.css";

const STACK = ["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Docker"];

const Hero = () => (
  <section className="hero-section">
    {/* Ambient glows */}
    <div className="hero-glow-tr"></div>
    <div className="hero-glow-bl"></div>

    <div className="container hero-inner py-5">
      <div className="row align-items-center gy-5">
        {/* ── Text ── */}
        <div className="col-12 col-md-6 text-center text-md-start order-2 order-md-1">
          {/* Greeting */}
          <p className="hero-greeting">// Hello</p>

          {/* Name */}
          <h1 className="hero-name">
            I'm <span className="cyan">Ananda</span>
            <br />
            Sankar
          </h1>

          {/* Role */}
          <div className="hero-role">
            <span className="hero-role-label">const role =</span>
            <span className="hero-role-value">"Backend Developer"</span>
          </div>

          {/* Description */}
          <p className="hero-desc">
            I design and build{" "}
            <span className="cyan">scalable backend systems</span>,{" "}
            <span className="cyan">RESTful APIs</span>, and cloud-ready
            applications that handle real-world traffic at scale.
          </p>

          {/* CTA buttons */}
          <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
            <a
              href="mailto:anandasankar.info@gmail.com"
              className="hero-btn-primary"
            >
              <i className="bi bi-envelope-fill"></i>
              Contact Me
            </a>
            <a href="#projects" className="hero-btn-outline">
              <i className="bi bi-code-slash"></i>
              Projects
            </a>
          </div>

          {/* Tech stack pills */}
          <div className="hero-stack justify-content-center justify-content-md-start">
            {STACK.map((tech) => (
              <span className="hero-stack-pill" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Image ── */}
        <div className="col-12 col-md-6 text-center order-1 order-md-2">
          <div className="hero-img-wrap d-inline-block">
            {/* Floating chips */}
            <span className="hero-chip hero-chip-1">
              <i className="bi bi-lightning-fill me-1"></i>Node.js
            </span>
            <span className="hero-chip hero-chip-2">
              <i className="bi bi-cloud-fill me-1"></i>AWS
            </span>
            <span className="hero-chip hero-chip-3">
              <i className="bi bi-database-fill me-1"></i>PostgreSQL
            </span>

            {/* Rings */}
            <div className="hero-ring-outer"></div>
            <div className="hero-ring-inner"></div>

            <img src={profile} alt="Ananda Sankar" />
          </div>
        </div>
      </div>
    </div>

    {/* Scroll hint */}
    <div className="hero-scroll-hint">
      <span>scroll</span>
      <div className="hero-scroll-arrow"></div>
    </div>
  </section>
);

export default Hero;
