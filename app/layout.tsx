import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Mukta } from "next/font/google";
import { EMAIL, LINKS, SITE_URL } from "@/lib/site";
import { Providers } from "@/components/Providers";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
// Mukta is only for Devanagari.
const deva = Mukta({
  subsets: ["devanagari"],
  weight: ["700", "800"],
  variable: "--font-mukta",
  display: "swap",
});

const description =
  "Flutter developer and backend engineer in Kathmandu. I take mobile apps and the servers behind them from first screen to production.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sandesh Rimal — Flutter developer and backend engineer",
    template: "%s — Sandesh Rimal",
  },
  description,
  openGraph: { type: "website", siteName: "Sandesh Rimal", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Sets the saved theme before first paint so there is no flash, and marks the page as scripted.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")`;

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sandesh Rimal",
  url: SITE_URL,
  image: `${SITE_URL}/work/sandesh-portrait.webp`,
  email: `mailto:${EMAIL}`,
  jobTitle: "Flutter developer and backend engineer",
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  knowsAbout: ["Flutter", "Dart", "NestJS", "Node.js", "TypeScript"],
  sameAs: [LINKS.github, LINKS.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${deva.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-bg"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
