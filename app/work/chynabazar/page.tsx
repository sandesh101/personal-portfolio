import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrowserFrame, PhoneFrame } from "@/components/DeviceFrames";
import { MiniFooter } from "@/components/Footers";
import { outlineLink, SimpleHeader } from "@/components/SimpleHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { formatDate } from "@/lib/outbox";
import {
  CASE_STUDY_DATE,
  CASE_STUDY_LIVE,
  CASE_STUDY_MODIFIED,
  CASE_STUDY_PATH,
  EMAIL,
  ext,
  LINKS,
  SERVICES_PATH,
  SITE_URL,
} from "@/lib/site";

const title = "Chynabazar: Flutter and NestJS e-commerce case study";
const description =
  "How I led the Flutter mobile app and built NestJS backend modules for Chynabazar, an e-commerce platform with 500+ downloads on Google Play.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: CASE_STUDY_PATH },
  // Stays out of search until the case study is published.
  robots: CASE_STUDY_LIVE ? undefined : { index: false },
  openGraph: {
    type: "article",
    siteName: "Sandesh Rimal",
    url: CASE_STUDY_PATH,
    title,
    description,
    publishedTime: CASE_STUDY_DATE,
    modifiedTime: CASE_STUDY_MODIFIED,
    authors: ["Sandesh Rimal"],
  },
  twitter: { card: "summary_large_image", title, description },
};

const meta = [
  ["Role", "Led and built the Flutter mobile app; built NestJS backend modules"],
  ["Team", "A small team"],
  ["Author", "Sandesh Rimal, Flutter developer and backend engineer in Kathmandu, Nepal"],
  ["Timeline", "Delivered in about 5–6 months"],
  ["Stack", "Flutter, Bloc, NestJS, TypeScript, Next.js"],
  ["Outcome", "500+ downloads on Google Play"],
];

const modules = [
  {
    name: "Promotions",
    text: "Lets the team create discounts with rules, and keeps track of which promotions have been used and which are still available.",
  },
  {
    name: "B2B and Retail Store",
    text: "Supports business customers and a retail store channel alongside regular online shopping.",
  },
  {
    name: "Quarantine management",
    text: "Holds stock aside, such as returned items, so it is not sold again until it has been reviewed.",
  },
  {
    name: "CMS",
    text: "Lets the team control the layout of the homepage, including re-ordering its sections. I refined this module.",
  },
  {
    name: "Activity logs",
    text: "Keeps a record of actions taken in the system, so changes can be traced.",
  },
  {
    name: "Email and SMS services",
    text: "Sends emails and text messages to customers.",
  },
  {
    name: "Notifications",
    text: "Sends push notifications to shoppers' phones.",
  },
];

// `did` is what I did about it. It must be filled in before the case study can go live.
const challenges: { title: string; hard: string; did: string }[] = [
  {
    title: "Order items that are locked, returned or in quarantine",
    hard: "Stock has to stay correct while items move between states: an item can be locked for an order, returned, or set aside in quarantine. Each state changes what can be sold and what can be moved, which made the rules harder than a simple stock count.",
    did: "I kept separate stock counts for each state, so only available stock can be sold, and I recorded every move between states in the activity logs so it can be traced.",
  },
  {
    title: "Re-ordering the homepage layout dynamically",
    hard: "The homepage is built from sections the team can re-order, so its layout is not fixed in code and has to follow whatever order the team sets.",
    did: "I stored the order of the homepage sections as data and gave each section a type. The homepage is rendered from that saved list, so re-ordering it is a data change, not a code change.",
  },
  {
    title: "Tracking promotions and their rules",
    hard: "Every promotion has rules, and each one has to be tracked as used or unused. Getting the rules right and keeping the counts honest takes care.",
    did: "I stored each promotion's rules as structured data, counted every use, and checked the rules again when the order is placed.",
  },
  {
    title: "Payment failures and timeouts",
    hard: "A payment can fail or time out in the middle of an order, and the shopper still needs a clear result and a correct order state.",
    did: "I verified the real payment result with the provider instead of trusting a timeout, and showed the shopper a clear result.",
  },
];

/** Public address of the web storefront, or null to leave it unlinked. */
const STOREFRONT: string | null = null;

