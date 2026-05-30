import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import JsonOutput from "../components/shared/JsonOutput";
import useJsonRequest from "../hooks/useJsonRequest";

const fields = [
  { name: "keyword", label: "Target keyword", placeholder: "AI content generation platform", required: true },
  { name: "content", label: "Content", type: "textarea", placeholder: "Paste the content to analyze.", required: true, rows: 12 }
];

export default function SeoAnalyzer() {
  const [values, setValues] = useState({});
  const request = useJsonRequest("/api/seo/analyze");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    request.submit(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="SEO Analyzer" description="Score content, surface fixes, and generate meta suggestions." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Analyze SEO" isLoading={request.isLoading} />
      <JsonOutput data={request.data} error={request.error} isLoading={request.isLoading} />
    </div>
  );
}
