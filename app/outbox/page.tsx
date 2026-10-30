import type { Metadata } from "next";
import Link from "next/link";
import { MiniFooter } from "@/components/Footers";
import { OutboxBrowser } from "@/components/OutboxBrowser";
import { SimpleHeader } from "@/components/SimpleHeader";
import { SubscribeForm } from "@/components/SubscribeForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { formatDate, getPosts } from "@/lib/outbox";
import { EMAIL, rssAlternates } from "@/lib/site";

const description =
  "Things I've learned building Flutter apps and NestJS APIs, and from teaching both. Every post is sent like a message.";

export const metadata: Metadata = {
  title: "Outbox",
  description,
  alternates: { canonical: "/outbox", types: rssAlternates },
  openGraph: { url: "/outbox", title: "Outbox — Sandesh Rimal", description },
};

export default function OutboxPage() {
  const posts = getPosts();
  const items = posts.map((p) => ({
    slug: p.slug,
    id: p.id,
    title: p.title,
    channel: p.channel,
    route: p.route,
    excerpt: p.excerpt,
    meta: `${formatDate(p.date)} · ${p.minutes} min`,
  }));

  return (
    <>
      <SimpleHeader>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-0.5"
        >
          <Link
            href="/#work"
            className="inline-flex min-h-11 items-center px-2.5 text-sm"
          >
            Work
          </Link>
          <Link
            href="/outbox"
            aria-current="page"
            className="inline-flex min-h-11 items-center px-2.5 text-sm underline underline-offset-[6px]"
          >
            Outbox
          </Link>
          <ThemeToggle />
        </nav>
      </SimpleHeader>

      <main id="main">
        <section className="pt-[clamp(32px,5vw,72px)]">
          <div className="wrap">
            <div className="mono-label flex flex-wrap justify-between gap-x-6 gap-y-1.5">
              <span>
                <span lang="ne" className="font-deva">
                  सन्देशहरू
                </span>{" "}
                · plural of{" "}
                <span lang="ne" className="font-deva">
                  सन्देश
                </span>
              </span>
              <span>messages</span>
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-[clamp(16px,3vw,40px)]">
              <h1 className="text-[clamp(72px,13vw,200px)] leading-[0.95] font-semibold tracking-[-0.045em]">
                Outbox
              </h1>
              <p
                lang="ne"
                aria-hidden="true"
                className="font-deva text-[clamp(40px,6vw,92px)] leading-[1.2] font-extrabold text-accent"
              >
                सन्देशहरू
              </p>
            </div>
            <div className="mt-[clamp(20px,3vw,36px)] flex flex-wrap gap-x-[clamp(32px,6vw,96px)] gap-y-7 border-t border-ink pt-6">
              <p className="min-w-0 flex-[1.4_1_440px] text-[clamp(18px,1.6vw,21px)] leading-[1.5]">
                Things I&apos;ve learned building Flutter apps and NestJS APIs,
                and from teaching both. Every post is sent like a message, with
                a subject, an ID and a route.
              </p>
              <SubscribeForm />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="list-h"
          className="pt-[clamp(48px,6vw,80px)] pb-[clamp(64px,8vw,112px)]"
        >
          <div className="wrap">
            <h2 id="list-h" className="sr-only">
              All messages
            </h2>
            <OutboxBrowser
              posts={items}
              note={
                posts.some((p) => p.sample)
                  ? "[Sample post. Replace it with your first real message.]"
                  : undefined
              }
            />
          </div>
        </section>
      </main>

      <MiniFooter
        links={[
          { label: "RSS", href: "/outbox/rss.xml" },
          { label: EMAIL, href: `mailto:${EMAIL}` },
        ]}
      />
    </>
  );
}
