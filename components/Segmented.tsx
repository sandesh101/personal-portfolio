"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/** Segmented control. The filled segment slides between options. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  stackOnMobile = false,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  /** Gives the control a group role. Leave out inside a <fieldset>. */
  label?: string;
  /** Stack the options vertically on phones. Use when the labels are too long to sit side by side. */
  stackOnMobile?: boolean;
}) {
  const id = useId();
  return (
    <div
      role={label ? "group" : undefined}
      aria-label={label}
      className={`flex w-full overflow-hidden rounded-md border border-ink sm:w-max ${
        stackOnMobile ? "flex-col sm:flex-row" : "max-sm:overflow-x-auto"
      }`}
    >
      {options.map((o, i) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o)}
            className={`relative min-h-11 shrink-0 cursor-pointer border-0 bg-transparent px-3.5 text-sm font-medium transition-colors duration-200 ${
              stackOnMobile ? "max-sm:text-left" : ""
            } ${
              i > 0
                ? stackOnMobile
                  ? "border-t border-t-ink sm:border-t-0 sm:border-l sm:border-l-ink"
                  : "border-l border-l-ink"
                : ""
            } ${on ? "text-bg" : "text-ink"}`}
          >
            {on && (
              <motion.span
                layoutId={id}
                className="absolute inset-0 bg-ink"
                transition={{ type: "spring", stiffness: 500, damping: 42 }}
              />
            )}
            <span className="relative">{o}</span>
          </button>
        );
      })}
    </div>
  );
}
