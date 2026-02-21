import React, { useState } from "react";
import "./contact.css";
import { SOCIALS } from "./contactData";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with your real API call
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <section className="contact-wrapper">
      {/* Decorative bg */}
      <div className="contact-grid-bg" aria-hidden="true" />
      <div className="contact-glow-tr" aria-hidden="true" />
      <div className="contact-glow-bl" aria-hidden="true" />

      <div className="contact-container">
        {/* ── Hero ───────────────────────────────────────────── */}
        <div className="contact-hero">
          <div className="contact-badge">
            <i className="bi bi-terminal-fill" />
            contact.me
          </div>
          <h1 className="contact-title">
            Let's <span className="contact-title--cyan">Work Together</span>
          </h1>
          <p className="contact-desc">
            Have a project in mind or just want to say hi? Drop a message — I
            typically respond within 24 hours.
          </p>
        </div>

        <div className="contact-divider" aria-hidden="true" />

        {/* ── Body: left info + right form ───────────────────── */}
        <div className="contact-body">
          {/* Left — info panel */}
          <aside className="contact-info">
            <div className="contact-info__inner">
              <h2 className="contact-info__heading">
                <i className="bi bi-person-lines-fill" />
                Get in Touch
              </h2>
              <p className="contact-info__sub">
                Open to full-time roles, freelance and interesting
                collaborations. Let's build something great.
              </p>

              {/* Availability chip */}
              <div className="contact-avail">
                <span className="contact-avail__dot" />
                Available for new opportunities
              </div>

              {/* Socials */}
              <ul className="contact-socials">
                {SOCIALS.map(({ icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      className="contact-social"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="contact-social__icon">
                        <i className={`bi ${icon}`} />
                      </span>
                      <span className="contact-social__info">
                        <span className="contact-social__label">{label}</span>
                        <span className="contact-social__value">{value}</span>
                      </span>
                      <i className="bi bi-arrow-up-right contact-social__arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right — form */}
          <div className="contact-form-wrap">
            {status === "sent" ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <i className="bi bi-check-lg" />
                </div>
                <h3 className="contact-success__title">Message Sent!</h3>
                <p className="contact-success__text">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  className="contact-success__reset"
                  onClick={() => {
                    setStatus(null);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="contact-field">
                    <label className="contact-field__label" htmlFor="name">
                      <i className="bi bi-person" /> Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="contact-field__input"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label className="contact-field__label" htmlFor="email">
                      <i className="bi bi-envelope" /> Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="contact-field__input"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label className="contact-field__label" htmlFor="subject">
                    <i className="bi bi-chat-left-text" /> Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="contact-field__input"
                    placeholder="Project inquiry / Just saying hi"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-field__label" htmlFor="message">
                    <i className="bi bi-pencil" /> Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact-field__input contact-field__textarea"
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`contact-submit ${status === "sending" ? "contact-submit--sending" : ""}`}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="contact-submit__spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="bi bi-send contact-submit__icon" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
