import React from "react";
import "./projects.css";
import { PROJECTS } from "./projectsData";

/* ─── Sub-components ──────────────────────────────────────────── */

const Badge = ({ icon, label }) => (
  <div className="projects-badge">
    <i className={`bi ${icon}`}></i>
    {label}
  </div>
);

const SectionHeader = ({ icon, badge, title }) => (
  <div className="text-center mb-4">
    <Badge icon={icon} label={badge} />
    <h3 className="projects-section-title">{title}</h3>
    <div className="projects-title-underline" />
  </div>
);

const ProjectCard = ({ project: p }) => (
  <div className="proj-card" style={{ "--proj-accent": p.accent }}>
    {/* Left panel: icon + year */}
    <div className="proj-card-left">
      <div className="proj-icon-wrap">
        <i className={`bi ${p.icon}`} />
      </div>
      <span className="proj-year">{p.year}</span>
    </div>

    {/* Right panel: all content */}
    <div className="proj-card-body">
      <div className="proj-card-header-row">
        <div>
          <h4 className="proj-title">{p.title}</h4>
          <p className="proj-subtitle">{p.subtitle}</p>
        </div>
      </div>

      <p className="proj-desc">{p.desc}</p>

      <div className="proj-tags">
        {p.tags.map((t) => (
          <span className="proj-tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Page ────────────────────────────────────────────────────── */
const Projects = () => (
  <section className="projects-wrapper">
    <div className="projects-grid-bg" aria-hidden="true" />
    <div className="projects-glow-tr" aria-hidden="true" />
    <div className="projects-glow-bl" aria-hidden="true" />

    <div className="container">
      {/* Hero header */}
      <div className="text-center mb-5">
        <Badge icon="bi-terminal-fill" label="portfolio.projects" />
        <h1 className="projects-hero-title mb-3">
          Projects <span className="cyan">I've Worked On</span>
        </h1>
        <p className="projects-hero-desc">
          A collection of production systems and engineering work — from
          scalable APIs and microservices to real-time platforms and
          performance-optimized backends.
        </p>
      </div>

      <div className="projects-divider" />

      {/* All projects */}
      <SectionHeader
        icon="bi-code-square"
        badge="all.projects"
        title="All Projects"
      />

      <div className="proj-card-stack">
        {PROJECTS.map((p) => (
          <ProjectCard project={p} key={p.title} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
