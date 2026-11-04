import type { Metadata } from "next";
import { HomeFooter } from "@/components/Footers";
import { HomeHeader } from "@/components/HomeHeader";
import { PageAnimations } from "@/components/PageAnimations";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
// Outbox is hidden for now.
// import { OutboxPreview } from "@/components/sections/OutboxPreview";
import { Services } from "@/components/sections/Services";
import { Stack } from "@/components/sections/Stack";
import { StatusBar } from "@/components/sections/StatusBar";
import { Work } from "@/components/sections/Work";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" }, // add types: rssAlternates (from "@/lib/site") when Outbox is back
  openGraph: {
    type: "website",
    siteName: "Sandesh Rimal",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <StatusBar />
      <HomeHeader />
      <main id="main">
        <PageAnimations />
        <Hero />
        <Work />
        <Services />
        <Stack />
        <About />
        {/* <OutboxPreview /> */}
        <Contact />
      </main>
      <HomeFooter />
    </>
  );
}
