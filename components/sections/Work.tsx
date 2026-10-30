import Image from "next/image";
// import Link from "next/link"; // needed again when the case-study button is restored
import { ext, LINKS } from "@/lib/site";
import { ScreenSlot } from "../ScreenSlot";

// Consumer: Google Play listing screenshot. Storefront: capture of chynabazar.com at phone width.
// Checkout: second Play listing screenshot. The warehouse app is internal, so it is not shown here.
const screens = [
  {
    label: "Consumer",
    src: "/work/chynabazar-consumer.webp",
    alt: "Chynabazar consumer app, home screen",
  },
  {
    label: "Storefront",
    src: "/work/chynabazar-storefront.webp",
    alt: "Chynabazar web storefront on a phone",
  },
  {
    label: "Checkout",
    src: "/work/chynabazar-checkout.webp",
    alt: "Chynabazar consumer app, checkout screen",
  },
];

const facts = [
  ["Backend", "NestJS, TypeScript"],
  ["Mobile", "Flutter, Bloc"],
  ["Web", "Next.js"],
  ["Modules", "Payments, Inventory, ERP"],
];

const index = [
  {
    no: "02",
    name: "express-routes-postman",
    img: "/work/express-routes-postman.webp",
    desc: "A zero-config CLI that turns Express route files into a Postman v2.1 collection.",
    kind: "CLI · npm",
    cta: "npm ↗",
    href: LINKS.routesPostmanNpm,
  },
  {
    no: "03",
    name: "Najik Services",
    img: "/work/najik.webp",
    desc: "Connects homes, offices and communities in Kathmandu with trusted professionals for repairs, electrical work, carpentry, cleaning and facility maintenance.",
    kind: "Platform",
    cta: "Visit ↗",
    href: "https://najikservices.com/",
  },
  {
    no: "04",
    name: "Liar's Grid",
    img: "/work/liars-grid.webp",
    desc: "An offline logic puzzle game. Read each suspect's statement, work out who is honest and who lies, across 88 levels in five chapters.",
    kind: "Game",
    cta: "Site ↗",
    href: "https://sites.google.com/view/liarsgrid/home",
  },
];

export function Work() {
  return (
    <>
      <section
        id="work"
        className="scroll-mt-16 border-t border-line pt-[clamp(64px,9vw,120px)]"
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
            <div data-reveal className="min-w-0 flex-[1_1_440px]">
              <h2 className="text-[clamp(56px,8.6vw,124px)] leading-[0.95] font-semibold tracking-[-0.04em]">
                Chynabazar
              </h2>
              <p className="mt-6 max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-[1.5]">
                One NestJS backend, three clients. A modular-monolith e-commerce
                platform with Flutter apps for shoppers and warehouse staff, and
                a Next.js storefront. Covers shopping, payments, notifications,
                SKU and inventory management, and ERP integration.
              </p>
              <dl className="mt-7 grid grid-cols-2 gap-x-6 border-t border-line">
                {facts.map(([k, v]) => (
                  <div key={k} className="border-b border-line py-3">
                    <dt className="mono-label !text-[11px]">{k}</dt>
                    <dd className="mt-0.5">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {/* Case study is hidden for now.
                <Link href="/work/chynabazar" className="btn btn-solid">
                  Read the case study →
                </Link> */}
                <a
                  href={LINKS.chynabazarPlay}
                  {...ext(LINKS.chynabazarPlay)}
                  className="btn btn-outline"
                >
                  Google Play ↗
                </a>
              </div>
            </div>
            <div data-reveal className="min-w-0 flex-[1.1_1_440px]">
              <div
                role="group"
                aria-label="Chynabazar consumer app, storefront and checkout screens"
                className="flex aspect-[4/5] items-end justify-center gap-[4%] overflow-hidden rounded-md bg-accent-tint px-[7%] sm:aspect-[5/4]"
              >
                <ScreenSlot
                  {...screens[0]}
                  parallax={9}
                  className="mb-[-8%] aspect-[9/19] w-[40%] sm:w-[27%]"
                />
                <ScreenSlot
                  {...screens[1]}
                  parallax={-7}
                  className="mb-[6%] aspect-[9/19] w-[44%] sm:w-[31%]"
                />
                <ScreenSlot
                  {...screens[2]}
                  parallax={14}
                  className="mb-[-16%] aspect-[9/19] w-[27%] max-sm:hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="index-h" className="py-[clamp(64px,9vw,112px)]">
        <div className="wrap">
          <h2 id="index-h" className="mono-label mb-4">
            Index
          </h2>
          <div className="border-t border-ink">
            {index.map((p) => (
              <a
                key={p.no}
                data-reveal
                href={p.href}
                {...ext(p.href)}
                className="group flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-line py-[26px] transition-colors duration-150 ease-out hover:bg-fill lg:grid lg:grid-cols-[36px_176px_minmax(0,1.3fr)_minmax(0,1fr)_170px] lg:gap-y-0"
              >
                <span className="flex-[0_0_36px] font-mono text-[13px] text-muted">
                  {p.no}
                </span>
                <span className="relative aspect-[2/1] w-44 flex-none overflow-hidden rounded-md bg-accent-tint max-sm:w-full">
                  <Image
                    src={p.img}
                    alt=""
                    fill
                    sizes="176px"
                    className="object-cover object-top motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-105"
                  />
                </span>
                <span className="min-w-0 flex-[1_1_300px] text-[clamp(26px,2.8vw,36px)] leading-[1.15] font-medium tracking-[-0.02em] transition-transform duration-150 ease-out motion-reduce:transition-none group-hover:translate-x-1.5">
                  {p.name}
                </span>
                <span className="min-w-0 flex-[1_1_280px] text-muted">
                  {p.desc}
                </span>
                <span className="mono-label flex w-[170px] flex-none justify-between gap-4">
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
