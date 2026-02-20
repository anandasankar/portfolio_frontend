import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top custom-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container">
        {/* Logo */}

        <NavLink className="navbar-brand logo" to="/">
          {"<Ananda.dev />"}
        </NavLink>

        {/* Toggle */}

        <button
          className={`navbar-toggler custom-toggler ${menuOpen ? "open" : ""}`}
          type="button"
          onClick={toggleMenu}
        >
          <span></span>

          <span></span>

          <span></span>
        </button>

        {/* Menu */}

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink onClick={closeMenu} className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink onClick={closeMenu} className="nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink onClick={closeMenu} className="nav-link" to="/projects">
                Projects
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink onClick={closeMenu} className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            <li className="nav-item mt-3 mt-lg-0 ms-lg-3">
              <button onClick={toggleTheme} className="theme-btn">
                {theme === "dark" ? "☀" : "🌙"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
