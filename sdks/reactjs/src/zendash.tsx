import { useEffect } from "react";

export default function Zendash(): React.ReactNode {
  useEffect(() => {
    const handleCapture = (event: ErrorEvent) => {
      console.log("Error caught");
    };

    window.addEventListener("error", handleCapture);

    return () => window.removeEventListener("error", handleCapture);
  }, []);

  return null;
}
