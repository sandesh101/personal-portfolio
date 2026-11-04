import type { Metadata } from "next";
import Link from "next/link";
import { MiniFooter } from "@/components/Footers";
import { outlineLink, SimpleHeader } from "@/components/SimpleHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EMAIL, ext, LINKS, SERVICES_PATH } from "@/lib/site";

const title = "Mobile app development in Nepal";
const description =
  "Flutter developer and backend engineer in Kathmandu, Nepal. I build Android and iOS apps and the NestJS servers behind them, from first screen to production.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: SERVICES_PATH },
  openGraph: {
    type: "website",
    siteName: "Sandesh Rimal",
    url: SERVICES_PATH,
    title: `${title} — Sandesh Rimal`,
    description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

const offers = [
  {
    title: "Mobile apps",
    body: "Flutter apps for Android and iOS from one codebase, with predictable state (Bloc, Riverpod) and a clean architecture.",
  },
  {
    title: "Backends and APIs",
    body: "NestJS and Node.js APIs with clear modules, validated input, solid authentication and consistent data in PostgreSQL, MongoDB or MySQL.",
  },
  {
    title: "Both halves",
    body: "The app and the server from one person, so nothing gets lost between them.",
  },
];

const steps = [
  "Send me a message describing what the app should do and who it is for.",
  "I reply, usually within a day, with questions.",
  "If it is a good fit, we agree the scope and the next steps.",
];

const faqs = [
  {
    q: "Do you build apps for both Android and iOS?",
    a: "Yes. I build with Flutter, which produces Android and iOS apps from one codebase.",
  },
  {
    q: "Can you build the backend as well as the app?",
    a: "Yes. I build the APIs in NestJS and Node.js, with validated input, authentication and consistent data, so one person covers both halves.",
  },
  {
    q: "How much does a mobile app cost?",
    a: "It depends on the features, the number of screens and integrations such as payments or an ERP. Send me a short description of the app and I will reply with questions and a rough plan.",
  },
  {
    q: "Where are you based?",
    a: "I am based in Kathmandu, Nepal.",
  },
  {
    q: "Are you available for freelance projects?",
    a: "Yes. I am currently available for freelance projects. I am not looking for full-time roles right now.",
  },
  {
    q: "Which technologies do you use?",
    a: "Flutter and Dart for mobile, NestJS, Node.js and TypeScript for the backend, PostgreSQL, MongoDB or MySQL for data, and Firebase for authentication and push notifications.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function MobileAppDevelopmentNepal() {
  return (
    <>
      <SimpleHeader>
        <ThemeToggle />
        <Link href="/" className={outlineLink}>
          ← Home
        </Link>
      </SimpleHeader>

      <main id="main">
        <section className="pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,7vw,96px)]">
          <div className="wrap">
            <p className="mono-label">Services · Kathmandu, Nepal</p>
            <h1 className="mt-3.5 max-w-[16ch] text-[clamp(44px,7vw,104px)] leading-[0.98] font-semibold tracking-[-0.035em]">
              {title}
            </h1>
            <p className="mt-8 max-w-[680px] text-[clamp(18px,1.8vw,22px)] leading-[1.5]">
              I&apos;m Sandesh Rimal, a Flutter developer and backend engineer
              in Kathmandu, Nepal. I build mobile apps for Android and iOS, and
              the servers behind them, from first screen to production.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link href="/#contact" className="btn btn-solid">
                Tell me about your project →
              </Link>
              <Link href="/#work" className="btn btn-outline">
                See the work
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-line py-[clamp(48px,7vw,96px)]">
          <div className="wrap">
            <h2 className="mono-label">What I build</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {offers.map((o) => (
                <div
                  key={o.title}
                  className="rounded-md border border-line p-7"
                >
                  <h3 className="text-[26px] leading-[1.15] font-medium tracking-[-0.02em]">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-[17px]">{o.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-[680px] text-[17px]">
              One example is{" "}
              <a
                href={LINKS.chynabazarPlay}
                {...ext(LINKS.chynabazarPlay)}
                className="underline underline-offset-4"
              >
                Chynabazar
              </a>
              , an e-commerce platform with Flutter apps for shoppers and
              warehouse staff, a Next.js storefront and one NestJS backend. It
              has 500+ downloads on Google Play.
            </p>
          </div>
        </section>

        <section className="border-t border-line py-[clamp(48px,7vw,96px)]">
          <div className="wrap">
            <h2 className="mono-label">How we would start</h2>
            <ol className="mt-6 max-w-[680px] border-t border-ink">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className="flex gap-5 border-b border-line py-5 text-[18px]"
                >
                  <span className="mono-label w-6 flex-none pt-1">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="faq-h"
          className="border-t border-line py-[clamp(48px,7vw,96px)]"
        >
          <div className="wrap">
            <h2
              id="faq-h"
              className="text-[clamp(32px,4vw,56px)] leading-[1.05] font-semibold tracking-[-0.03em]"
            >
              Questions about building an app
            </h2>
            <div className="mt-8 max-w-[760px] border-t border-ink">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-line py-6">
                  <h3 className="text-[22px] leading-[1.25] font-medium tracking-[-0.01em]">
                    {f.q}
                  </h3>
                  <p className="mt-2 text-[17px] text-muted">{f.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/#contact" className="btn btn-solid">
                Tell me about your project →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MiniFooter links={[{ label: EMAIL, href: `mailto:${EMAIL}` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
