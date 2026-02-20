import React from "react";
import "./footer.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    icon: "bi-github",
    href: "https://github.com/anandasankar",
    label: "GitHub",
  },
  {
    icon: "bi-linkedin",
    href: "https://www.linkedin.com/in/ananda-sankar-sahoo-4239b4388",
    label: "LinkedIn",
  },
  {
    icon: "bi-envelope",
    href: "mailto:anandasankar.info@gmail.com",
    label: "Email",
  },
];

const Footer = () => (
  <footer className="site-footer pt-5 pb-4">
    <div className="container footer-inner">
      {/* Top gradient line */}
      <div className="footer-top-border"></div>

      <div className="row text-center text-md-start g-4">
        {/* ── Brand ── */}
        <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start">
          <a href="/" className="footer-logo">
            {"<Ananda.dev />"}
          </a>
          <p className="footer-tagline">
            Backend Developer building scalable APIs, distributed systems, and
            cloud-based applications.
          </p>
        </div>

        {/* ── Quick Links ── */}
        <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start">
          <span className="footer-heading">
            <i className="bi bi-map me-1"></i>Quick Links
          </span>
          <div className="d-flex flex-column gap-2">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Connect ── */}
        <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start">
          <span className="footer-heading">
            <i className="bi bi-broadcast me-1"></i>Connect
          </span>
          <div className="d-flex gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={s.label}
              >
                <i className={`bi ${s.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="footer-divider"></div>

      {/* ── Bottom bar ── */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 footer-bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          <span className="cyan">Ananda Sankar</span> · All rights reserved.
        </span>
        <span className="footer-status">
          <span className="footer-status-dot"></span>
          Available for opportunities
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
