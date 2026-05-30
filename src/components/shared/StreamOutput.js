import ReactMarkdown from "react-markdown";
import { Clipboard, Loader2 } from "lucide-react";

export default function StreamOutput({ output, error, isLoading, placeholder = "Generated content appears here." }) {
  const copy = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <section className="output-panel">
      <div className="output-header">
        <div>
          <p className="eyebrow">Output</p>
          <h2>Generated Draft</h2>
        </div>
        <button className="icon-button" type="button" onClick={copy} aria-label="Copy output" disabled={!output}>
          <Clipboard size={18} />
        </button>
      </div>

      {error ? <div className="error">{error}</div> : null}
      {isLoading ? (
        <div className="loading">
          <Loader2 size={18} className="spin" />
          Generating...
        </div>
      ) : null}
      <div className="markdown-body">{output ? <ReactMarkdown>{output}</ReactMarkdown> : <p>{placeholder}</p>}</div>
    </section>
  );
}
