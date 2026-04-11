import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./contact.css";
import { SOCIALS } from "./contactData";
import { sendRequestMessage } from "../../redux/actions/requestMessageAction";
import { resetRequestMessage } from "../../redux/slices/requestMessageSlice";

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
  else if (form.email.trim().length > 30)
    errors.email = "Email must be less than 30 characters.";

  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 5)
    errors.message = "Message must be at least 5 characters.";
  else if (form.message.trim().length > 500)
    errors.message = "Message must be less than 500 characters.";

  return errors;
}

// ── Component ───────────────────────────────────────────────────────────────
const EMPTY_FORM = { name: "", email: "", message: "" };

const Contact = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, success, error } = useSelector(
    (state) => state.requestMessage,
  );

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [messageHighlight, setMessageHighlight] = useState(false);

  const messageRef = useRef(null);
  const formWrapRef = useRef(null);

  // Auto-focus & highlight message box when coming from "Hire Me"
  useEffect(() => {
    if (location.state?.fromHireMe) {
      // Small delay so page renders fully first
      const timer = setTimeout(() => {
        formWrapRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setTimeout(() => {
          messageRef.current?.focus();
          setMessageHighlight(true);
          // Remove highlight class after animation ends
          setTimeout(() => setMessageHighlight(false), 1800);
        }, 400);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    return () => {
      dispatch(resetRequestMessage());
    };
  }, [dispatch]);

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
    setTouched({ name: true, email: true, message: true });
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(
      sendRequestMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }),
    );
  };

  const handleReset = () => {
    dispatch(resetRequestMessage());
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
  };

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
            <i className="bi bi-briefcase-fill" />
            open to work
          </div>
          <h1 className="contact-title">
            Hire Me or <span className="contact-title--cyan">Say Hello</span>
          </h1>
          <p className="contact-desc">
            I'm actively looking for new opportunities — full-time. Whether
            you're a recruiter, a hiring manager or just want to connect, my
            inbox is always open.
          </p>
        </div>

        <div className="contact-divider" aria-hidden="true" />

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="contact-body">
          {/* Left — info panel */}
          <aside className="contact-info">
            <div className="contact-info__inner">
              <h2 className="contact-info__heading">
                <i className="bi bi-person-badge-fill" />
                Why Reach Out?
              </h2>
              <p className="contact-info__sub">
                Looking for a developer who ships clean, scalable code? I'm open
                to full-time roles, freelance gigs and exciting collaborations.
                Let's talk.
              </p>

              <div className="contact-avail">
                <span className="contact-avail__dot" />
                Actively seeking opportunities
              </div>

              <div className="contact-chips">
                <span className="contact-chip">
                  <i className="bi bi-lightning-charge-fill" /> Full-Time
                </span>
                <span className="contact-chip">
                  <i className="bi bi-clock-fill" /> Freelance
                </span>
                <span className="contact-chip">
                  <i className="bi bi-globe2" /> Remote / On-site
                </span>
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
          <div className="contact-form-wrap" ref={formWrapRef}>
            {success ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <i className="bi bi-check-lg" />
                </div>
                <h3 className="contact-success__title">Message Received!</h3>
                <p className="contact-success__text">
                  Thanks for reaching out! I'll review your message and get back
                  to you within 24 hours.
                </p>
                <button
                  className="contact-success__reset"
                  onClick={handleReset}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__heading">
                  <i className="bi bi-send-fill" />
                  <span>Drop me a message</span>
                </div>

                {error && (
                  <div className="contact-form__api-error" role="alert">
                    <i className="bi bi-exclamation-triangle-fill" />
                    {error}
                  </div>
                )}

                <div className="contact-form__row">
                  <div
                    className={`contact-field${fieldError("name") ? " contact-field--error" : ""}`}
                  >
                    <label className="contact-field__label" htmlFor="name">
                      <i className="bi bi-person" /> Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="contact-field__input"
                      placeholder="e.g. Tarini Sharma"
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
                      <i className="bi bi-envelope" /> Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="contact-field__input"
                      placeholder="you@company.com"
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

                {/* Message — highlight when coming from Hire Me */}
                <div
                  className={`contact-field${fieldError("message") ? " contact-field--error" : ""}${messageHighlight ? " contact-field--highlight" : ""}`}
                >
                  <label className="contact-field__label" htmlFor="message">
                    <i className="bi bi-pencil" /> Message
                  </label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    className="contact-field__input contact-field__textarea"
                    placeholder="Hi! I came across your portfolio and I'd love to discuss a role / opportunity at [Company]..."
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

                <button
                  type="submit"
                  className={`contact-submit${loading ? " contact-submit--sending" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
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