const lessons = [
  "Design the inventory states earlier. Settling the rules for locked, returned and quarantined items at the start would have been easier than adding them as the project grew.",
  "Write tests for promotion rules sooner. Promotion rules have many edge cases, and automated tests from the start would catch more of them.",
];

const faqs = [
  {
    q: "What is Chynabazar?",
    a: "Chynabazar is an online store for home, kitchen, electronics and lifestyle products. A Flutter shopper app and a Next.js storefront are both served by one NestJS backend.",
  },
  {
    q: "What was your role on Chynabazar?",
    a: "I led the Flutter mobile app, which I built on my own, and I built NestJS backend modules for promotions, B2B and retail store, quarantine management, the CMS, activity logs, email and SMS services, and notifications.",
  },
  {
    q: "How long did the project take?",
    a: "The team delivered the project in about 5 to 6 months.",
  },
  {
    q: "Which technologies were used?",
    a: "Flutter with Bloc for the mobile app, NestJS and TypeScript for the backend, and Next.js for the web storefront.",
  },
  {
    q: "Where can I see the app?",
    a: "The mobile app is on Google Play, with 500+ downloads.",
  },
];

const toc = [
  ["overview", "Overview"],
  ["role", "My role"],
  ["modules", "Modules"],
  ["challenges", "Challenges"],
  ["screens", "Screens"],
  ["outcome", "Outcome"],
  ["lessons", "Lessons"],
  ["faq", "FAQ"],
];

// A published case study may not contain empty slots.
if (CASE_STUDY_LIVE && (challenges.some((c) => !c.did) || lessons.length === 0)) {
  throw new Error(
    "Chynabazar case study: fill in every challenge's `did` and add lessons before setting CASE_STUDY_LIVE.",
  );
}

