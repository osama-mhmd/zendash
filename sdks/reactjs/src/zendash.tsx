import { useEffect } from "react";

interface ZendashProps {
  options: {
    apiKey: string;
    origin: string;
  };
}

export default function Zendash({ options }: ZendashProps): React.ReactNode {
  useEffect(() => {
    const handleCapture = async (event: ErrorEvent) => {
      console.log("Error caught");
      const [url, query] = options.origin.split("?");
      const result = await fetch(`${url}/events/create?${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: event.message,
          key: options.apiKey,
        }),
      });
    };

    window.addEventListener("error", handleCapture);

    return () => window.removeEventListener("error", handleCapture);
  }, []);

  return null;
}
