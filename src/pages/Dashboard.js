import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NAV } from "../components/layout/Layout";

const metrics = [
  ["9", "AI tools"],
  ["3", "Streaming writers"],
  ["6", "Structured analyzers"],
  ["30/min", "Rate limit"]
];

export default function Dashboard() {
  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Production workspace</p>
          <h2>Plan, write, optimize, and repurpose content from one focused console.</h2>
        </div>
        <div className="metric-grid">
          {metrics.map(([value, label]) => (
            <div className="metric" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="tool-grid">
        {NAV.filter((item) => item.to !== "/").map(({ to, label, icon: Icon }, index) => (
          <motion.div key={to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
            <Link className="tool-card" to={to}>
              <Icon size={22} />
              <strong>{label}</strong>
              <span>{descriptions[label]}</span>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

const descriptions = {
  "Blog Generator": "Draft long-form articles, guides, and listicles.",
  "SEO Analyzer": "Score content and find search improvements.",
  "Marketing Copy": "Create campaign copy across channels.",
  "Content Ideas": "Find timely angles and outlines.",
  "Keyword Research": "Cluster keywords, questions, and intent.",
  "Content Calendar": "Plan a weekly publishing rhythm.",
  "Brand Voice": "Extract tone and style from samples.",
  "Content Rewriter": "Improve, simplify, expand, or reshape copy.",
  "Meta Generator": "Generate titles, descriptions, tags, and schema."
};
