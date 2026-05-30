import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  FilePenLine,
  Gauge,
  Hash,
  Lightbulb,
  Megaphone,
  PenLine,
  SearchCheck,
  Sparkles,
  Tags
} from "lucide-react";

export const NAV = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/blog", label: "Blog Generator", icon: FilePenLine },
  { to: "/seo", label: "SEO Analyzer", icon: SearchCheck },
  { to: "/marketing", label: "Marketing Copy", icon: Megaphone },
  { to: "/ideas", label: "Content Ideas", icon: Lightbulb },
  { to: "/keywords", label: "Keyword Research", icon: Hash },
  { to: "/calendar", label: "Content Calendar", icon: CalendarDays },
  { to: "/brand-voice", label: "Brand Voice", icon: Gauge },
  { to: "/rewriter", label: "Content Rewriter", icon: PenLine },
  { to: "/meta", label: "Meta Generator", icon: Tags }
];

export default function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={20} />
          </div>
          <div>
            <strong>ContentForge</strong>
            <span>AI content studio</span>
          </div>
        </div>
        <nav>
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Groq-powered workspace</p>
            <h1>ContentForge</h1>
          </div>
          <a className="status-pill" href="http://localhost:3001/api/health" target="_blank" rel="noreferrer">
            API health
          </a>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
