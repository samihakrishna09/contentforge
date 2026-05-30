import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import JsonOutput from "../components/shared/JsonOutput";
import useJsonRequest from "../hooks/useJsonRequest";

const fields = [
  { name: "niche", label: "Niche", placeholder: "Fintech content marketing", required: true },
  { name: "audience", label: "Audience", placeholder: "Growth marketers at Series A startups" },
  { name: "channel", label: "Channel", placeholder: "Blog, LinkedIn, YouTube, newsletter" }
];

export default function ContentIdeas() {
  const [values, setValues] = useState({ channel: "blog" });
  const request = useJsonRequest("/api/ideas/generate");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    request.submit(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="Content Ideas" description="Find timely topics with outlines, search intent, and funnel fit." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Find ideas" isLoading={request.isLoading} />
      <JsonOutput data={request.data} error={request.error} isLoading={request.isLoading} />
    </div>
  );
}
