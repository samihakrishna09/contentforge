import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import StreamOutput from "../components/shared/StreamOutput";
import useStream from "../hooks/useStream";

const fields = [
  { name: "topic", label: "Topic", placeholder: "AI content workflows for B2B SaaS", required: true },
  { name: "audience", label: "Audience", placeholder: "Marketing managers at growing SaaS teams" },
  { name: "format", label: "Format", placeholder: "How-to article, listicle, comparison guide" },
  { name: "tone", label: "Tone", placeholder: "Practical, confident, editorial" },
  { name: "keywords", label: "SEO keywords", placeholder: "content automation, AI writing tools, editorial workflow" }
];

export default function BlogGenerator() {
  const [values, setValues] = useState({ format: "how-to article", tone: "practical and authoritative" });
  const stream = useStream("/api/blog/generate");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    stream.start(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="Blog Generator" description="Create structured long-form drafts with headings, FAQs, and CTA ideas." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Generate blog" isLoading={stream.isStreaming} />
      <StreamOutput output={stream.output} error={stream.error} isLoading={stream.isStreaming} />
    </div>
  );
}
