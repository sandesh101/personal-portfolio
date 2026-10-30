"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { sendToForminit } from "@/lib/forminit";
import { EMAIL } from "@/lib/site";
import { Segmented } from "./Segmented";

const TOPICS = ["Freelance project", "Full-time role", "Just saying hi"];
const field =
  "w-full min-w-0 border-0 border-b border-ink bg-transparent px-0 text-[17px] text-ink font-[inherit] focus-visible:shadow-[0_1px_0_0_var(--ink)] focus-visible:outline-none";

export function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const sendingRef = useRef(false); // synchronous guard against a double click
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return;
    const fd = new FormData(e.currentTarget);
    fd.append("fi-radio-topic", topic); // the topic picker is buttons, so it is not in the FormData yet
    sendingRef.current = true;
    setState("sending");
    setErrorMsg(null);
    const result = await sendToForminit(fd);
    sendingRef.current = false;
    if (result.ok) setState("sent");
    else {
      setErrorMsg(result.message);
      setState("error");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-md border border-line bg-fill p-6"
        >
          <p className="text-[26px] font-medium tracking-[-0.02em]">
            Delivered.{" "}
            <span lang="ne" className="font-deva font-bold">
              धन्यवाद
            </span>
            , I&apos;ll write back soon.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          onSubmit={submit}
          className="flex flex-col gap-5"
        >
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2.5 text-sm">What&apos;s it about?</legend>
            <Segmented
              options={TOPICS}
              value={topic}
              onChange={setTopic}
              stackOnMobile
            />
          </fieldset>

          <div className="flex flex-wrap gap-5">
            <div className="flex min-w-0 flex-[1_1_160px] flex-col gap-1">
              <label htmlFor="c-name" className="text-sm">
                Name
              </label>
              <input
                id="c-name"
                name="fi-sender-fullName"
                type="text"
                autoComplete="name"
                required
                maxLength={120}
                className={`${field} h-11`}
              />
            </div>
            <div className="flex min-w-0 flex-[1_1_160px] flex-col gap-1">
              <label htmlFor="c-email" className="text-sm">
                Email
              </label>
              <input
                id="c-email"
                name="fi-sender-email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                className={`${field} h-11`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="c-msg" className="text-sm">
              Message
            </label>
            <textarea
              id="c-msg"
              name="fi-text-message"
              rows={3}
              required
              maxLength={5000}
              className={`${field} resize-y py-2`}
            />
          </div>

          {/* Honeypot: hidden from people, filled in by bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label>
              Website
              <input
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={state === "sending"}
              className="btn btn-send px-6 text-base"
            >
              {state === "sending" ? "Sending…" : "Send →"}
            </button>
            {state === "error" && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-mono text-xs text-muted"
              >
                {errorMsg ?? (
                  <>
                    Not delivered. Try again, or write to{" "}
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-ink underline underline-offset-4"
                    >
                      {EMAIL}
                    </a>
                    .
                  </>
                )}
              </motion.p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
