import { useEffect } from "react";

interface ZendashProps {
  apiKey: string;

  // options: {
  //   apiKey: string;
  //   origin: string;
  // };
}

export default function Zendash({ apiKey }: ZendashProps): React.ReactNode {
  const [origin, _rest] = apiKey.split("?");
  const [projectId, key] = _rest.split("&");

  useEffect(() => {
    const handleCapture = async (event: ErrorEvent) => {
      console.log("Error caught");
      const result = await fetch(
        `${origin}/events/create?projectId=${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: event.message,
            key,
          }),
        },
      );
    };

    window.addEventListener("error", handleCapture);

    return () => window.removeEventListener("error", handleCapture);
  }, []);

  return null;
}
