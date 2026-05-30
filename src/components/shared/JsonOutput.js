import { Clipboard } from "lucide-react";

function renderValue(value) {
  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((item, index) => (
          <li key={index}>{typeof item === "object" ? renderValue(item) : String(item)}</li>
        ))}
      </ul>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div className="json-grid">
        {Object.entries(value).map(([key, item]) => (
          <div className="json-row" key={key}>
            <strong>{key}</strong>
            <div>{renderValue(item)}</div>
          </div>
        ))}
      </div>
    );
  }
  return <span>{String(value)}</span>;
}

export default function JsonOutput({ data, error, isLoading, placeholder = "Structured results appear here." }) {
  const copy = async () => {
    if (data) await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  return (
    <section className="output-panel">
      <div className="output-header">
        <div>
          <p className="eyebrow">Output</p>
          <h2>Analysis</h2>
        </div>
        <button className="icon-button" type="button" onClick={copy} aria-label="Copy output" disabled={!data}>
          <Clipboard size={18} />
        </button>
      </div>
      {error ? <div className="error">{error}</div> : null}
      {isLoading ? <div className="loading">Working...</div> : null}
      <div className="structured-output">{data ? renderValue(data) : <p>{placeholder}</p>}</div>
    </section>
  );
}
