import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import "./App.css";

type Section =
  | "Dashboard" | "Photos" | "Videos" | "Music"
  | "Documents" | "Code" | "Archive" | "Certificates" | "Search";

type VaultFile = { name: string; size: number };
type Manifest = {
  photos?: VaultFile[];
  videos?: VaultFile[];
  audio?: VaultFile[];
  music?: VaultFile[];
  documents?: VaultFile[];
  code?: VaultFile[];
  archive?: VaultFile[];
};

type Certificate = {
  file: string;
  title: string;
  issued: string;
  track: string;
};

const BASE = import.meta.env.BASE_URL;

const FALLBACK_CERTIFICATES: Certificate[] = [
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

const NAV: { name: Section; icon: string; detail: string }[] = [
  { name: "Dashboard", icon: "grid", detail: "Overview" },
  { name: "Photos", icon: "image", detail: "Image collection" },
  { name: "Videos", icon: "video", detail: "Video library" },
  { name: "Music", icon: "music", detail: "Audio collection" },
  { name: "Documents", icon: "file", detail: "Personal documents" },
  { name: "Code", icon: "code", detail: "Code library" },
  { name: "Archive", icon: "archive", detail: "Long-term storage" },
  { name: "Certificates", icon: "award", detail: "Achievements" },
  { name: "Search", icon: "search", detail: "Find your data" },
];

const ICONS: Record<string, ReactNode> = {
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
  video: <><rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></>,
  music: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
  file: <><path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z"/><path d="M13 3v7h7M8 15h8M8 18h6"/></>,
  code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></>,
  archive: <><rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9M10 13h4"/></>,
  award: <><circle cx="12" cy="8" r="6"/><path d="m8.2 13-1 8 4.8-2.5 4.8 2.5-1-8"/></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/>,
  upload: <><path d="M12 16V4m-5 5 5-5 5 5"/><path d="M4 16v4h16v-4"/></>,
  box: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name] || ICONS.box}
    </svg>
  );
}

function formatSize(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 4);
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function assetUrl(category: string, name: string) {
  return `${BASE}${category}/${encodeURIComponent(name)}`;
}

