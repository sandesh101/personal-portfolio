"use client";

import { useEffect, useState } from "react";

/** "In this message" links, with the section being read in bold. */
export function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const update = () => {
      let current = headings[0]?.id ?? "";
      for (const { id } of headings) {
        // Just below the h2 scroll-margin-top (88px), so a clicked link counts.
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= 96) current = id;
      }
      // Short last sections never reach the top of the screen.
      const end = document.documentElement.scrollHeight - 2;
      if (window.innerHeight + window.scrollY >= end)
        current = headings.at(-1)?.id ?? current;
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings]);

  return (
    <ol className="border-t border-line">
      {headings.map((h) => (
        <li key={h.id} className="border-b border-line">
          <a
            href={`#${h.id}`}
            aria-current={h.id === active ? "location" : undefined}
            className="block py-2.5 text-muted aria-[current]:font-semibold aria-[current]:text-ink"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
