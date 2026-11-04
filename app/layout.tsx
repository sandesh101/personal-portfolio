import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Mukta, Urbanist } from "next/font/google";
import {
  EMAIL,
  LINKS,
  SERVICES_PATH,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import { Providers } from "@/components/Providers";
import "./globals.css";

const sans = Urbanist({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
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

const description = SITE_DESCRIPTION;
const previewImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Sandesh Rimal",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Sandesh Rimal",
    locale: "en_US",
    title: SITE_TITLE,
    description,
    images: [previewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description,
    images: [previewImage.url],
  },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Sets the saved theme before first paint so there is no flash, and marks the page as scripted.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")`;

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
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
  knowsAbout: [
    "Flutter",
    "Dart",
    "Mobile app development",
    "NestJS",
    "Node.js",
    "TypeScript",
  ],
  sameAs: [LINKS.github, LINKS.linkedin],
};

const service = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: "Sandesh Rimal — Mobile app development",
  url: `${SITE_URL}${SERVICES_PATH}`,
  description,
  image: `${SITE_URL}/opengraph-image.png`,
  email: `mailto:${EMAIL}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  areaServed: { "@type": "Country", name: "Nepal" },
  provider: { "@id": `${SITE_URL}/#person` },
  serviceType: [
    "Flutter mobile app development",
    "Backend and API development",
  ],
};

const graph = { "@context": "https://schema.org", "@graph": [person, service] };

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
            __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
