import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import JsonOutput from "../components/shared/JsonOutput";
import useJsonRequest from "../hooks/useJsonRequest";

const fields = [
  { name: "brand", label: "Brand", placeholder: "ContentForge", required: true },
  { name: "platforms", label: "Platforms", placeholder: "Blog, LinkedIn, X, email" },
  { name: "goals", label: "Goals", placeholder: "Awareness, demo requests, newsletter growth" }
];

export default function ContentCalendar() {
  const [values, setValues] = useState({ platforms: "blog, LinkedIn, X, email" });
  const request = useJsonRequest("/api/calendar/generate");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    request.submit(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="Content Calendar" description="Create a weekly multi-platform plan with repurposing notes and metrics." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Build calendar" isLoading={request.isLoading} />
      <JsonOutput data={request.data} error={request.error} isLoading={request.isLoading} />
    </div>
  );
}
