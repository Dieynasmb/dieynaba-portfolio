
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

// La clé publique EmailJS peut venir du fichier .env.
// La valeur de secours permet de tester si Vite ne charge pas encore .env.
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "IxhPpqxQWK_zrkzlI";

const projects = [
  {
    number: "01",
    name: "VULPEX",
    category: "Services informatiques",
    description:
      "Une plateforme de services numériques dédiée aux entreprises, aux entrepreneurs et aux professionnels.",
    technologies: ["React", "JavaScript", "CSS"],
    url: "https://vulpex.netlify.app/",
    symbol: "</>",
    type: "vulpex",
  },
  {
    number: "02",
    name: "SadikhShop",
    category: "E-commerce",
    description:
      "Une boutique en ligne pour présenter des produits et offrir une expérience d'achat simple et agréable.",
    technologies: ["React", "Node.js", "E-commerce"],
    url: "https://sadikhshop.netlify.app/",
    symbol: "↗",
    type: "shop",
  },
  {
    number: "03",
    name: "Wazora",
    category: "Application web",
    description:
      "Une expérience web moderne, pensée pour faciliter l'accès aux services numériques.",
    technologies: ["React", "JavaScript", "CSS"],
    url: "https://wazora.netlify.app/",
    symbol: "W",
    type: "wazora",
  },
  {
    number: "04",
    name: "Billify",
    category: "Mini SaaS",
    description:
      "Une application de gestion de factures et de devis destinée aux indépendants et aux petites entreprises.",
    technologies: ["React", "JavaScript", "PDF"],
    url: "https://billifyapp.netlify.app/",
    symbol: "B",
    type: "billify",
  },
  {
    number: "05",
    name: "SalesIQ",
    category: "Data Analytics",
    description:
      "Un outil d'analyse des ventes pour transformer les données en indicateurs utiles à la prise de décision.",
    technologies: ["Python", "Pandas", "Data Analysis"],
    url: "https://saleanalyzer-production.up.railway.app/",
    github: "https://github.com/Dieynasmb/SALE_ANALYZER",
    symbol: "↗",
    type: "sales",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    symbol: "</>",
    skills: [
      "React.js",
      "Angular",
      "Vue.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    symbol: "{ }",
    skills: [
      "Node.js",
      "Express.js",
      "Django",
      "Flask",
      "Spring Boot",
      "Laravel",
    ],
  },
  {
    title: "Bases de données",
    symbol: "▤",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    title: "Data & Intelligence",
    symbol: "⌁",
    skills: ["Python", "Pandas", "NumPy", "Power BI", "Jupyter Notebook"],
  },
  {
    title: "Cloud & DevOps",
    symbol: "☁",
    skills: [
      "AWS",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "Git",
    ],
  },
  {
    title: "Réseaux & Infrastructure",
    symbol: "⌘",
    skills: [
      "Cisco Packet Tracer",
      "GNS3",
      "VMware",
      "VirtualBox",
      "pfSense",
      "Wireshark",
    ],
  },
];

function SectionTitle({ eyebrow, title, highlight }) {
  return (
    <div className="section-heading reveal">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>
        {title} <span>{highlight}</span>
      </h2>
    </div>
  );
}

function ProjectPreview({ project }) {
  return (
    <div className={`project-preview preview-${project.type}`}>
      <div className="preview-browser">
        <div className="browser-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="browser-label">{project.name.toLowerCase()}.app</span>
        <span className="browser-menu">···</span>
      </div>

      <div className="preview-content">
        <div className="preview-brand">
          <span className="preview-symbol">{project.symbol}</span>
          <span>{project.name}</span>
        </div>

        {project.type === "sales" ? (
          <div className="sales-preview">
            <div className="sales-mini-card">
              <span>Analyse</span>
              <strong>DATA</strong>
              <div className="mini-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="sales-mini-card">
              <span>Performance</span>
              <strong>+ Insights</strong>
              <div className="mini-line">⌁ ⌁ ⌁ ⌁</div>
            </div>
          </div>
        ) : (
          <>
            <div className="preview-line long" />
            <div className="preview-line medium" />
            <div className="preview-line short" />
            <div className="preview-blocks">
              <span />
              <span />
              <span />
            </div>
          </>
        )}
      </div>

      <div className="preview-glow" />
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = "Dieynaba Samb | Développeuse Full Stack & Data";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            if (entry.target.id) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".reveal, section[id]")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "Accueil", id: "accueil" },
    { label: "À propos", id: "apropos" },
    { label: "Compétences", id: "competences" },
    { label: "Projets", id: "projets" },
    { label: "Parcours", id: "parcours" },
    { label: "Contact", id: "contact" },
  ];

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    setSending(true);
    setFormStatus("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      setFormStatus("Message envoyé avec succès !");
      form.reset();
    } catch (error) {
      console.error("Erreur EmailJS :", error);
      console.error("Statut :", error?.status);
      console.error("Détail :", error?.text);

      setFormStatus(
        `Échec de l'envoi : ${
          error?.text || "Vérifie la configuration EmailJS et réessaie."
        }`
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="navbar">
        <div className="container nav-container">
          <a className="logo" href="#accueil" onClick={closeMenu}>
            DS<span>.</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "×" : "☰"}
          </button>

          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={activeSection === link.id ? "active" : ""}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              className="nav-cta"
              href="#contact"
              onClick={closeMenu}
            >
              Me contacter <span>↗</span>
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-grid" />

          <div className="container hero-container">
            <div className="hero-content">
              <div className="availability">
                <span className="availability-dot" />
                Disponible pour de nouvelles opportunités
              </div>

              <p className="hero-greeting">BONJOUR, JE SUIS</p>

              <h1>
                Dieynaba
                <br />
                <span>Samb.</span>
              </h1>

              <h2 className="hero-role">
                Développeuse <span>Full Stack</span>
                <br />
                & Data Enthusiast.
              </h2>

              <p className="hero-description">
                Je conçois des applications web modernes, des solutions
                numériques utiles et des outils d'analyse qui transforment
                les idées en projets concrets.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#projets">
                  Découvrir mes projets <span>↗</span>
                </a>
                <a className="btn btn-secondary" href="#contact">
                  Discutons ensemble <span>→</span>
                </a>
              </div>

              <div className="hero-socials">
                <a
                  href="https://github.com/Dieynasmb"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <span>↗</span>
                </a>
                <span className="social-separator">/</span>
                <a
                  href="https://www.linkedin.com/in/dieynaba-samb-464023286/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <span>↗</span>
                </a>
                <span className="social-separator">/</span>
                <a href="mailto:dieynabasamb903@gmail.com">
                  Email <span>↗</span>
                </a>
              </div>
            </div>

            <div className="hero-visual reveal">
              <img
  src="/images/DIEY.jpeg"
  alt="Photo de Dieynaba Samb"
  className="profile-photo"
/>
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />

              <div className="hero-card">
                <div className="hero-card-top">
                  <span className="code-label">PROFILE.EXE</span>
                  <span className="window-controls">● ● ●</span>
                </div>

                <div className="code-window">
                  <p><span className="code-purple">const</span> developer = {"{"}</p>
                  <p className="code-indent">
                    name: <span className="code-green">"Dieynaba Samb"</span>,
                  </p>
                  <p className="code-indent">
                    role: <span className="code-green">"Full Stack"</span>,
                  </p>
                  <p className="code-indent">
                    passion: <span className="code-green">"Building"</span>,
                  </p>
                  <p className="code-indent">
                    location: <span className="code-green">"Dakar, SN"</span>
                  </p>
                  <p>{"};"}</p>
                  <p className="code-comment">// Let's build something great.</p>
                  <p className="code-cursor">▌</p>
                </div>

                <div className="hero-card-bottom">
                  <span><span className="status-dot" /> Open to work</span>
                  <span>v.2026</span>
                </div>
              </div>

              <div className="floating-tag tag-react">
                <span className="tag-symbol">⚛</span>
                React.js
              </div>
              <div className="floating-tag tag-python">
                <span className="tag-symbol">Py</span>
                Python
              </div>
              <div className="floating-tag tag-data">
                <span className="tag-symbol">▥</span>
                Data & AI
              </div>

              <div className="hero-index">01 / PORTFOLIO</div>
            </div>
          </div>

          <a className="scroll-indicator" href="#apropos">
            <span className="scroll-line" />
            Faire défiler
          </a>
        </section>

        <section className="stats-strip">
          <div className="container stats-grid">
            <div className="stat-item reveal">
              <strong>Full Stack</strong>
              <span>Développement web</span>
            </div>
            <div className="stat-item reveal">
              <strong>Data</strong>
              <span>Analyse & visualisation</span>
            </div>
            <div className="stat-item reveal">
              <strong>DevOps</strong>
              <span>Automatisation & déploiement</span>
            </div>
            <div className="stat-item reveal">
              <strong>Dakar, SN</strong>
              <span>Basée au Sénégal</span>
            </div>
          </div>
        </section>

        <section className="section about-section" id="apropos">
          <div className="container">
            <SectionTitle
              eyebrow="QUI SUIS-JE ?"
              title="Plus qu'une développeuse,"
              highlight="une créatrice de solutions."
            />

            <div className="about-grid">
              <div className="about-main reveal">
                <p className="about-lead">
                  J'aime transformer les problèmes en expériences numériques
                  simples, efficaces et bien pensées.
                </p>

                <p>
                  Passionnée par le développement informatique, je travaille
                  sur la conception d'applications web, le développement
                  backend et l'exploitation des données. J'accorde autant
                  d'importance à la qualité du code qu'à l'expérience des
                  utilisateurs.
                </p>

                <p>
                  Curieuse et autonome, j'aime apprendre de nouvelles
                  technologies, expérimenter des idées et faire évoluer
                  mes projets de la conception jusqu'au déploiement.
                </p>

                <a
                  className="text-link"
                  href="https://github.com/Dieynasmb"
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir mon GitHub <span>↗</span>
                </a>
              </div>

              <div className="about-side reveal">
                <div className="about-info-card">
                  <span className="info-number">01</span>
                  <div>
                    <h3>Développement</h3>
                    <p>Des applications robustes, maintenables et évolutives.</p>
                  </div>
                  <span className="info-symbol">&lt;/&gt;</span>
                </div>

                <div className="about-info-card">
                  <span className="info-number">02</span>
                  <div>
                    <h3>Analyse de données</h3>
                    <p>Des données transformées en informations exploitables.</p>
                  </div>
                  <span className="info-symbol">⌁</span>
                </div>

                <div className="about-info-card">
                  <span className="info-number">03</span>
                  <div>
                    <h3>Culture DevOps</h3>
                    <p>Automatisation, déploiement et amélioration continue.</p>
                  </div>
                  <span className="info-symbol">∞</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="competences">
          <div className="container">
            <SectionTitle
              eyebrow="MON EXPERTISE"
              title="Des outils pour"
              highlight="concrétiser mes idées."
            />

            <p className="section-description reveal">
              Un ensemble de technologies que j'utilise pour concevoir,
              développer, analyser et déployer des solutions numériques.
            </p>

            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article className="skill-card reveal" key={group.title}>
                  <div className="skill-card-top">
                    <span className="skill-symbol">{group.symbol}</span>
                    <span className="skill-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{group.title}</h3>

                  <div className="skill-tags">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projets">
          <div className="container">
            <div className="projects-heading">
              <SectionTitle
                eyebrow="SÉLECTION DE PROJETS"
                title="Des idées devenues"
                highlight="réalisations."
              />

              <p className="section-description reveal">
                Quelques projets web et data sur lesquels j'ai travaillé.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card reveal" key={project.name}>
                  <ProjectPreview project={project} />

                  <div className="project-details">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span className="project-number">{project.number}</span>
                    </div>

                    <h3>{project.name}</h3>
                    <p>{project.description}</p>

                    <div className="project-technologies">
                      {project.technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Voir le projet <span>↗</span>
                      </a>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Code source <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="projects-footer reveal">
              <p>D'autres projets et expérimentations sont disponibles sur GitHub.</p>
              <a
                className="btn btn-secondary"
                href="https://github.com/Dieynasmb"
                target="_blank"
                rel="noreferrer"
              >
                Explorer GitHub <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section journey-section" id="parcours">
          <div className="container">
            <SectionTitle
              eyebrow="MON PARCOURS"
              title="Apprendre, pratiquer,"
              highlight="progresser."
            />

            <div className="timeline">
              <article className="timeline-item reveal">
                <div className="timeline-marker" />
                <div className="timeline-date">AVRIL — JUIN 2026</div>
                <div className="timeline-content">
                  <span className="timeline-type">EXPÉRIENCE PROFESSIONNELLE</span>
                  <h3>Stage en informatique</h3>
                  <h4>SOLID Afrique · Dakar</h4>
                  <p>
                    Expérience en environnement professionnel et mise en
                    pratique des compétences techniques dans le cadre d'un
                    stage de trois mois.
                  </p>
                </div>
              </article>

              <article className="timeline-item reveal">
                <div className="timeline-marker" />
                <div className="timeline-date">2023 — 2025</div>
                <div className="timeline-content">
                  <span className="timeline-type">FORMATION</span>
                  <h3>Master en Programmation Informatique</h3>
                  <h4>SupInfo · Dakar</h4>
                  <p>
                    Approfondissement des compétences en programmation,
                    développement d'applications et conception logicielle.
                  </p>
                </div>
              </article>

              <article className="timeline-item reveal">
                <div className="timeline-marker" />
                <div className="timeline-date">2020 — 2023</div>
                <div className="timeline-content">
                  <span className="timeline-type">FORMATION</span>
                  <h3>Licence Informatique</h3>
                  <h4>ISI · Dakar</h4>
                  <p>
                    Acquisition des fondamentaux en informatique,
                    programmation, systèmes et réseaux.
                  </p>
                </div>
              </article>

              <article className="timeline-item reveal">
                <div className="timeline-marker" />
                <div className="timeline-date">EN PARALLÈLE</div>
                <div className="timeline-content">
                  <span className="timeline-type">PROJETS PERSONNELS & FREELANCE</span>
                  <h3>Développement de solutions numériques</h3>
                  <h4>Projets web et data</h4>
                  <p>
                    Conception de sites web, d'applications métier et de
                    projets d'analyse de données, de l'idée à la mise en ligne.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container">
            <div className="contact-intro reveal">
              <p className="section-eyebrow">UN PROJET EN TÊTE ?</p>
              <h2>
                Construisons quelque chose
                <br />
                <span>de remarquable.</span>
              </h2>
              <p>
                Tu as un projet, une opportunité ou simplement envie d'échanger ?
                Écris-moi.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-details reveal">
                <a
                  className="contact-detail"
                  href="mailto:dieynabasamb903@gmail.com"
                >
                  <span className="contact-icon">✉</span>
                  <span>
                    <small>EMAIL</small>
                    <strong>dieynabasamb903@gmail.com</strong>
                  </span>
                  <span className="contact-arrow">↗</span>
                </a>

                <a className="contact-detail" href="tel:+221784364007">
                  <span className="contact-icon">☎</span>
                  <span>
                    <small>TÉLÉPHONE</small>
                    <strong>+221 78 436 40 07</strong>
                  </span>
                  <span className="contact-arrow">↗</span>
                </a>

                <div className="contact-detail">
                  <span className="contact-icon">⌖</span>
                  <span>
                    <small>LOCALISATION</small>
                    <strong>Dakar, Sénégal</strong>
                  </span>
                </div>

                <div className="contact-socials">
                  <a
                    href="https://github.com/Dieynasmb"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dieynaba-samb-464023286/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>

              <form className="contact-form reveal" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    Ton nom
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Comment tu t'appelles ?"
                      required
                    />
                  </label>

                  <label>
                    Ton email
                    <input
                      type="email"
                      name="user_email"
                      placeholder="nom@exemple.com"
                      required
                    />
                  </label>
                </div>

                <label>
                  Sujet
                  <input
                    type="text"
                    name="subject"
                    placeholder="Objet de ton message"
                    required
                  />
                </label>

                <label>
                  Ton message
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Parle-moi de ton projet..."
                    required
                  />
                </label>

                <button
                  className="btn btn-primary form-submit"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? "Envoi en cours..." : "Envoyer le message"}
                  {!sending && <span> ↗</span>}
                </button>

                {formStatus && (
                  <p className="form-status" role="status">
                    {formStatus}
                  </p>
                )}

                <p className="form-note">
                  Ton message sera envoyé directement par email.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <a className="logo footer-logo" href="#accueil">
            DS<span>.</span>
          </a>

          <p>Conçu avec passion par Dieynaba Samb.</p>

          <a href="#accueil" className="back-to-top">
            Retour en haut ↑
          </a>

          <span className="footer-year">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}

export default App;
