import { cn } from "@/utils";

interface InputProps extends React.ComponentProps<"input"> {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn("border p-1 pt-2 px-2 rounded-sm", className)}
      {...props}
    />
  );
}
