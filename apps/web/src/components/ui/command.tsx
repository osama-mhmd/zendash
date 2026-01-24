import { HugeiconsIcon } from "@hugeicons/react";
import Input from "./input";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import React, { useEffect } from "react";
import { cn } from "@/utils";

interface CommandProps {
  c: string;
  mutliline?: boolean;
}

interface MutlilineComponentProps {
  value: string;
  className?: string;
  disabled?: boolean;
}

function MutlilineComponent({ value, className }: MutlilineComponentProps) {
  return (
    <div className={cn("border p-2 rounded-md", className)}>
      {value.split("\n").map((s) => (
        <span className="inline-block w-full">{s}</span>
      ))}
    </div>
  );
}

export default function Command({ c, mutliline }: CommandProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 5000);
    }
  }, [copied]);

  const Comp = mutliline ? MutlilineComponent : Input;

  return (
    <div className="relative">
      <Comp className="w-full" value={c} disabled />
      <div
        onClick={() => {
          navigator.clipboard.writeText(c);
          setCopied(true);
        }}
        className="absolute cursor-pointer bg-muted p-1 border rounded top-1.5 right-1"
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
