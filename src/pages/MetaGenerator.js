import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import JsonOutput from "../components/shared/JsonOutput";
import useJsonRequest from "../hooks/useJsonRequest";

const fields = [
  { name: "topic", label: "Page topic", placeholder: "AI-powered content planning software", required: true },
  { name: "keyword", label: "Primary keyword", placeholder: "content generation platform", required: true },
  { name: "brand", label: "Brand", placeholder: "ContentForge" }
];

export default function MetaGenerator() {
  const [values, setValues] = useState({ brand: "ContentForge" });
  const request = useJsonRequest("/api/seo/meta");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    request.submit(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="Meta Generator" description="Generate SEO titles, descriptions, social tags, slugs, and JSON-LD schema." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Generate meta" isLoading={request.isLoading} />
      <JsonOutput data={request.data} error={request.error} isLoading={request.isLoading} />
    </div>
  );
}
