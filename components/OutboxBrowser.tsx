"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Segmented } from "./Segmented";
import { CHANNELS, type Channel } from "@/lib/channels";

export type OutboxItem = {
  slug: string;
  id: string;
  title: string;
  channel: Channel;
  route: string;
  excerpt: string;
  meta: string;
};

const FILTERS = ["All", ...CHANNELS] as const;

export function OutboxBrowser({
  posts,
  note,
}: {
  posts: OutboxItem[];
  note?: string;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = posts.filter((p) => filter === "All" || p.channel === filter);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <Segmented
          options={FILTERS}
          value={filter}
          onChange={setFilter}
          label="Filter by channel"
        />
        <p className="font-mono text-xs text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "message" : "messages"} · newest
          first
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-ink">
        <div
          aria-hidden="true"
          className="mono-label flex gap-5 border-b border-line bg-fill px-5 py-2.5 !text-[11px]"
        >
          <span className="flex-[0_0_44px]">ID</span>
          <span className="flex-auto">Subject</span>
          <span className="flex-none">Route · Sent</span>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((m) => (
            <motion.div
              key={m.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Link
                href={`/outbox/${m.slug}`}
                className="flex flex-wrap gap-x-5 gap-y-2 border-b border-line px-5 py-[22px] transition-colors duration-150 ease-out hover:bg-fill"
              >
                <span className="flex-[0_0_44px] font-mono text-xs leading-8 text-muted">
                  {m.id}
                </span>
                <span className="min-w-0 flex-[1_1_380px]">
                  <span className="block text-[clamp(19px,1.8vw,24px)] leading-[1.25] font-medium tracking-[-0.015em]">
                    {m.title}
                  </span>
                  <span className="mt-1.5 block max-w-[680px] text-[15px] text-muted">
                    {m.excerpt}
                  </span>
                </span>
                <span className="flex flex-none flex-col items-end gap-0.5 text-right font-mono text-xs text-muted">
                  <span>{m.route}</span>
                  <span>{m.meta}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        {shown.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-5 py-10 text-center"
          >
            <p className="font-mono text-[13px] font-medium text-muted">
              204 No Content
            </p>
            <p className="mt-1.5">Nothing on this channel yet.</p>
          </motion.div>
        )}
      </div>

      {note && <p className="mt-4 font-mono text-xs text-muted">{note}</p>}
    </>
  );
}
