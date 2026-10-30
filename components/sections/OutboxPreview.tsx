import Link from "next/link";
import { formatDate, getPosts } from "@/lib/outbox";

export function OutboxPreview() {
  const posts = getPosts().slice(0, 5);
  return (
    <section
      id="outbox"
      aria-labelledby="outbox-h"
      className="scroll-mt-16 border-t border-line py-[clamp(64px,9vw,128px)]"
    >
      <div className="wrap">
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-5"
        >
          <div className="min-w-0 flex-[1_1_520px]">
            <p className="mono-label">04 — Outbox</p>
            <h2
              id="outbox-h"
              className="mt-3 text-[clamp(34px,4.6vw,64px)] leading-[1.02] font-medium tracking-[-0.03em]"
            >
              Messages I&apos;m sending out.
            </h2>
            <p className="mt-3.5 max-w-[600px] text-muted">
              Notes on Flutter, NestJS and teaching code. Each post is sent like
              a message, with a subject, an ID and a route.
            </p>
          </div>
          <Link href="/outbox" className="btn btn-outline">
            Open the outbox →
          </Link>
        </div>

        <div
          data-reveal
          className="mt-8 overflow-hidden rounded-md border border-ink"
        >
          <div className="flex flex-wrap justify-between gap-x-5 gap-y-1.5 border-b border-line bg-fill px-4 py-2.5 font-mono text-xs text-muted">
            <span>
              <span className="font-medium text-ink">outbox</span> · latest
              messages
            </span>
            <span>newest first</span>
          </div>
          {posts.map((m) => (
            <Link
              key={m.slug}
              href={`/outbox/${m.slug}`}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line px-4 py-[18px] transition-colors duration-150 ease-out hover:bg-fill"
            >
              <span className="flex-[0_0_44px] font-mono text-xs text-muted">
                {m.id}
              </span>
              <span className="min-w-0 flex-[1_1_320px] text-lg font-medium tracking-[-0.01em]">
                {m.title}
              </span>
              <span className="flex-none font-mono text-xs text-muted">
                {m.route}
              </span>
              <span className="flex-[0_0_110px] text-right font-mono text-xs text-muted">
                {formatDate(m.date)}
              </span>
            </Link>
          ))}
          <Link
            href="/outbox"
            className="flex justify-between px-4 py-3.5 font-mono text-xs text-muted"
          >
            <span>All messages</span>
            <span className="text-ink">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
