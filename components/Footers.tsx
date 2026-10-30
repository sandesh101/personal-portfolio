import Link from "next/link";
import { EMAIL, ext, LINKS, NAV } from "@/lib/site";
import { KtmClock } from "./KtmClock";

const stripLink = "inline-flex min-h-10 items-center";
const strip =
  "mono-label wrap flex flex-wrap items-center justify-between gap-x-7 gap-y-2 !text-[11px]";

export function HomeFooter() {
  return (
    <footer className="border-t border-line pt-[clamp(48px,6vw,80px)] pb-6">
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-x-16 gap-y-10">
          <div className="min-w-0 flex-[1.5_1_300px]">
            <p
              lang="ne"
              className="font-deva m-0 text-[40px] leading-[1.2] font-bold text-accent"
            >
              सन्देश
            </p>
            <p className="mt-1 max-w-[360px] text-muted">
              Mobile apps and the servers behind them, built in Kathmandu.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-[0_1_160px] flex-col">
            <p className="mono-label mb-1 !text-[11px]">Site</p>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={stripLink}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex min-w-0 flex-[0_1_220px] flex-col">
            <p className="mono-label mb-1 !text-[11px]">Elsewhere</p>
            <a href={`mailto:${EMAIL}`} className={stripLink}>
              Email
            </a>
            <a href={LINKS.github} {...ext(LINKS.github)} className={stripLink}>
              GitHub ↗
            </a>
            <a
              href={LINKS.linkedin}
              {...ext(LINKS.linkedin)}
              className={stripLink}
            >
              LinkedIn ↗
            </a>
            <a href={LINKS.resume} {...ext(LINKS.resume)} className={stripLink}>
              Résumé ↗
            </a>
          </div>
        </div>
        <div className="mono-label mt-12 flex flex-wrap items-center justify-between gap-x-7 gap-y-2 border-t border-line pt-4 !text-[11px]">
          <span>© 2026 Sandesh Rimal</span>
          <span>
            KTM <KtmClock /> · UTC+5:45
          </span>
          <a href="#top" className={stripLink}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = { label: string; href: string };

/** One-line footer for the inner pages. */
export function MiniFooter({ links }: { links: FooterLink[] }) {
  return (
    <footer className="border-t border-line py-6">
      <div className={strip}>
        <span>© 2026 Sandesh Rimal</span>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={stripLink}>
            {l.label}
          </Link>
        ))}
        <a href="#top" className={stripLink}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
