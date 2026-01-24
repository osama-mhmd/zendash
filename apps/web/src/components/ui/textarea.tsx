import { cn } from "@/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn("border py-2 px-2 rounded-sm", className)}
      {...props}
    />
  );
}
