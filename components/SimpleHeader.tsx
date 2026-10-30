import { Brand } from "./Brand";

/** Header for the inner pages: brand on the left, whatever the page passes on the right. */
export function SimpleHeader({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* "Back to top" target. It cannot be the sticky header: a stuck header is always at the top already. */}
      <div id="top" />
      <header className="sticky top-0 z-30 border-b border-line bg-bg">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <Brand />
          <div className="flex items-center gap-1">{children}</div>
        </div>
      </header>
    </>
  );
}

export const outlineLink =
  "inline-flex h-10 items-center rounded-md border border-ink px-3.5 text-sm font-medium whitespace-nowrap";
