import { cn } from "@/utils";
import { Slot } from "radix-ui";

interface ButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

export default function Button({
  children,
  className,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"; // Same approach as ShadCN

  return (
    <Comp
      className={cn(
        "cursor-pointer border rounded-sm py-2 px-4 pb-1.5 flex justify-center items-center gap-2",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
