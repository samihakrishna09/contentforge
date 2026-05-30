import { useCallback, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default function useJsonRequest(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = useCallback(
    async (payload) => {
      setData(null);
      setError("");
      setIsLoading(true);

      try {
        const response = await fetch(`${API_URL}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Request failed.");
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  return { data, error, isLoading, submit };
}