export default function App() {
  const [section, setSection] = useState<Section>("Dashboard");
  const [drawer, setDrawer] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("khoem-vault-theme") as "dark" | "light") || "dark"
  );
  const [manifest, setManifest] = useState<Manifest>({});
  const [certificates, setCertificates] = useState(FALLBACK_CERTIFICATES);
  const [query, setQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("khoem-vault-theme", theme);
  }, [theme]);

  useEffect(() => {
    let alive = true;
    fetch(`${BASE}manifest.json`, { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error("Manifest not found"); return r.json(); })
      .then((data: Manifest) => { if (alive) setManifest(data); })
      .catch(() => { if (alive) setManifest({}); })
      .finally(() => { if (alive) setLoading(false); });

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 5000);
    fetch("https://raw.githubusercontent.com/KHOEM-AI/KI/main/data/certificates.json", { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error("Certificate source unavailable"); return r.json(); })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.certificates;
        if (alive && Array.isArray(list)) {
          const clean = list.filter((c: any) =>
            c && /^[a-z0-9][a-z0-9-]{0,80}\.jpg$/.test(c.file || "")
          ).slice(0, 200);
          if (clean.length) setCertificates(clean);
        }
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timer));

    return () => { alive = false; controller.abort(); window.clearTimeout(timer); };
  }, []);

  const categories = [
    { name: "Photos", key: "photos", icon: "image" },
    { name: "Videos", key: "videos", icon: "video" },
    { name: "Music", key: "audio", icon: "music" },
    { name: "Documents", key: "documents", icon: "file" },
    { name: "Code", key: "code", icon: "code" },
    { name: "Archive", key: "archive", icon: "archive" },
  ];

  const allFiles = categories.flatMap((cat) =>
    ((manifest as any)[cat.key] || []).map((f: VaultFile) => ({ ...f, category: cat.name, key: cat.key }))
  );

  const totals = {
    files: allFiles.length,
    photos: (manifest.photos || []).length,
    videos: (manifest.videos || []).length,
    audio: ((manifest.audio || manifest.music) || []).length,
    certificates: certificates.length,
    bytes: allFiles.reduce((sum, f) => sum + (f.size || 0), 0),
  };

  const filteredFiles = useMemo(() => {
    const list = section === "Search"
      ? allFiles
      : allFiles.filter((f) => f.category === section);
    return list.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
  }, [section, query, manifest]);

  const title = section === "Dashboard" ? "Your Digital Storage" : section;

  function goTo(name: Section) {
    setSection(name);
    setQuery("");
    setDrawer(false);
    setSelectedFile(null);
  }

  function renderFiles() {
    if (loading) return <div className="empty-state">Loading your collection…</div>;
    if (!filteredFiles.length) return (
      <div className="empty-state">
        <div className="empty-icon"><Icon name="box" size={32}/></div>
        <h3>No files found</h3>
        <p>Files listed in your manifest will appear here.</p>
      </div>
    );
    return (
      <div className="file-grid">
        {filteredFiles.map((file, index) => (
          <a className="file-card" key={`${file.category}-${file.name}-${index}`}
            href={assetUrl(file.key, file.name)} target="_blank" rel="noreferrer">
            <div className="file-card__icon"><Icon name={file.key === "photos" ? "image" : file.key === "videos" ? "video" : file.key === "audio" ? "music" : file.key === "code" ? "code" : "file"} size={25}/></div>
            <strong>{file.name}</strong>
            <span>{file.category} · {formatSize(file.size)}</span>
          </a>
        ))}
      </div>
    );
  }

  function renderCertificates() {
    return (
      <div className="certificate-grid">
        {certificates.map((cert, i) => (
          <button className="certificate-card" key={cert.file} onClick={() => setPreviewCert(cert)}>
            <div className="certificate-image">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <img src={assetUrl("certificates", cert.file)} alt={cert.title} loading="lazy"
                onError={(e) => { e.currentTarget.style.opacity = "0"; }} />
            </div>
            <div className="certificate-info">
              <small>{cert.track}</small>
              <strong>{cert.title}</strong>
              <span>{cert.issued}</span>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="vault-app">
      <header className="topbar">
        <button className="icon-button menu-button" onClick={() => setDrawer(true)} aria-label="Open menu">
          <Icon name="menu" size={24}/>
        </button>
        <button className="brand" onClick={() => goTo("Dashboard")}>
          <span className="brand-mark"><Icon name="box" size={23}/></span>
          <span><strong>DATA STORAGE SYSTEM</strong><small>PERSONAL DIGITAL STORAGE</small></span>
        </button>
        <div className="topbar-actions">
          <span className="storage-chip"><span className="status-dot"/> LOCAL LIBRARY</span>
          <button className="theme-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18}/>
            <span>{theme === "dark" ? "Day" : "Night"}</span>
          </button>
        </div>
      </header>

      {drawer && <button className="drawer-scrim" onClick={() => setDrawer(false)} aria-label="Close menu"/>}
      <aside className={`drawer ${drawer ? "drawer--open" : ""}`}>
        <div className="drawer-head">
          <div className="brand-mark"><Icon name="box" size={24}/></div>
          <div><strong>DATA STORAGE SYSTEM</strong><small>SYSTEM NAVIGATION</small></div>
          <button className="icon-button drawer-close" onClick={() => setDrawer(false)} aria-label="Close"><Icon name="close"/></button>
        </div>
        <p className="nav-label">YOUR WORKSPACE</p>
        <nav className="nav-list">
          {NAV.map((item) => (
            <button key={item.name} className={`nav-item ${section === item.name ? "nav-item--active" : ""}`} onClick={() => goTo(item.name)}>
              <Icon name={item.icon}/>
              <span><strong>{item.name}</strong><small>{item.detail}</small></span>
              <Icon name="arrow" size={15}/>
            </button>
          ))}
        </nav>
        <div className="drawer-foot"><span className="status-dot"/> Your personal collection</div>
      </aside>

      <main className="main-content">
        <section className="page-heading">
          <div>
            <span className="eyebrow">DATA STORAGE SYSTEM / {section.toUpperCase()}</span>
            <h1>{title}</h1>
            <p>{section === "Dashboard"
              ? "One private space for the things you want to keep."
              : `Explore and organize your ${section.toLowerCase()} collection.`}</p>
          </div>
          <div className="heading-mark"><Icon name="box" size={32}/></div>
        </section>

        {section === "Dashboard" && (
          <>
            <section className="welcome-panel">
              <div>
                <span className="eyebrow">A PLACE FOR WHAT MATTERS</span>
                <h2>Your data. Your space.</h2>
                <p>Photos, memories, music, documents and everything worth keeping — organized in one place.</p>
                <button className="primary-button" onClick={() => goTo("Search")}>Explore your library <Icon name="arrow" size={17}/></button>
              </div>
              <div className="welcome-art"><Icon name="box" size={76}/><span/><i/></div>
            </section>
            <section className="stats-grid">
              <div className="stat-card"><Icon name="archive"/><span>ALL FILES</span><strong>{totals.files}</strong><small>Items in your library</small></div>
              <div className="stat-card"><Icon name="image"/><span>PHOTOS</span><strong>{totals.photos}</strong><small>Visual memories</small></div>
              <div className="stat-card"><Icon name="video"/><span>VIDEOS</span><strong>{totals.videos}</strong><small>Recorded moments</small></div>
              <div className="stat-card"><Icon name="music"/><span>AUDIO</span><strong>{totals.audio}</strong><small>Music and sound</small></div>
            </section>
            <section className="section-block">
              <div className="section-title"><div><span className="eyebrow">COLLECTIONS</span><h2>Explore your space</h2></div><span className="muted"> {totals.files} files</span></div>
              <div className="collection-grid">
                {categories.map((cat) => (
                  <button className="collection-card" key={cat.name} onClick={() => goTo(cat.name as Section)}>
                    <span className="collection-icon"><Icon name={cat.icon} size={25}/></span>
                    <strong>{cat.name}</strong>
                    <small>{((manifest as any)[cat.key] || []).length} items</small>
                    <Icon name="arrow" size={17}/>
                  </button>
                ))}
                <button className="collection-card" onClick={() => goTo("Certificates")}>
                  <span className="collection-icon gold"><Icon name="award" size={25}/></span>
                  <strong>Certificates</strong><small>{certificates.length} records</small><Icon name="arrow" size={17}/>
                </button>
              </div>
            </section>
            <section className="section-block">
              <div className="section-title"><div><span className="eyebrow">LEARNING RECORD</span><h2>Certificates</h2></div><button className="text-button" onClick={() => goTo("Certificates")}>View all <Icon name="arrow" size={15}/></button></div>
              <div className="certificate-grid certificate-grid--preview">
                {certificates.slice(0, 3).map((cert, i) => (
                  <button className="certificate-card" key={cert.file} onClick={() => setPreviewCert(cert)}>
                    <div className="certificate-image"><span>{String(i + 1).padStart(2, "0")}</span><img src={assetUrl("certificates", cert.file)} alt={cert.title} loading="lazy"/></div>
                    <div className="certificate-info"><small>{cert.track}</small><strong>{cert.title}</strong><span>{cert.issued}</span></div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {section !== "Dashboard" && (
          <section className="section-block content-panel">
            <div className="section-title">
              <div><span className="eyebrow">YOUR COLLECTION</span><h2>{section === "Search" ? "Search all files" : section === "Certificates" ? "Your achievements" : `${section} library`}</h2></div>
              <span className="muted">{section === "Certificates" ? certificates.length : filteredFiles.length} items</span>
            </div>
            {section !== "Certificates" && (
              <div className="search-field"><Icon name="search"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by file name…"/></div>
            )}
            {section === "Certificates" ? renderCertificates() : renderFiles()}
          </section>
        )}

        <footer className="footer"><span>DATA STORAGE SYSTEM</span><span>PERSONAL DIGITAL STORAGE · VTH</span></footer>
      </main>

      {previewCert && (
        <div className="modal-backdrop" onClick={() => setPreviewCert(null)}>
          <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPreviewCert(null)} aria-label="Close"><Icon name="close"/></button>
            <img src={assetUrl("certificates", previewCert.file)} alt={previewCert.title}/>
            <h3>{previewCert.title}</h3><p>{previewCert.track} · {previewCert.issued}</p>
          </div>
        </div>
      )}

      <label className="quick-upload" title="Choose files for local preview">
        <Icon name="upload" size={20}/>
        <input type="file" multiple onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}/>
      </label>
      {selectedFile && (
        <div className="upload-notice">
          <strong>{selectedFile.name}</strong>
          <span>{formatSize(selectedFile.size)} · Selected on this device only</span>
          <button onClick={() => setSelectedFile(null)}>Dismiss</button>
        </div>
      )}
    </div>
  );
}
