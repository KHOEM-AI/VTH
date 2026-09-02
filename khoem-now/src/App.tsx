import { useState } from "react";
import ZoomTool from "./components/ZoomTool";
import "./App.css";

type Certificate = {
  file: string;
  title: string;
  issued: string;
  track: "Language" | "Practice";
};

const CERTIFICATES: Certificate[] = [
  { file: "intro-to-python.jpg", title: "Introduction to Python", issued: "27 May 2026", track: "Language" },
  { file: "tech-for-everyone.jpg", title: "Tech for Everyone", issued: "12 Aug 2026", track: "Practice" },
  { file: "intro-to-java.jpg", title: "Introduction to Java", issued: "11 Aug 2026", track: "Language" },
  { file: "intro-to-c.jpg", title: "Introduction to C", issued: "13 Aug 2026", track: "Language" },
  { file: "critical-thinking-ai-era.jpg", title: "Critical Thinking — AI Era Practice", issued: "13 Aug 2026", track: "Practice" },
  { file: "python-intermediate.jpg", title: "Python Intermediate", issued: "13 Aug 2026", track: "Language" },
  { file: "java-intermediate.jpg", title: "Java Intermediate", issued: "15 Aug 2026", track: "Language" },
  { file: "c-intermediate.jpg", title: "C Intermediate", issued: "16 Aug 2026", track: "Language" },
  { file: "cpp-intermediate.jpg", title: "C++ Intermediate", issued: "16 Aug 2026", track: "Language" },
  { file: "sql-intermediate.jpg", title: "SQL Intermediate", issued: "16 Aug 2026", track: "Language" },
];

export default function App() {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__mark">VTH</div>
        <h1 className="hero__name">Khoem Soksivutha</h1>
        <p className="hero__tagline">
          learning log — {CERTIFICATES.length} completed courses across Python, Java, C, C++ and SQL
        </p>
      </header>

      <main>
        <ol className="grid">
          {CERTIFICATES.map((cert, i) => (
            <li className="card" key={cert.file}>
              <button className="card__thumb" onClick={() => setActive(cert)} aria-label={`ពង្រីក ${cert.title}`}>
                <span className="card__index">{String(i + 1).padStart(2, "0")}</span>
                <img src={`/certificates/${cert.file}`} alt={cert.title} loading="lazy" />
              </button>
              <div className="card__body">
                <span className="card__track">{cert.track}</span>
                <h2 className="card__title">{cert.title}</h2>
                <span className="card__date">{cert.issued}</span>
              </div>
            </li>
          ))}
        </ol>
      </main>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <img src={`/certificates/${active.file}`} alt={active.title} />
          <p className="lightbox__caption">{active.title}</p>
        </div>
      )}

      <ZoomTool />
    </div>
  );
}
