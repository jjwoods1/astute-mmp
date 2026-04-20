"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  size?: "default" | "display";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  size = "default",
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <div className="text-label text-brand-500 uppercase mb-4">{eyebrow}</div>
      ) : null}
      <h1
        className={cn(
          "text-neutral-900",
          size === "display" ? "text-display-lg" : "text-h1",
        )}
      >
        {title}
      </h1>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-body-lg text-neutral-600 max-w-2xl",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
