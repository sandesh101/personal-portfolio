import type { Metadata } from "next";
import Link from "next/link";
import { MiniFooter } from "@/components/Footers";
import { ScreenSlot } from "@/components/ScreenSlot";
import { outlineLink, SimpleHeader } from "@/components/SimpleHeader";
import { PageAnimations } from "@/components/PageAnimations";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EMAIL, ext, LINKS } from "@/lib/site";

const description =
  "One NestJS backend, three clients, and an ERP behind them. A case study of the Chynabazar e-commerce platform.";

export const metadata: Metadata = {
  title: "Chynabazar case study",
  description,
  alternates: { canonical: "/work/chynabazar" },
  openGraph: {
    url: "/work/chynabazar",
    title: "Chynabazar case study — Sandesh Rimal",
    description,
  },
};

const meta = [
  ["Role", "[Your role]"],
  ["Year", "2026"],
  ["Stack", "NestJS, Next.js, Flutter, Bloc"],
];

const modules = [
  "catalog",
  "orders",
  "payments",
  "inventory · SKU",
  "notifications",
  "erp-sync",
];

const note = "font-mono text-[13px] leading-[1.7] text-muted";

function Chapter({
  n,
  title,
  first,
  last,
  children,
}: {
  n: string;
  title: string;
  first?: boolean;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article
      data-reveal
      className={`flex flex-wrap gap-x-[clamp(32px,6vw,96px)] gap-y-3 py-9 ${
        first ? "border-t border-ink" : "border-t border-line"
      } ${last ? "border-b border-line" : ""}`}
    >
      <h2 className="flex-[0_0_240px] text-[26px] leading-[1.15] font-medium tracking-[-0.02em]">
        <span className="mb-1.5 block font-mono text-xs font-normal tracking-normal text-muted">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </article>
  );
}

function Node({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="rounded-md border border-line p-3">
      <p className="font-semibold">{title}</p>
      <p className="mt-0.5 font-mono text-[11px] text-muted">{sub}</p>
    </div>
  );
}

