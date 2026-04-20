"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
  withTagline?: boolean;
}

const DIMENSIONS = {
  sm: { w: 120, h: 36 },
  md: { w: 180, h: 54 },
  lg: { w: 260, h: 78 },
};

export function LogoMark({ size = "md", className, priority = false, withTagline = true }: LogoMarkProps) {
  const { w, h } = DIMENSIONS[size];
  const src = withTagline ? "/Astute_logo_with_tag_line_3.png" : "/images/astute-logo.png";
  return (
    <Image
      src={src}
      alt="Astute"
      width={w}
      height={h}
      priority={priority}
      className={cn("select-none object-contain", className)}
      style={{ width: w, height: "auto" }}
    />
  );
}
