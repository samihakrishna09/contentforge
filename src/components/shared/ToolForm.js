import { Wand2 } from "lucide-react";

export default function ToolForm({ title, description, fields, values, onChange, onSubmit, buttonLabel, isLoading }) {
  return (
    <form className="tool-form" onSubmit={onSubmit}>
      <div className="form-intro">
        <p className="eyebrow">Input</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {fields.map((field) => (
        <label key={field.name}>
          <span>{field.label}</span>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={values[field.name] || ""}
              onChange={onChange}
              placeholder={field.placeholder}
              rows={field.rows || 7}
              required={field.required}
            />
          ) : (
            <input
              name={field.name}
              value={values[field.name] || ""}
              onChange={onChange}
              placeholder={field.placeholder}
              required={field.required}
            />
          )}
        </label>
      ))}

      <button className="primary-button" type="submit" disabled={isLoading}>
        <Wand2 size={18} />
        {isLoading ? "Working..." : buttonLabel}
      </button>
    </form>
  );
}
