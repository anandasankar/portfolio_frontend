import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: "bi-house" },
  { to: "/about", label: "About", icon: "bi-person" },
  { to: "/projects", label: "Projects", icon: "bi-code-slash" },
  { to: "/contact", label: "Contact", icon: "bi-envelope" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`cnav ${scrolled ? "cnav--scrolled" : ""}`}>
      <div className="cnav__line" aria-hidden="true" />

      <div className="cnav__inner">
        {/* Logo */}
        <NavLink className="cnav__logo" to="/" onClick={closeMenu}>
          <span className="cnav__logo-bracket">&lt;</span>
          Ananda
          <span className="cnav__logo-dot">.</span>
          dev
          <span className="cnav__logo-bracket">&nbsp;/&gt;</span>
        </NavLink>

        {/* Desktop links */}
        <ul className="cnav__links">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                className={({ isActive }) =>
                  `cnav__link ${isActive ? "cnav__link--active" : ""}`
                }
                to={to}
                onClick={closeMenu}
                end={to === "/"}
              >
                <i className={`bi ${icon} cnav__link-icon`} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:ananda@example.com"
          className="cnav__cta"
          onClick={closeMenu}
        >
          <span>Hire Me</span>
          <i className="bi bi-arrow-up-right" />
        </a>

        {/* Hamburger */}
        <button
          className={`cnav__burger ${menuOpen ? "cnav__burger--open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`cnav__drawer ${menuOpen ? "cnav__drawer--open" : ""}`}>
        <ul className="cnav__drawer-links">
          {NAV_LINKS.map(({ to, label, icon }, i) => (
            <li key={to} style={{ "--i": i }}>
              <NavLink
                className={({ isActive }) =>
                  `cnav__drawer-link ${isActive ? "cnav__drawer-link--active" : ""}`
                }
                to={to}
                onClick={closeMenu}
                end={to === "/"}
              >
                <i className={`bi ${icon} cnav__drawer-icon`} />
                {label}
                <i className="bi bi-arrow-right cnav__drawer-arrow" />
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="mailto:ananda@example.com"
          className="cnav__drawer-cta"
          onClick={closeMenu}
        >
          Hire Me <i className="bi bi-arrow-up-right" />
        </a>
      </div>

      {menuOpen && (
        <div
          className="cnav__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
