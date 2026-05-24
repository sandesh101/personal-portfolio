import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <div className="font-display text-4xl md:text-6xl font-medium tracking-tight">
              Sandesh Rimal
            </div>
            <p className="mt-3 text-muted-foreground text-balance max-w-sm">
              Building meaningful digital experiences.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
            >
              Back to top
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Sandesh Rimal — Designed &amp; built with care.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
