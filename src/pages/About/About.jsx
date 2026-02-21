import React from "react";
import profile from "../../assets/photo.png";
import "./about.css";
import { EXPERIENCES, SKILLS, STATS } from "./aboutData";


/* ── Small reusable pieces ── */
const Badge = ({ icon, label }) => (
  <div className="about-section-badge">
    <i className={`bi ${icon} me-2`}></i>
    {label}
  </div>
);

const SectionHeader = ({ icon, badgeLabel, title }) => (
  <>
    <Badge icon={icon} label={badgeLabel} />
    <h3 className="about-section-title">{title}</h3>
    <div className="about-title-underline"></div>
  </>
);

const SkillCard = ({ skill }) => (
  <div className="about-skill-card" style={{ "--card-accent": skill.color }}>
    <div className="about-skill-icon-wrap">
      <i className={`bi ${skill.icon}`}></i>
    </div>
    <h5>{skill.title}</h5>
    <div>
      {skill.items.map((item) => (
        <span className="about-skill-badge" key={item.label}>
          <i className={`bi ${item.icon}`}></i>
          {item.label}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceItem = ({ exp }) => (
  <div className="about-timeline-item">
    <div className={`about-timeline-dot ${exp.current ? "active" : ""}`}></div>
    <div className="about-exp-card">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">
        <div>
          <span className="about-exp-role">
            {exp.role}
            {exp.current && <span className="about-current-badge">● live</span>}
          </span>
          <div className="about-exp-company mt-1">{exp.company}</div>
        </div>
        <span className="about-exp-period">
          <i className="bi bi-calendar3 me-1"></i>
          {exp.period}
        </span>
      </div>
      <p className="about-exp-desc">{exp.desc}</p>
    </div>
  </div>
);

/* ── Main component ── */
const About = () => (
  <section className="about-wrapper">
    <div className="container">
      {/* Hero */}
      <div className="text-center mb-5">
        <Badge icon="bi-person-badge" label="whoami" />
        <h1 className="about-hero-title mb-3">
          About <span className="cyan">Me</span>
        </h1>
        <p className="about-hero-desc">
          Backend Developer specializing in{" "}
          <span className="about-highlight">Node.js</span>,{" "}
          <span className="about-highlight">PostgreSQL</span>, and{" "}
          <span className="about-highlight">AWS</span> — building scalable,
          production-ready systems that power real-world applications.
        </p>
      </div>

      {/* Profile + Summary */}
      <div className="row align-items-center g-5 mb-5">
        <div className="col-lg-4 text-center">
          <div className="about-profile-wrap d-inline-block mb-4">
            <div className="about-profile-ring"></div>
            <img src={profile} alt="Ananda Sankar" />
          </div>

          <div className="row g-3 mt-2">
            {STATS.map((s) => (
              <div className="col-4" key={s.label}>
                <div className="about-stat-card">
                  <div className="about-stat-number">{s.number}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-8">
          <div className="about-summary-card">
            <Badge icon="bi-terminal" label="summary.json" />
            <p className="about-summary-text">
              I'm a <span className="about-highlight">Backend Developer</span>{" "}
              currently at{" "}
              <span className="about-highlight">Game Mano Private Limited</span>
              , building scalable APIs, microservices, and cloud-based backend
              systems. With over 2+ years of experience, I specialize in
              designing <span className="about-highlight">efficient APIs</span>,
              caching strategies, and robust backend architectures.
            </p>
            <p className="about-summary-text mb-0">
              My stack includes <span className="about-highlight">Node.js</span>
              , <span className="about-highlight">TypeScript</span>,{" "}
              <span className="about-highlight">PostgreSQL</span>,{" "}
              <span className="about-highlight">Redis</span>, and{" "}
              <span className="about-highlight">AWS</span>. I'm passionate about
              clean architecture, performance optimization, and delivering
              production-ready solutions that scale.
            </p>
          </div>
        </div>
      </div>

      <div className="about-glow-divider"></div>

      {/* Technical Skills */}
      <div className="mb-5">
        <div className="text-center">
          <SectionHeader
            icon="bi-code-square"
            badgeLabel="tech.stack"
            title="Technical Skills"
          />
        </div>
        <div className="row g-4">
          {SKILLS.map((skill) => (
            <div className="col-md-6 col-lg-4" key={skill.title}>
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>

      <div className="about-glow-divider"></div>

      {/* Experience */}
      <div>
        <div className="text-center">
          <SectionHeader
            icon="bi-briefcase"
            badgeLabel="experience.log"
            title="Professional Experience"
          />
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="about-timeline">
              {EXPERIENCES.map((exp) => (
                <ExperienceItem key={exp.company} exp={exp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
