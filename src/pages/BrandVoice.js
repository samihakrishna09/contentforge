import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import JsonOutput from "../components/shared/JsonOutput";
import useJsonRequest from "../hooks/useJsonRequest";

const fields = [
  { name: "samples", label: "Writing samples", type: "textarea", placeholder: "Paste emails, posts, landing page copy, or docs that represent the brand voice.", required: true, rows: 13 }
];

export default function BrandVoice() {
  const [values, setValues] = useState({});
  const request = useJsonRequest("/api/brand/voice");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    request.submit(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="Brand Voice" description="Extract personality, vocabulary, sentence style, and reusable prompt guidance." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Analyze voice" isLoading={request.isLoading} />
      <JsonOutput data={request.data} error={request.error} isLoading={request.isLoading} />
    </div>
  );
}
