import React, { useState } from "react";
import "./contact.css";
import { SOCIALS } from "./contactData";

// ── Validation ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = "Name is required.";
  else if (form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!form.subject.trim()) errors.subject = "Subject is required.";
  else if (form.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";

  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";

  return errors;
}

// ── Component ───────────────────────────────────────────────────────────────
const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null); // null | "sending" | "sent"

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...form }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) setErrors(validate(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Touch all fields so every error becomes visible
    setTouched({ name: true, email: true, subject: true, message: true });
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // block if invalid

    // ── Dummy send — replace setTimeout with your real API call ──────
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  const handleReset = () => {
    setStatus(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
  };

  // Only show error when the field has been touched
  const fieldError = (name) => (touched[name] && errors[name]) || null;

  return (
    <section className="contact-wrapper">
      <div className="contact-grid-bg" aria-hidden="true" />
      <div className="contact-glow-tr" aria-hidden="true" />
      <div className="contact-glow-bl" aria-hidden="true" />

      <div className="contact-container">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
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

        {/* ── Body ──────────────────────────────────────────────────────── */}
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

              <div className="contact-avail">
                <span className="contact-avail__dot" />
                Available for new opportunities
              </div>

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

          {/* Right — form / success */}
          <div className="contact-form-wrap">
            {status === "sent" ? (
              /* ── Success state ──────────────────────────────────────────── */
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
                  onClick={handleReset}
                >
                  Send another
                </button>
              </div>
            ) : (
              /* ── Form ───────────────────────────────────────────────────── */
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Row: Name + Email */}
                <div className="contact-form__row">
                  <div
                    className={`contact-field${fieldError("name") ? " contact-field--error" : ""}`}
                  >
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
                      onBlur={handleBlur}
                    />
                    {fieldError("name") && (
                      <span className="contact-field__error" role="alert">
                        <i className="bi bi-exclamation-circle" />{" "}
                        {fieldError("name")}
                      </span>
                    )}
                  </div>

                  <div
                    className={`contact-field${fieldError("email") ? " contact-field--error" : ""}`}
                  >
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
                      onBlur={handleBlur}
                    />
                    {fieldError("email") && (
                      <span className="contact-field__error" role="alert">
                        <i className="bi bi-exclamation-circle" />{" "}
                        {fieldError("email")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div
                  className={`contact-field${fieldError("subject") ? " contact-field--error" : ""}`}
                >
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
                    onBlur={handleBlur}
                  />
                  {fieldError("subject") && (
                    <span className="contact-field__error" role="alert">
                      <i className="bi bi-exclamation-circle" />{" "}
                      {fieldError("subject")}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div
                  className={`contact-field${fieldError("message") ? " contact-field--error" : ""}`}
                >
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
                    onBlur={handleBlur}
                  />
                  {fieldError("message") && (
                    <span className="contact-field__error" role="alert">
                      <i className="bi bi-exclamation-circle" />{" "}
                      {fieldError("message")}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`contact-submit${status === "sending" ? " contact-submit--sending" : ""}`}
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
