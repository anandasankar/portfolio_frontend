import React from "react";
import "./about.css";
import profile from "../../assets/photo.png";

const About = () => {
  return (
    <section className="container py-5 mt-5 about-section">
      {/* About Intro */}

      <div className="row align-items-center mb-5">
        <div className="col-lg-4 text-center mb-4 mb-lg-0">
          <img src={profile} alt="Ananda" className="about-img shadow" />
        </div>

        <div className="col-lg-8">
          <h3 className="mb-3">I'm Ananda Sankar</h3>

          <p className="about-text">
            Backend Developer with 2+ years of experience building scalable,
            secure, and high-performance backend systems using Node.js,
            TypeScript, and PostgreSQL.
          </p>

          <p className="about-text">
            Currently working at Game Mano Private Limited, developing modular
            RESTful APIs, RBAC systems, microservices, and cloud-based
            applications using AWS, Redis, and Docker.
          </p>

          <p className="about-text">
            Strong focus on clean architecture, performance optimization, and
            writing maintainable production-ready code.
          </p>
        </div>
      </div>

      {/* Skills */}

      <div>
        <h3 className="text-center mb-4">Technical Skills</h3>

        <div className="row g-4">
          {skills.map((skill, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3">
              <div className="skill-card text-center h-100">
                <i className={`${skill.icon} skill-icon`}></i>

                <h6 className="mt-3">{skill.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const skills = [
  { name: "JavaScript", icon: "bi bi-filetype-js" },

  { name: "TypeScript", icon: "bi bi-filetype-tsx" },

  { name: "Node.js", icon: "bi bi-diagram-3" },

  { name: "Express.js", icon: "bi bi-server" },

  { name: "PostgreSQL", icon: "bi bi-database" },

  { name: "MongoDB", icon: "bi bi-database-fill" },

  { name: "Redis", icon: "bi bi-lightning" },

  { name: "AWS", icon: "bi bi-cloud" },

  { name: "Docker", icon: "bi bi-box" },

  { name: "Git", icon: "bi bi-git" },

  { name: "REST API", icon: "bi bi-arrow-left-right" },

  { name: "Prisma ORM", icon: "bi bi-layers" },
];

export default About;
