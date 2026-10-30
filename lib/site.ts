export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandeshrimal.com.np";

export const EMAIL = "rimal.sandesh11@gmail.com";

export const LINKS = {
  github: "https://github.com/sandesh101",
  linkedin: "https://www.linkedin.com/in/sandesh-rimal/",
  chynabazarPlay:
    "https://play.google.com/store/apps/details?id=com.chinabazar.app",
  routesPostmanNpm: "https://www.npmjs.com/package/express-routes-postman",
  // The PDF is exported from assets/cv/Sandesh-Rimal-CV.docx (see assets/cv/build.js).
  resume: "/Sandesh-Rimal-CV.pdf",
};

export const NAV = [
  { num: "01", label: "Work", href: "#work" },
  { num: "02", label: "Stack", href: "#stack" },
  { num: "03", label: "About", href: "#about" },
  // Outbox is hidden for now. To bring it back: restore this line, make Contact "05", and restore the
  // <OutboxPreview /> in app/page.tsx, the "05 — Contact" label, the sitemap entries and the case-study button.
  // { num: "04", label: "Outbox", href: "#outbox" },
  { num: "04", label: "Contact", href: "#contact" },
];

export const rssAlternates = { "application/rss+xml": "/outbox/rss.xml" };

/** New-tab props for external links and PDFs; placeholder "#" links stay in the same tab. */
export const ext = (href: string) =>
  href.startsWith("http") || href.endsWith(".pdf")
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
