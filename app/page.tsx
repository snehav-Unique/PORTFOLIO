"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Mail, X } from "lucide-react";
import Stack from "./Stack";

type WorkDetail = { title: string; text: string };
type WorkItem = { title: string; subtitle: string; code: string; tone: string; image?: string; url?: string; details?: WorkDetail[] };

const work: WorkItem[] = [
  {
    title: "SIP", subtitle: "Student Induction Portal", code: "01", tone: "lime",
    details: [
      { title: "Tech Stack", text: "React.js, Vite, Tailwind CSS, shadcn/ui, Firebase, and Leaflet.js." },
      { title: "Student Dashboard", text: "Designed and developed a responsive dashboard displaying induction schedules, announcements, and important updates." },
      { title: "Personalized Venue Allocation", text: "Built an intuitive interface allowing students to easily access their assigned venues and activity schedules." },
      { title: "Interactive Campus Navigation", text: "Integrated campus maps, event information, and organized navigation to help newcomers explore the college effortlessly." },
    ],
  },
  {
    title: "Moss + Algae", subtitle: "Digital Twin", code: "02", tone: "mint", image: "/moss-algae.webp", url: "https://mossalgae.vercel.app/",
    details: [
      { title: "Tech Stack", text: "Next.js, React, Tailwind CSS, Three.js, FastAPI, and Open-Meteo API." },
      { title: "Interactive 3D Digital Twin", text: "Designed an immersive 3D city visualization to explore air pollution and simulate biofilter deployment." },
      { title: "Air Quality Dashboard", text: "Built interactive AQI maps, pollution graphs, real-time data visualizations, and 72-hour forecasting interfaces." },
      { title: "Smart Planning UI", text: "Developed deployment optimization, cost comparison, economic forecasting, and Eco/Boost operating-mode simulation interfaces." },
    ],
  },
  {
    title: "StitchSmart", subtitle: "Creative Technology", code: "03", tone: "lilac",
    details: [
      { title: "Tech Stack", text: "Next.js, React, FastAPI, Python, OpenCV, MediaPipe, and rembg." },
      { title: "Smart Tailoring Platform", text: "Developed a collaborative AI-powered solution to simplify garment customization and tailoring workflows." },
      { title: "Frontend Contribution", text: "Contributed to the web interface and integration of application features, focusing on usability and user interaction." },
      { title: "Computer Vision Integration", text: "Worked on image-processing functionality for garment visualization, background removal, and privacy-conscious processing." },
    ],
  },
];

const cubeFaces = [
  { name: "front", colors: ["#f3ccd5", "#ff603d", "#f3ccd5", "#ff603d", "#f3ccd5", "#ff603d", "#f3ccd5", "#ff603d", "#f3ccd5"] },
  { name: "back", colors: ["#c7d5ff", "#f7f5ee", "#c7d5ff", "#f7f5ee", "#c7d5ff", "#f7f5ee", "#c7d5ff", "#f7f5ee", "#c7d5ff"] },
  { name: "right", colors: ["#f7b8aa", "#9de3cd", "#f7b8aa", "#9de3cd", "#f7b8aa", "#9de3cd", "#f7b8aa", "#9de3cd", "#f7b8aa"] },
  { name: "left", colors: ["#9de3cd", "#f7f5ee", "#9de3cd", "#f7f5ee", "#9de3cd", "#f7f5ee", "#9de3cd", "#f7f5ee", "#9de3cd"] },
  { name: "top", colors: ["#d7ff70", "#c7d5ff", "#d7ff70", "#c7d5ff", "#d7ff70", "#c7d5ff", "#d7ff70", "#c7d5ff", "#d7ff70"] },
  { name: "bottom", colors: ["#f7f5ee", "#ff603d", "#f7f5ee", "#ff603d", "#f7f5ee", "#ff603d", "#f7f5ee", "#ff603d", "#f7f5ee"] },
];

function IntroScreen({ onExitStart, onDone }: { onExitStart: () => void; onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const finishing = useRef(false);

  const finish = () => {
    if (finishing.current) return;
    finishing.current = true;
    setLeaving(true);
    onExitStart();
    window.setTimeout(onDone, 720);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(finish, reducedMotion ? 200 : 2280);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`intro-screen ${leaving ? "is-leaving" : ""}`} role="status" aria-label="Opening Sneha portfolio">
      <div className="cube-scene" aria-hidden="true">
        <div className="rubiks-cube">
          {cubeFaces.map((face) => <div className={`cube-face ${face.name}`} key={face.name}>{face.colors.map((color, index) => <i key={index} style={{ backgroundColor: color }} />)}</div>)}
        </div>
        <span className="cube-shadow" />
      </div>
      <div className="intro-title"><strong aria-label="Sneha">{"SNEHA".split("").map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}</strong><div className="intro-word" aria-label="Portfolio">{"PORTFOLIO".split("").map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}</div></div>
    </div>
  );
}

