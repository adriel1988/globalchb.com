import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  dark = false,
  align = "left",
  id,
  action,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  align?: "left" | "center";
  id?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        <p className={cn("eyebrow flex items-center gap-3", dark ? "text-gold" : "text-gold", align === "center" && "justify-center")}>
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          {kicker}
        </p>
        <h2
          id={id}
          className={cn(
            "font-display mt-4 text-4xl sm:text-5xl lg:text-6xl",
            dark ? "text-white" : "text-navy",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={cn("mt-5 max-w-2xl text-base leading-relaxed sm:text-lg", dark ? "text-slate-300" : "text-slate-600")}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