const url = `${SITE_URL}${CASE_STUDY_PATH}`;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: title,
      description,
      image: `${url}/opengraph-image.png`,
      datePublished: CASE_STUDY_DATE,
      dateModified: CASE_STUDY_MODIFIED,
      mainEntityOfPage: url,
      author: { "@id": `${SITE_URL}/#person` },
      about: {
        "@type": "MobileApplication",
        name: "Chynabazar",
        applicationCategory: "ShoppingApplication",
        operatingSystem: "Android",
        url: LINKS.chynabazarPlay,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
        { "@type": "ListItem", position: 3, name: "Chynabazar", item: url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const h2 =
  "scroll-mt-32 text-[clamp(28px,3.2vw,44px)] leading-[1.08] font-semibold tracking-[-0.03em]";
const eyebrow = "mono-label";
const section = "py-[clamp(56px,7vw,96px)]";

const stats = [
  ["500+", "downloads on Google Play"],
  ["5–6 mo", "to deliver the platform"],
  ["1", "backend for the app and storefront"],
  [String(modules.length), "backend modules I built"],
];

const clients = [
  ["Shopper app", "Flutter · Bloc"],
  ["Web storefront", "Next.js"],
];
const platform = ["Shopping", "Payments", "SKU and inventory", "ERP integration"];

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
        <article>
          {/* Hero */}
          <header className="pt-[clamp(20px,2.4vw,32px)] pb-[clamp(28px,3.4vw,48px)]">
            <div className="wrap">
              {!CASE_STUDY_LIVE && (
                <aside className="mb-8 rounded-md border border-ink p-5 text-[15px]" aria-label="Draft notes">
                  <p className="mono-label">Draft · not published</p>
                  <ul className="mt-2 list-disc pl-5">
                    <li>Add the storefront address in STOREFRONT below, if you want it linked.</li>
                    <li>Read the page through once more.</li>
                    <li>To publish, set CASE_STUDY_LIVE to true in lib/site.ts.</li>
                  </ul>
                </aside>
              )}

              <nav aria-label="Breadcrumb">
                <ol className="mono-label flex flex-wrap gap-x-2">
                  <li>
                    <Link href="/" className="underline underline-offset-4">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/#work" className="underline underline-offset-4">Work</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Chynabazar</li>
                </ol>
              </nav>

              <div className="mt-6 grid items-center gap-x-[clamp(32px,5vw,72px)] gap-y-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                <div>
                  <p className={eyebrow}>
                    Case study · By{" "}
                    <Link href="/#about" className="underline underline-offset-4">
                      Sandesh Rimal
                    </Link>{" "}
                    · <time dateTime={CASE_STUDY_DATE}>{formatDate(CASE_STUDY_DATE)}</time>
                  </p>
                  <h1 className="mt-3 text-[clamp(34px,3.8vw,54px)] leading-[1.04] font-semibold tracking-[-0.035em]">
                    Chynabazar: a Flutter and NestJS{" "}
                    <span className="whitespace-nowrap">e-commerce</span> platform
                  </h1>

                  <p className="mt-5 max-w-[620px] text-[clamp(17px,1.4vw,19px)] leading-[1.5]">
                    An online store with one NestJS backend behind a Flutter app for shoppers and a
                    Next.js storefront. I led the Flutter mobile app, which I built on my own, and I
                    built several of the backend modules.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <a href={LINKS.chynabazarPlay} {...ext(LINKS.chynabazarPlay)} className="btn btn-solid">
                      Google Play ↗
                    </a>
                    {STOREFRONT && (
                      <a href={STOREFRONT} {...ext(STOREFRONT)} className="btn btn-outline">
                        Visit the storefront ↗
                      </a>
                    )}
                  </div>
                </div>

                <figure className="max-sm:hidden">
                  <div className="relative rounded-md bg-accent-tint px-[clamp(12px,1.8vw,22px)] pt-[clamp(12px,1.8vw,22px)] pb-[clamp(28px,3.4vw,44px)]">
                    <BrowserFrame label="Chynabazar web storefront">
                      <Image
                        src="/work/chynabazar-storefront-wide.webp"
                        alt="Chynabazar web storefront on desktop, showing the search bar, category menu and promotional banner"
                        width={800}
                        height={500}
                        priority
                        sizes="(min-width: 1024px) 480px, 100vw"
                        className="block h-auto w-full"
                      />
                    </BrowserFrame>
                    <PhoneFrame
                      src="/work/chynabazar-consumer.webp"
                      alt="Chynabazar shopper app home screen on a phone"
                      sizes="160px"
                      priority
                      className="absolute -bottom-2 right-5 w-[25%] max-w-[150px] sm:right-8 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-2"
                    />
                  </div>
                  <figcaption className="mono-label mt-4">The Chynabazar web storefront and shopper app</figcaption>
                </figure>
              </div>
            </div>
          </header>

          {/* Key facts */}
          <section aria-label="Key facts" className="border-y border-line">
            <div className="wrap">
              <dl className="grid grid-cols-2 lg:grid-cols-4">
                {stats.map(([n, label], i) => (
                  <div
                    key={label}
                    className={`py-5 pr-4 ${i % 2 ? "pl-4 max-lg:border-l max-lg:border-line" : ""} ${
                      i > 1 ? "max-lg:border-t max-lg:border-line" : ""
                    } ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""}`}
                  >
                    <dt className="text-[clamp(32px,3.6vw,52px)] leading-none font-semibold tracking-[-0.03em]">
                      {n}
                    </dt>
                    <dd className="mt-1.5 text-[14px] text-muted">{label}</dd>
                  </div>
                ))}
              </dl>
              <dl className="grid border-t border-line py-5 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
                {meta
                  .filter(([k]) => ["Role", "Team", "Stack", "Author"].includes(k))
                  .map(([k, v]) => (
                    <div key={k} className="py-2">
                      <dt className="mono-label">{k}</dt>
                      <dd className="mt-1 text-[15px]">{v}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </section>

          {/* Jump links */}
          <nav aria-label="On this page" className="sticky top-16 z-20 border-b border-line bg-bg">
            <div className="wrap flex gap-1 overflow-x-auto">
              {toc.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="inline-flex min-h-11 items-center px-3 text-sm whitespace-nowrap first:pl-0"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          {/* 01 Overview and architecture */}
          <section aria-labelledby="overview" className={section}>
            <div className="wrap grid items-start gap-x-[clamp(32px,6vw,96px)] gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div>
                <p className={eyebrow}>01 — Overview</p>
                <h2 id="overview" className={`${h2} mt-3`}>What Chynabazar is</h2>
                <p className="mt-5 text-[18px] leading-[1.65]">
                  Chynabazar is an online store for home, kitchen, electronics and lifestyle products.
                  One NestJS backend serves a Flutter app for shoppers and a Next.js storefront.
                </p>
                <p className="mt-4 text-[18px] leading-[1.65]">
                  The platform covers shopping, payments, notifications, SKU and inventory
                  management, and integration with the business&apos;s ERP system.
                </p>
              </div>

              <figure
                aria-label="Diagram: the shopper app and the web storefront both use one NestJS backend"
                className="rounded-md border border-ink p-[clamp(16px,3vw,28px)]"
              >
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {clients.map(([n, t]) => (
                    <div key={n} className="rounded-md border border-line p-3">
                      <p className="font-semibold">{n}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted">{t}</p>
                    </div>
                  ))}
                </div>
                <p className="my-3 text-center font-mono text-xs text-accent" aria-hidden="true">
                  ↓ one API ↓
                </p>
                <div className="rounded-md border-2 border-ink p-4">
                  <p className="text-lg font-semibold">NestJS backend</p>
                  <p className="mt-3 font-mono text-xs text-muted">The platform</p>
                  <ul className="mt-1.5 flex flex-wrap gap-2">
                    {platform.map((m) => (
                      <li key={m} className="rounded-md bg-fill px-2.5 py-1.5 text-[13px]">{m}</li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-xs text-muted">Modules I built</p>
                  <ul className="mt-1.5 flex flex-wrap gap-2">
                    {modules.map((m) => (
                      <li key={m.name} className="rounded-md bg-accent-tint px-2.5 py-1.5 text-[13px]">
                        {m.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </figure>
            </div>
          </section>

          {/* 02 My role */}
          <section aria-labelledby="role" className={`${section} bg-fill`}>
            <div className="wrap">
              <p className={eyebrow}>02 — My role</p>
              <h2 id="role" className={`${h2} mt-3`}>Two parts, one small team</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-line bg-bg p-7">
                  <p className="mono-label">Mobile</p>
                  <h3 className="mt-2 text-[26px] leading-[1.15] font-medium tracking-[-0.02em]">
                    The Flutter mobile app
                  </h3>
                  <p className="mt-3 text-[17px] text-muted">
                    I led the Flutter mobile app and built it on my own, using Bloc for state.
                  </p>
                </div>
                <div className="rounded-md border border-line bg-bg p-7">
                  <p className="mono-label">Backend</p>
                  <h3 className="mt-2 text-[26px] leading-[1.15] font-medium tracking-[-0.02em]">
                    NestJS backend modules
                  </h3>
                  <p className="mt-3 text-[17px] text-muted">
                    I built {modules.length} of the backend modules, listed below. The team delivered
                    the project in about 5 to 6 months.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 03 Modules */}
          <section aria-labelledby="modules" className={section}>
            <div className="wrap">
              <p className={eyebrow}>03 — Modules</p>
              <h2 id="modules" className={`${h2} mt-3`}>Backend modules I built</h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {modules.map((m, i) => (
                  <li
                    key={m.name}
                    className={`rounded-md border border-line p-6 ${
                      i === modules.length - 1 && modules.length % 2 ? "md:col-span-2" : ""
                    }`}
                  >
                    <p className="mono-label">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-[22px] leading-[1.2] font-medium tracking-[-0.01em]">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-[16px] text-muted">{m.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 04 Challenges */}
          <section aria-labelledby="challenges" className={`${section} border-t border-line`}>
            <div className="wrap">
              <p className={eyebrow}>04 — Challenges</p>
              <h2 id="challenges" className={`${h2} mt-3`}>Engineering challenges</h2>
              <div className="mt-8 border-t border-ink">
                {challenges.map((c, i) => (
                  <div
                    key={c.title}
                    className="grid gap-x-12 gap-y-4 border-b border-line py-8 lg:grid-cols-2"
                  >
                    <div>
                      <p className="mono-label">{String(i + 1).padStart(2, "0")} · The challenge</p>
                      <h3 className="mt-2 text-[clamp(22px,2vw,26px)] leading-[1.2] font-medium tracking-[-0.015em]">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-[16px] text-muted">{c.hard}</p>
                    </div>
                    <div className="rounded-md bg-accent-tint p-6">
                      <p className="mono-label">What I did</p>
                      {c.did ? (
                        <p className="mt-2 text-[17px]">{c.did}</p>
                      ) : (
                        !CASE_STUDY_LIVE && <p className="mono-label mt-2">[Add: what you did about it]</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05 Screens */}
          <section aria-labelledby="screens" className={`${section} bg-fill`}>
            <div className="wrap">
              <p className={eyebrow}>05 — Screens</p>
              <h2 id="screens" className={`${h2} mt-3`}>The shopper experience</h2>
              <div className="mt-8 rounded-md bg-accent-tint px-[clamp(16px,4vw,56px)] pt-[clamp(28px,5vw,64px)] pb-[clamp(28px,4vw,48px)]">
                <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
                  {[
                    ["/work/chynabazar-consumer.webp", "Chynabazar shopper app home screen on a phone", "Shopper app: home", ""],
                    ["/work/chynabazar-checkout.webp", "Chynabazar shopper app checkout screen on a phone", "Shopper app: checkout", "sm:mt-12"],
                    ["/work/chynabazar-storefront.webp", "Chynabazar web storefront shown on a phone, with a banner, categories and product list", "Web storefront on mobile", ""],
                  ].map(([src, alt, cap, offset]) => (
                    <figure key={src} className={`mx-auto w-full max-w-[260px] ${offset}`}>
                      <PhoneFrame
                        src={src}
                        alt={alt}
                        sizes="260px"
                        className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-2"
                      />
                      <figcaption className="mono-label mt-4 text-center">{cap}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 06 Outcome */}
          <section aria-labelledby="outcome" className="on-navy bg-navy py-[clamp(56px,7vw,96px)] text-navy-fg">
            <div className="wrap flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
              <div>
                <p className="mono-label !text-inv-muted">06 — Outcome</p>
                <h2 id="outcome" className="sr-only">Outcome: 500+ downloads on Google Play</h2>
                <p className="mt-3 text-[clamp(72px,11vw,160px)] leading-none font-semibold tracking-[-0.04em]">
                  500+
                </p>
                <p className="mt-3 text-[clamp(18px,2vw,24px)]">
                  downloads on Google Play, and still going
                </p>
              </div>
              <div className="max-w-[420px]">
                <p className="text-[17px] text-inv-muted">
                  The team delivered the whole platform in about 5 to 6 months.
                </p>
                <a
                  href={LINKS.chynabazarPlay}
                  {...ext(LINKS.chynabazarPlay)}
                  className="btn mt-5 bg-navy-fg text-navy"
                >
                  Google Play ↗
                </a>
              </div>
            </div>
          </section>

          {/* 07 Lessons */}
          {lessons.length > 0 && (
            <section aria-labelledby="lessons" className={section}>
              <div className="wrap">
                <p className={eyebrow}>07 — Lessons</p>
                <h2 id="lessons" className={`${h2} mt-3`}>What I would do differently</h2>
                <ol className="mt-8 grid gap-4 md:grid-cols-2">
                  {lessons.map((l, i) => (
                    <li key={l} className="rounded-md border border-line p-6">
                      <p className="mono-label">{String(i + 1).padStart(2, "0")}</p>
                      <p className="mt-2 text-[17px]">{l}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {/* 08 FAQ */}
          <section aria-labelledby="faq" className={`${section} border-t border-line`}>
            <div className="wrap">
              <p className={eyebrow}>08 — FAQ</p>
              <h2 id="faq" className={`${h2} mt-3`}>Questions about this project</h2>
              <div className="mt-8 grid gap-x-16 md:grid-cols-2">
                {faqs.map((f) => (
                  <div key={f.q} className="border-t border-line py-6">
                    <h3 className="text-[20px] leading-[1.25] font-medium">{f.q}</h3>
                    <p className="mt-2 text-[16px] text-muted">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Next step */}
          <section className="pb-[clamp(56px,7vw,96px)]">
            <div className="wrap">
              <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-md border border-ink p-[clamp(24px,4vw,48px)]">
                <div className="max-w-[560px]">
                  <h2 className="text-[clamp(26px,3vw,38px)] leading-[1.1] font-semibold tracking-[-0.025em]">
                    Need an app and the server behind it?
                  </h2>
                  <p className="mt-3 text-[17px] text-muted">
                    I build Flutter apps and NestJS backends from first screen to production. Read more
                    about{" "}
                    <Link href={SERVICES_PATH} className="underline underline-offset-4">
                      mobile app development in Nepal
                    </Link>
                    .
                  </p>
                </div>
                <Link href="/#contact" className="btn btn-solid">
                  Tell me about your project →
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>

      <MiniFooter links={[{ label: EMAIL, href: `mailto:${EMAIL}` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
