"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padded?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, padded = true, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white border border-neutral-200 rounded-lg shadow-sm",
        padded && "p-6 md:p-8",
        interactive && "transition-all duration-300 ease-out-expo hover:shadow-md hover:-translate-y-1 cursor-pointer",
        className,
      )}
      {...rest}
    />
  ),
);
Card.displayName = "Card";