function WorkCard({ project }: { project: WorkItem }) {
  return (
    <article className={`work-card ${project.tone}`}>
      <div className="work-card-top"><span>{project.code}</span><ArrowUpRight size={30} /></div>
      <div className="work-card-title"><span>{project.title}</span><strong>{project.subtitle}</strong></div>
      <div className={`work-card-window ${project.image ? "has-image" : ""}`}>
        {project.image ? (
          <img src={project.image} alt="Moss + Algae website preview" width="900" height="482" loading="lazy" decoding="async" />
        ) : (
          <><div className="window-bar"><i /><i /><i /></div><div className="window-layout"><span /><div><b /><b /><b /></div></div></>
        )}
      </div>
      <div className="work-card-action" aria-hidden="true"><span>+</span></div>
    </article>
  );
}

function ProjectModal({ index, onClose }: { index: number; onClose: () => void }) {
  const project = work[index];
  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeWithEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeWithEscape); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className={`project-modal ${project.tone}`} role="dialog" aria-modal="true" aria-labelledby="project-title">
        <button className="modal-close" onClick={onClose} aria-label="Close project details"><X size={22} /></button>
        <span className="modal-number">PROJECT {project.code}</span>
        <h2 id="project-title">{project.title}</h2>
        <p>{project.subtitle}</p>
        {project.details ? (
          <ol className="project-details">
            {project.details.map((detail) => <li key={detail.title}><strong>{detail.title}</strong><span>{detail.text}</span></li>)}
          </ol>
        ) : <div className="empty-project-space" aria-label="Project details to be added" />}
        {project.url && <a className="project-live-link" href={project.url} target="_blank" rel="noreferrer">Visit live website <ArrowUpRight size={18} /></a>}
      </article>
    </div>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [landingVisible, setLandingVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const cards = work.map((project) => <WorkCard key={project.title} project={project} />);

  return (
    <main>
      {showIntro && <IntroScreen onExitStart={() => setLandingVisible(true)} onDone={() => setShowIntro(false)} />}
      <div className={`site-shell ${!showIntro ? "is-settled" : landingVisible ? "is-arriving" : "is-waiting"}`}>
      <header className="site-header">
        <a className="brand" href="#home">SNEHA</a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a><a href="#work">Work</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="home-section" id="home">
        <div className="home-copy">
          <span className="section-label">HOME / PORTFOLIO</span>
          <p className="hello">Hello, I am</p>
          <h1>SNEHA</h1>
          <p className="home-intro">Developer, designer and creative thinker based in Bengaluru.</p>
          <a className="home-link" href="#work">View my work <ArrowDown size={18} /></a>
        </div>
        <div className="home-photo-wrap">
          <div className="home-photo"><img src="/sneha.jpg" alt="Portrait of Sneha" width="980" height="1415" /></div>
          <span className="photo-sticker">Developer + Designer</span>
          <span className="photo-mark">*</span>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-intro">
          <span className="section-label">WORK / SELECTED PROJECTS</span>
          <h2>THINGS I HAVE<br /><em>WORKED ON.</em></h2>
        </div>
        <div className="stack-wrap">
          <Stack layout="fan" cards={cards} onCardClick={setSelectedWork} />
        </div>
      </section>

      <section className="contact-section" id="contact">
        <span className="section-label">CONTACT / SAY HELLO</span>
        <h2>LET US MAKE<br /><em>SOMETHING GOOD.</em></h2>
        <p>If something here sparked an idea, I would love to hear from you. A thoughtful conversation can be the beginning of something wonderful.</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/sneha-v-71b127382/" target="_blank" rel="noreferrer">
            <img src="/linkedin.png" alt="LinkedIn" /><span className="social-copy"><b>LinkedIn</b>Connect with me</span><ArrowUpRight size={23} />
          </a>
          <a href="https://github.com/snehav-Unique" target="_blank" rel="noreferrer">
            <img src="/github.png" alt="GitHub" /><span className="social-copy"><b>GitHub</b>See my code</span><ArrowUpRight size={23} />
          </a>
          <a href="mailto:snehav0307@gmail.com">
            <span className="mail-icon" aria-hidden="true"><Mail size={29} /></span><span className="social-copy"><b>Gmail</b>snehav0307@gmail.com</span><ArrowUpRight size={23} />
          </a>
        </div>
        <footer><span>&copy; 2026 Sneha V. All Rights Reserved.</span></footer>
      </section>

      {selectedWork !== null && <ProjectModal index={selectedWork} onClose={() => setSelectedWork(null)} />}
      </div>
    </main>
  );
}
