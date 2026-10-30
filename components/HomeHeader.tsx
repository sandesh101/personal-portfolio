"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EMAIL, ext, LINKS, NAV } from "@/lib/site";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";

export function HomeHeader() {
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeBtn.current?.focus();
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      menuBtn.current?.focus();
    }
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-bg">
        <div className="wrap flex h-16 items-center justify-between gap-5">
          <Brand href="#top" />
          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 min-[900px]:flex"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="inline-flex min-h-11 items-center gap-2 px-3 text-sm"
              >
                <span className="font-mono text-[11px] text-muted">
                  {n.num}
                </span>
                {n.label}
              </a>
            ))}
            <a
              href={LINKS.resume}
              {...ext(LINKS.resume)}
              className="ml-3 inline-flex h-10 items-center rounded-md border border-ink px-3.5 text-sm font-medium"
            >
              Résumé ↗
            </a>
          </nav>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="h-11 cursor-pointer rounded-md border border-ink bg-transparent px-3.5 text-sm font-medium text-ink min-[900px]:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        data-open={open}
        data-lenis-prevent
        className="menu-sheet fixed inset-0 z-60 flex flex-col overflow-auto bg-bg px-5 pb-7 min-[900px]:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-line">
          <span lang="ne" className="font-deva text-[21px] font-bold">
            सन्देश
          </span>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="h-11 cursor-pointer rounded-md border border-ink bg-transparent px-3.5 text-sm font-medium text-ink"
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col">
          {NAV.map((n, i) => (
            <motion.a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={
                open
                  ? { delay: 0.06 + i * 0.05, duration: 0.35, ease: "easeOut" }
                  : { duration: 0.15 }
              }
              className="flex items-baseline gap-3.5 border-b border-line py-4 text-[40px] leading-[1.1] font-medium tracking-[-0.02em]"
            >
              <span className="font-mono text-xs font-normal tracking-normal text-muted">
                {n.num}
              </span>
              {n.label}
            </motion.a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col pt-7">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-11 items-center"
          >
            {EMAIL}
          </a>
          <Link
            href={LINKS.resume}
            {...ext(LINKS.resume)}
            className="inline-flex min-h-11 items-center"
          >
            Résumé ↗
          </Link>
        </div>
      </div>
    </>
  );
}
