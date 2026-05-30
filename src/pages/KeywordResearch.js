import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import JsonOutput from "../components/shared/JsonOutput";
import useJsonRequest from "../hooks/useJsonRequest";

const fields = [
  { name: "seed", label: "Seed topic", placeholder: "AI blog writing", required: true },
  { name: "audience", label: "Audience", placeholder: "Content teams and SEO managers" }
];

export default function KeywordResearch() {
  const [values, setValues] = useState({});
  const request = useJsonRequest("/api/seo/keywords");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    request.submit(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="Keyword Research" description="Generate primary terms, long-tail queries, clusters, and content angles." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Research keywords" isLoading={request.isLoading} />
      <JsonOutput data={request.data} error={request.error} isLoading={request.isLoading} />
    </div>
  );
}
