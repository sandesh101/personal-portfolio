export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandeshrimal.com.np";

export const SITE_TITLE =
  "Sandesh Rimal — Flutter & mobile app developer in Kathmandu, Nepal";
export const SITE_DESCRIPTION =
  "Flutter developer and backend engineer in Kathmandu, Nepal. I build mobile apps and the NestJS servers behind them, from first screen to production.";
export const SERVICES_PATH = "/services/mobile-app-development-nepal";

export const EMAIL = "rimal.sandesh11@gmail.com";

export const LINKS = {
  github: "https://github.com/sandesh101",
  linkedin: "https://www.linkedin.com/in/sandesh-rimal/",
  chynabazarPlay:
    "https://play.google.com/store/apps/details?id=com.chinabazar.app",
  liarsGridPlay:
    "https://play.google.com/store/apps/details?id=com.sandesh.liarsgrid",
  routesPostmanNpm: "https://www.npmjs.com/package/express-routes-postman",
  // The PDF is exported from assets/cv/Sandesh-Rimal-CV.docx (see assets/cv/build.js).
  resume: "/Sandesh-Rimal-CV.pdf",
};

export type NavItem = { num: string; label: string; href: string };

/** Section links, numbered in page order. The Outbox appears once it has a real post. */
export function navItems(outbox: boolean): NavItem[] {
  const items = [
    ["Work", "#work"],
    ["Services", "#services"],
    ["Stack", "#stack"],
    ["About", "#about"],
    ...(outbox ? [["Outbox", "#outbox"]] : []),
    ["Contact", "#contact"],
  ];
  return items.map(([label, href], i) => ({
    num: String(i + 1).padStart(2, "0"),
    label,
    href,
  }));
}

/** Flip to true to publish the Chynabazar case study: indexed, in the sitemap, and linked from the site. */
export const CASE_STUDY_LIVE = true;
export const CASE_STUDY_PATH = "/work/chynabazar";
/** The Work button also shows while running `npm run dev`, so the draft can be reached. Never in a production build. */
export const CASE_STUDY_BUTTON =
  CASE_STUDY_LIVE || process.env.NODE_ENV === "development";
/** First published. Update CASE_STUDY_MODIFIED whenever the content changes. */
export const CASE_STUDY_DATE = "2026-11-05";
export const CASE_STUDY_MODIFIED = "2026-11-05";

export const rssAlternates = { "application/rss+xml": "/outbox/rss.xml" };

/** New-tab props for external links and PDFs; placeholder "#" links stay in the same tab. */
export const ext = (href: string) =>
  href.startsWith("http") || href.endsWith(".pdf")
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
