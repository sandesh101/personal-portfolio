"use client";

import { useRef, useState } from "react";
import { sendToForminit } from "@/lib/forminit";

export function SubscribeForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const sendingRef = useRef(false); // synchronous guard against a double click

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return;
    const fd = new FormData(e.currentTarget);
    fd.append("fi-radio-topic", "Outbox subscriber"); // tells it apart from contact messages
    sendingRef.current = true;
    setState("sending");
    const result = await sendToForminit(fd);
    sendingRef.current = false;
    setState(result.ok ? "sent" : "error");
  }

  return (
    <form
      onSubmit={submit}
      aria-label="Subscribe"
      className="flex min-w-0 flex-[1_1_340px] flex-col gap-2.5"
    >
      {state === "sent" ? (
        <div
          role="status"
          className="rounded-md border border-line bg-fill px-4 py-3.5"
        >
          <p className="font-mono text-[13px] font-medium text-ok">
            Subscription confirmed
          </p>
          <p className="mt-1">
            You&apos;ll get the next message when it&apos;s delivered.
          </p>
        </div>
      ) : (
        <>
          <label htmlFor="sub-email" className="text-sm">
            Get new messages delivered to your inbox
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="sub-email"
              name="fi-sender-email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="you@example.com"
              className="h-11 min-w-0 flex-[1_1_200px] rounded-md border border-ink bg-bg px-3 text-base text-ink focus-visible:shadow-[0_0_0_1px_var(--ink)] focus-visible:outline-none"
            />
            {/* Honeypot: hidden from people, filled in by bots. */}
            <input
              name="_gotcha"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px]"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="h-11 cursor-pointer rounded-md border-0 bg-ink px-[18px] text-[15px] font-medium text-bg"
            >
              {state === "sending" ? "Sending…" : "Subscribe"}
            </button>
          </div>
          <p
            className="font-mono text-xs text-muted"
            role={state === "error" ? "alert" : undefined}
          >
            {state === "error" ? (
              "Couldn't subscribe just now. Try again in a minute, or use the RSS feed."
            ) : (
              <>
                No schedule, no spam. Or follow the{" "}
                <a
                  href="/outbox/rss.xml"
                  className="text-ink underline underline-offset-[3px]"
                >
                  RSS feed
                </a>
                .
              </>
            )}
          </p>
        </>
      )}
    </form>
  );
}