export default function ChynabazarCaseStudy() {
  return (
    <>
      <SimpleHeader>
        <ThemeToggle />
        <Link href="/#work" className={outlineLink}>
          ← All work
        </Link>
      </SimpleHeader>

      <main id="main">
        <PageAnimations />
        <section className="pt-[clamp(40px,6vw,88px)]">
          <div className="wrap">
            <p className="mono-label">Case study 01 · 2026</p>
            <h1 className="mt-3.5 text-[clamp(64px,12.5vw,200px)] leading-[0.9] font-semibold tracking-[-0.045em]">
              Chynabazar
            </h1>
            <div className="mt-[clamp(28px,4vw,48px)] flex flex-wrap gap-x-[clamp(32px,6vw,96px)] gap-y-7 border-t border-ink pt-6">
              <p className="min-w-0 flex-[2_1_480px] text-[clamp(24px,2.6vw,36px)] leading-[1.15] font-medium tracking-[-0.02em]">
                One NestJS backend, three clients, and an ERP behind them.
              </p>
              <dl className="grid min-w-0 flex-[1_1_300px] grid-cols-2 gap-x-6 gap-y-4">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono-label !text-[11px]">{k}</dt>
                    <dd className="mt-0.5">{v}</dd>
                  </div>
                ))}
                <div>
                  <dt className="mono-label !text-[11px]">Live</dt>
                  <dd className="mt-0.5">
                    <a
                      href={LINKS.chynabazarPlay}
                      {...ext(LINKS.chynabazarPlay)}
                      className="inline-flex min-h-11 items-center underline underline-offset-4"
                    >
                      Google Play ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div
              data-reveal
              role="group"
              aria-label="Chynabazar consumer app, storefront and checkout screens"
              className="mt-[clamp(36px,5vw,64px)] flex aspect-[16/8] min-h-60 items-end justify-center gap-[4%] overflow-hidden rounded-md bg-accent-tint px-[8%] max-sm:aspect-auto max-sm:items-center max-sm:px-5 max-sm:py-8"
            >
              <ScreenSlot
                src="/work/chynabazar-consumer.webp"
                alt="Chynabazar consumer app, home screen"
                label="Consumer"
                parallax={8}
                className="mb-[-4%] aspect-[9/19] w-[17%] max-sm:hidden"
              />
              <ScreenSlot
                src="/work/chynabazar-storefront-wide.webp"
                alt="Chynabazar web storefront on desktop"
                label="Storefront"
                parallax={-6}
                className="mb-[6%] aspect-[16/10] w-[40%] max-sm:mb-0 max-sm:w-full"
              />
              <ScreenSlot
                src="/work/chynabazar-checkout.webp"
                alt="Chynabazar consumer app, checkout screen"
                label="Checkout"
                parallax={12}
                className="mb-[-10%] aspect-[9/19] w-[17%] max-sm:hidden"
              />
            </div>
          </div>
        </section>

        <section className="py-[clamp(56px,8vw,112px)]">
          <div className="wrap">
            <Chapter n="01" title="The problem" first>
              <div className="min-w-0 max-w-[700px] flex-[1_1_460px]">
                <p className="text-lg">
                  Shoppers, warehouse staff and the business&apos;s ERP all
                  needed the same view of products, stock, orders and payments,
                  from different devices and in real time.
                </p>
                <p className={`mt-3 ${note}`}>
                  [Add context: scale, users, what was manual or broken before.]
                </p>
              </div>
            </Chapter>

            <Chapter n="02" title="My part">
              <div className="min-w-0 max-w-[700px] flex-[1_1_460px]">
                <p className={note}>
                  [What you owned: which apps, which NestJS modules, API
                  contracts, release process.]
                </p>
              </div>
            </Chapter>

            <Chapter n="03" title="Architecture">
              <div className="min-w-0 flex-[1_1_460px]">
                <div
                  role="img"
                  aria-label="Three clients call one NestJS modular monolith over HTTPS with SuperTokens sessions; it connects to the database and the ERP"
                  className="flex flex-col rounded-md border border-ink p-[clamp(16px,3vw,28px)]"
                >
                  <div className="grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-3">
                    <Node title="Consumer" sub="Flutter · Bloc" />
                    <Node title="Storefront" sub="Next.js" />
                    <Node title="Warehouse" sub="Flutter" />
                  </div>
                  <p className="my-2 text-center font-mono text-xs text-accent">
                    ↓ HTTPS · SuperTokens ↓
                  </p>
                  <div className="rounded-md border-2 border-ink p-4">
                    <p className="text-lg font-semibold">
                      NestJS modular monolith
                    </p>
                    <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] gap-2">
                      {modules.map((m) => (
                        <span
                          key={m}
                          className="rounded-md bg-fill px-2.5 py-1.5 font-mono text-xs"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="my-2 text-center font-mono text-xs text-muted">
                    ↓
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Node title="Database" sub="[engine]" />
                    <Node title="ERP" sub="integration" />
                  </div>
                </div>
                <p className="mt-2 font-mono text-xs text-muted">
                  [Module names are placeholders. Replace them with the real
                  ones.]
                </p>
              </div>
            </Chapter>

            <Chapter n="04" title="Decisions">
              <div className="flex min-w-0 flex-[1_1_460px] flex-col">
                <div className="border-b border-line pb-5">
                  <p className="text-xl font-medium">
                    Modular monolith, not microservices
                  </p>
                  <p className="mt-1 text-muted">
                    One deployable with clear module boundaries, leaving room to
                    split later.
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-muted">
                    [Why, and what it cost]
                  </p>
                </div>
                <div className="border-b border-line py-5">
                  <p className="text-xl font-medium">
                    Bloc for both Flutter apps
                  </p>
                  <p className="mt-1 text-muted">
                    Predictable state across the consumer and warehouse
                    codebases.
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-muted">
                    [Why, and what you&apos;d change]
                  </p>
                </div>
              </div>
            </Chapter>

            <Chapter n="05" title="When it breaks">
              <div className="min-w-0 max-w-[700px] flex-[1_1_460px]">
                <p className="text-lg">
                  The interesting work is the failure path: a payment that times
                  out mid-order, stock that drifts from the ERP, a warehouse
                  scan with no signal.
                </p>
                <p className={`mt-3 ${note}`}>
                  [Pick one. What happened, how you found it, how you fixed it.]
                </p>
              </div>
            </Chapter>

            <Chapter n="06" title="Outcome">
              <div className="grid min-w-0 flex-[1_1_460px] grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] border-t border-ink">
                <div className="border-b border-line py-[18px] pr-[18px]">
                  <p className="text-[44px] leading-none font-semibold tracking-[-0.03em]">
                    Live
                  </p>
                  <p className="mt-1.5 text-sm text-muted">On Google Play</p>
                </div>
                {[0, 1].map((k) => (
                  <div
                    key={k}
                    className="border-b border-line py-[18px] pr-[18px]"
                  >
                    <p className="text-[44px] leading-none font-semibold text-muted">
                      [—]
                    </p>
                    <p className="mt-1.5 text-sm text-muted">[A real number]</p>
                  </div>
                ))}
              </div>
            </Chapter>

            <Chapter n="07" title="Next time" last>
              <div className="min-w-0 max-w-[700px] flex-[1_1_460px]">
                <p className={note}>
                  [Two honest lessons. Senior engineers read this part first.]
                </p>
              </div>
            </Chapter>
          </div>
        </section>

        <a
          href={LINKS.routesPostmanNpm}
          {...ext(LINKS.routesPostmanNpm)}
          className="on-navy block bg-navy px-[clamp(20px,4vw,48px)] py-[clamp(48px,7vw,96px)] text-navy-fg"
        >
          <span className="mx-auto block max-w-[1280px]">
            <span className="mono-label block !text-inv-muted">Next · 02</span>
            <span className="mt-2 block text-[clamp(36px,6vw,88px)] leading-none font-semibold tracking-[-0.035em]">
              express-routes-postman →
            </span>
          </span>
        </a>
      </main>

      <MiniFooter links={[{ label: EMAIL, href: `mailto:${EMAIL}` }]} />
    </>
  );
}
