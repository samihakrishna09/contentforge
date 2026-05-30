import { useCallback, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default function useStream(endpoint) {
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");

  const start = useCallback(
    async (payload) => {
      setOutput("");
      setError("");
      setIsStreaming(true);

      try {
        const response = await fetch(`${API_URL}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok || !response.body) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Request failed.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          events.forEach((event) => {
            const lines = event.split("\n");
            const eventType = lines.find((line) => line.startsWith("event:"))?.replace("event:", "").trim();
            const dataLine = lines.find((line) => line.startsWith("data:"));
            if (!dataLine) return;
            const data = JSON.parse(dataLine.replace("data:", "").trim());

            if (eventType === "error") {
              setError(data.error || "Streaming failed.");
              return;
            }
            if (data.token) setOutput((current) => current + data.token);
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsStreaming(false);
      }
    },
    [endpoint]
  );

  return { output, isStreaming, error, start, setOutput };
}
