import { useState, useEffect } from "react";
import { profile } from "./content.js";
import Lanyard from "./Lanyard";
import { KineticTypographyLoader } from "./components/ui/loading-animation";

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    return saved;
  });
  const [copied, setCopied] = useState(false);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    {booting && <KineticTypographyLoader onFinished={() => setBooting(false)} />}
    <div className="site-wrapper" inert={booting ? true : undefined}>
      {/* Navigation */}
      <header className="navbar">
        <a href="#top" className="brand-logo">
          <span className="brand-dot" />
          <span className="brand-text">{profile.name}</span>
        </a>

        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <a
            href="/abin_mathew_fs.pdf"
            download="Abin_Mathew_CV.pdf"
            className="theme-btn"
          >
            CV ↓
          </a>
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle monochrome light/dark mode"
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>
        </div>
      </header>

      <main id="top" className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-details">
              <div className="status-pill">
                <span className="pulse-dot" />
                <span>{profile.status}</span>
              </div>

              <h1 className="hero-title">
                Thoughtful systems. Seamless experiences.
                <span className="hero-title-sub">
                  Crafting quiet, minimal & high-performance software.
                </span>
              </h1>

              <p className="hero-bio">{profile.bio}</p>

              <div className="hero-cta-group">
                <a href="#work" className="btn btn-primary">
                  View Work ↓
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Get in Touch →
                </a>
                <a
                  href="/abin_mathew_fs.pdf"
                  download="Abin_Mathew_CV.pdf"
                  className="btn btn-secondary hero-cv"
                >
                  Download CV ↓
                </a>
              </div>

              <div className="hero-meta">
                <span>Location: {profile.location}</span>
                <span className="divider">/</span>
                <span>Role: {profile.role}</span>
              </div>
            </div>

            <div className="hero-portrait-wrapper">
              <div className="lanyard-container" style={{ width: "100%", height: "600px" }}>
                <Lanyard
                  frontImage="/card-front.png"
                  backImage="/card-back.png"
                  strapImage="/band.png"
                  imageFit="cover"
                  cardColor="#ffffff"
                  orientation="portrait"
                  finish="glossy"
                  cornerRadius={0.3}
                  size={0.6}
                  anchor="center"
                  strapLength={0.5}
                  strapColor="#111111"
                  strapWidth={0.65}
                  metal="silver"
                  gravity={1}
                  damping={0.5}
                  elasticity={0.5}
                  breeze={0.5}
                  interactive
                  intro
                />
              </div>
              {/* <p className="lanyard-hint">Interactive 3D · Drag to swing / Click to flip</p> */}
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="section-block">
          <div className="section-header">
            <span className="section-index">01</span>
            <h2 className="section-title">Selected Work</h2>
          </div>

          <div className="projects-grid">
            {profile.projects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-top">
                  <span className="project-id">{project.id}</span>
                  <span className="project-year">{project.year}</span>
                </div>

                <div className="project-body">
                  <p className="project-category">{project.category}</p>
                  <h3 className="project-name">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer">
                        {project.title} <span className="arrow-icon">↗</span>
                      </a>
                    ) : (
                      <span className="project-name-static">
                        {project.title} <span className="badge-tag">Company Work</span>
                      </span>
                    )}
                  </h3>
                  <p className="project-desc">{project.description}</p>
                </div>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills & Stack */}
        <section id="skills" className="section-block">
          <div className="section-header">
            <span className="section-index">02</span>
            <h2 className="section-title">Skills & Stack</h2>
          </div>

          <div className="skills-grid">
            <div className="skill-column">
              <h3 className="skill-cat-title">Frontend Engineering</h3>
              <ul className="skill-list">
                {profile.skills.frontend.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="skill-column">
              <h3 className="skill-cat-title">Backend & APIs</h3>
              <ul className="skill-list">
                {profile.skills.backend.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="skill-column">
              <h3 className="skill-cat-title">Tools & Environment</h3>
              <ul className="skill-list">
                {profile.skills.tools.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* About & Philosophy */}
        <section id="about" className="section-block">
          <div className="section-header">
            <span className="section-index">03</span>
            <h2 className="section-title">Philosophy</h2>
          </div>

          <div className="about-grid">
            <div className="about-text-col">
              {profile.about.map((paragraph, idx) => (
                <p key={idx} className="about-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="about-stats-col">
              <div className="stat-card">
                <span className="stat-num">3.5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">+25%</span>
                <span className="stat-label">API Performance Boost (Cognizant)</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">30+</span>
                <span className="stat-label">Production APIs Engineered</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section-block">
          <div className="section-header">
            <span className="section-index">04</span>
            <h2 className="section-title">Contact</h2>
          </div>

          <div className="contact-box">
            <h3 className="contact-headline">
              Have an idea or project in mind? Let’s collaborate.
            </h3>

            <div className="email-action-row">
              <a href={`mailto:${profile.email}`} className="email-display">
                {profile.email}
              </a>
              <button
                type="button"
                className="btn btn-secondary copy-btn"
                onClick={copyEmail}
              >
                {copied ? "Copied ✓" : "Copy Email"}
              </button>
            </div>

            <div className="social-links-row">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-anchor"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-bar">
        <p className="copyright-text">
          © {new Date().getFullYear()} {profile.name} · India
        </p>
        <a href="#top" className="back-top-link">
          Back to top ↑
        </a>
      </footer>
    </div>
    </>
  );
}
