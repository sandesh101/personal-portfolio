import { Children, type ReactNode } from "react";
import { slugify } from "@/lib/outbox";

const textOf = (node: ReactNode) =>
  Children.toArray(node)
    .map((c) =>
      typeof c === "string" || typeof c === "number" ? String(c) : "",
    )
    .join("");

const LIFECYCLE: [string, string?][] = [
  ["  middleware"],
  ["  guards          ", "who may call this?"],
  ["  interceptors    ", "before"],
  ["  pipes           ", "is the input valid?"],
  ["  controller → service"],
  ["  interceptors    ", "after"],
];

/** The request-lifecycle sketch from the sample post. */
function Lifecycle() {
  return (
    <div
      role="img"
      aria-label="Request lifecycle: middleware, guards, interceptors, pipes, controller, then interceptors on the way out"
      className="mt-6 overflow-x-auto rounded-md border border-line bg-fill p-4 font-mono text-[13px] leading-[1.9] whitespace-pre"
    >
      <span className="text-accent">→ request</span>
      {LIFECYCLE.map(([line, note]) => (
        <span key={line}>
          {"\n"}
          {line}
          {note && <span className="text-muted">{note}</span>}
        </span>
      ))}
      {"\n"}
      <span className="text-ok">← response</span>
    </div>
  );
}

/** One collapsible FAQ item. Native <details>: no JS, and the answer stays in the HTML for search engines. */
function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="group border-b border-line first-of-type:border-t">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
        {q}
        <span
          aria-hidden="true"
          className="font-mono text-lg text-muted transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-4 text-muted">{children}</div>
    </details>
  );
}

export const mdxComponents = {
  // Same slug as lib/outbox getHeadings, so the table of contents links line up.
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugify(textOf(children))}>{children}</h2>
  ),
  Lifecycle,
  Faq,
};
