import { HugeiconsIcon } from "@hugeicons/react";
import Input from "./input";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import React, { useEffect } from "react";

export default function Command({ c }: { c: string }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 5000);
    }
  }, [copied]);

  return (
    <div className="relative">
      <Input className="w-full text-muted-foreground" value={c} disabled />
      <div
        onClick={() => {
          navigator.clipboard.writeText(c);
          setCopied(true);
        }}
        className="absolute cursor-pointer bg-muted p-1 border rounded top-1/2 -translate-y-1/2 right-1"
      >
        {copied ? (
          <HugeiconsIcon icon={Tick02Icon} size={20} />
        ) : (
          <HugeiconsIcon icon={Copy01Icon} size={20} />
        )}
      </div>
    </div>
  );
}
