import Link from "next/link";
import { MiniFooter } from "@/components/Footers";
import { HiddenSnake } from "@/components/HiddenSnake";
import { outlineLink, SimpleHeader } from "@/components/SimpleHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EMAIL } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SimpleHeader>
        <ThemeToggle />
        <Link href="/" className={outlineLink}>
          ← Home
        </Link>
      </SimpleHeader>

      <main id="main" className="py-[clamp(48px,8vw,120px)]">
        <div className="wrap">
          <p className="mono-label">404 — Page not found</p>
          <h1 className="mt-3.5 text-[clamp(44px,7vw,104px)] leading-[0.98] font-semibold tracking-[-0.035em]">
            This page isn&apos;t here.
          </h1>
          <p className="mt-6 max-w-[460px] text-[18px] text-muted">
            It may have moved, or the link may be wrong. Here is the way back.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href="/" className="btn btn-solid">
              Home
            </Link>
            <Link href="/#work" className="btn btn-outline">
              See the work
            </Link>
            <Link href="/#contact" className="btn btn-outline">
              Contact
            </Link>
          </div>
          <p className="mono-label mt-[clamp(48px,8vw,120px)]">
            Psst. Press any key.
          </p>
        </div>
      </main>

      <MiniFooter links={[{ label: EMAIL, href: `mailto:${EMAIL}` }]} />
      <HiddenSnake />
    </>
  );
}
