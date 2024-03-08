import { cn } from "@/lib/utils.ts";
import React from "react";

interface RoundedDivProps {
  className?: string;
}

export const RoundedDiv = (props: React.PropsWithChildren<RoundedDivProps>) => (
  <div
    className={cn(
      "h-screen w-auto flex items-center justify-center rounded-lg",
      props.className
    )}
    // {...props}
  >
    {props.children}
  </div>
);
