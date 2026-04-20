"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StatTileProps {
  value: ReactNode;
  label: string;
  suffix?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
}

const VALUE_SIZE = {
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

export function StatTile({ value, label, suffix, size = "lg", className }: StatTileProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn(
          "font-bold text-brand-500 leading-none tracking-tight tabular-numbers",
          VALUE_SIZE[size],
        )}
      >
        {value}
        {suffix ? (
          <span className="ml-1 text-neutral-500 font-medium text-[0.55em] tracking-normal">{suffix}</span>
        ) : null}
      </div>
      <div className="mt-2 text-label text-neutral-500 uppercase">{label}</div>
    </div>
  );
}
