import { useState } from "react";
import ToolForm from "../components/shared/ToolForm";
import StreamOutput from "../components/shared/StreamOutput";
import useStream from "../hooks/useStream";

const fields = [
  { name: "product", label: "Product", placeholder: "AI research assistant for consultants", required: true },
  { name: "audience", label: "Audience", placeholder: "Independent strategy consultants" },
  { name: "assetType", label: "Asset type", placeholder: "Landing page, email sequence, ad set, social post" },
  { name: "offer", label: "Offer", placeholder: "Save 6 hours per client research sprint" },
  { name: "tone", label: "Tone", placeholder: "Sharp, credible, direct" }
];

export default function MarketingCopy() {
  const [values, setValues] = useState({ assetType: "landing page copy", tone: "sharp and credible" });
  const stream = useStream("/api/marketing/generate");
  const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault();
    stream.start(values);
  };

  return (
    <div className="workspace-grid">
      <ToolForm title="Marketing Copy" description="Generate conversion copy with hooks, body sections, CTA variants, and notes." fields={fields} values={values} onChange={onChange} onSubmit={onSubmit} buttonLabel="Write copy" isLoading={stream.isStreaming} />
      <StreamOutput output={stream.output} error={stream.error} isLoading={stream.isStreaming} />
    </div>
  );
}
