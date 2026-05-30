import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import StreamOutput from "../components/shared/StreamOutput";
import useStream from "../hooks/useStream";

const fields = [
  { name: "mode", label: "Rewrite goal", placeholder: "Improve clarity, simplify, expand, make persuasive" },
  { name: "tone", label: "Tone", placeholder: "Professional, warm, technical, playful" },
  { name: "content", label: "Content", type: "textarea", placeholder: "Paste the draft you want rewritten.", required: true, rows: 11 }
];

export default function ContentRewriter() {
  const [values, setValues] = useState({ mode: "improve clarity", tone: "professional" });
  const stream = useStream("/api/content/rewrite");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    stream.start(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="Content Rewriter" description="Reshape existing content for clarity, depth, tone, or conversion." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Rewrite content" isLoading={stream.isStreaming} />
      <StreamOutput output={stream.output} error={stream.error} isLoading={stream.isStreaming} />
    </div>
  );
}
