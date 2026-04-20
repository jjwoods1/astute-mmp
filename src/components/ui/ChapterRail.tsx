"use client";

import { cn } from "@/lib/cn";

export interface ChapterRailItem {
  id: string;
  title: string;
  href?: string;
  onSelect?: () => void;
}

interface ChapterRailProps {
  heading?: string;
  items: ChapterRailItem[];
  activeId: string;
  className?: string;
}

export function ChapterRail({ heading = "Contents", items, activeId, className }: ChapterRailProps) {
  return (
    <nav
      aria-label={heading}
      className={cn(
        "bg-white border-r border-neutral-200 w-[220px] shrink-0 py-7 px-4 flex flex-col",
        className,
      )}
    >
      <div className="text-label text-neutral-400 uppercase px-3 mb-4">{heading}</div>
      <ul className="flex flex-col gap-1">
        {items.map((item, index) => {
          const active = item.id === activeId;
          const num = String(index + 1).padStart(2, "0");
          const contents = (
            <>
              <span className={cn("font-mono text-body-sm", active ? "text-brand-500" : "text-neutral-400")}>
                {num}
              </span>
              <span className="flex-1">{item.title}</span>
              {active ? (
                <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-brand-500 rounded-pill" aria-hidden />
              ) : null}
            </>
          );
          const base = cn(
            "relative flex items-center gap-3 px-3 py-2 rounded-md text-body-sm transition-colors",
            active
              ? "bg-brand-50 text-brand-700 font-medium"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
          );
          return (
            <li key={item.id}>
              {item.href ? (
                <a href={item.href} className={base}>
                  {contents}
                </a>
              ) : (
                <button type="button" onClick={item.onSelect} className={cn(base, "w-full text-left")}>
                  {contents}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
