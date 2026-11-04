// import Link from "next/link"; // needed again when the case-study button is restored
import { ext, LINKS } from "@/lib/site";
import { ShowcaseVideo } from "../ShowcaseVideo";

const facts = [
  [
    "Role",
    "Built the Flutter mobile app. On the NestJS backend, defined and refined modules.",
  ],
  [
    "Covers",
    "Shopping, payments, notifications, SKU and inventory, ERP integration.",
  ],
];

// Add a "Role" line to each row once the roles are confirmed.
const more = [
  {
    name: "express-routes-postman",
    desc: "CLI that turns Express routes into a Postman collection.",
    kind: "CLI · npm",
    cta: "npm ↗",
    href: LINKS.routesPostmanNpm,
  },
  {
    name: "Najik Services",
    desc: "Home-service platform connecting Kathmandu households with trusted professionals.",
    kind: "Platform",
    cta: "Visit ↗",
    href: "https://najikservices.com/",
  },
  {
    name: "Liar's Grid",
    desc: "Offline logic puzzle game, 88 levels in five chapters.",
    kind: "Game",
    cta: "Google Play ↗",
    href: LINKS.liarsGridPlay,
  },
];

export function Work() {
  return (
    <>
      <section
        id="work"
        className="scroll-mt-16 border-t border-line pt-[clamp(64px,9vw,128px)]"
      >
        <div className="wrap">
          <div
            data-reveal
            className="mono-label flex flex-wrap justify-between gap-3"
          >
            <span>01 — Work</span>
            <span>Featured · 2026</span>
          </div>
          <div className="mt-7 flex flex-wrap items-start gap-[clamp(32px,5vw,72px)]">
            <div data-reveal className="min-w-0 flex-[1_1_460px]">
              <h2 className="text-[clamp(48px,5.6vw,80px)] leading-[0.98] font-semibold tracking-[-0.04em]">
                Chynabazar
              </h2>
              <p className="mt-6 max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-[1.5]">
                An <span className="whitespace-nowrap">e-commerce</span> platform.
                One NestJS backend serves Flutter apps for shoppers and
                warehouse staff, and a Next.js storefront.
              </p>
              <dl className="mt-7 border-t border-line">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex gap-6 border-b border-line py-3">
                    <dt className="mono-label w-20 flex-none pt-[3px]">{k}</dt>
                    <dd className="min-w-0 flex-1">{v}</dd>
                  </div>
                ))}
                <div className="flex gap-6 border-b border-line py-4">
                  <dt className="mono-label w-20 flex-none pt-3">Outcome</dt>
                  <dd className="min-w-0 flex-1">
                    <span className="mr-2 text-[32px] leading-none font-medium tracking-[-0.02em]">
                      500+
                    </span>
                    downloads on Google Play
                  </dd>
                </div>
              </dl>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {/* Case study is hidden for now.
                <Link href="/work/chynabazar" className="btn btn-solid">
                  Read the case study →
                </Link> */}
                <a
                  href={LINKS.chynabazarPlay}
                  {...ext(LINKS.chynabazarPlay)}
                  className="btn btn-solid"
                >
                  Google Play ↗
                </a>
              </div>
            </div>
            <div data-reveal className="min-w-0 flex-[1.3_1_460px]">
              <ShowcaseVideo />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="more-h"
        className="py-[clamp(64px,9vw,112px)]"
      >
        <div className="wrap">
          <h2 id="more-h" className="mono-label mb-4">
            More work
          </h2>
          <div className="border-t border-ink">
            {more.map((p) => (
              <a
                key={p.name}
                data-reveal
                href={p.href}
                {...ext(p.href)}
                className="group flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-line py-6 transition-colors duration-150 hover:bg-fill md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_150px] md:gap-y-0"
              >
                <span className="min-w-0 flex-[1_1_100%] text-[clamp(24px,2.6vw,32px)] leading-[1.15] font-medium tracking-[-0.02em] transition-transform duration-150 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none md:flex-none">
                  {p.name}
                </span>
                <span className="min-w-0 flex-[1_1_240px] text-muted md:flex-none">
                  {p.desc}
                </span>
                <span className="mono-label flex flex-none justify-between gap-4 md:w-[150px]">
                  <span>{p.kind}</span>
                  <span className="text-ink">{p.cta}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
