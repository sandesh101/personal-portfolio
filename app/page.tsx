import type { Metadata } from "next";
import { HomeFooter } from "@/components/Footers";
import { HomeHeader } from "@/components/HomeHeader";
import { PageAnimations } from "@/components/PageAnimations";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
// Outbox is hidden for now.
// import { OutboxPreview } from "@/components/sections/OutboxPreview";
import { Stack } from "@/components/sections/Stack";
import { StatusBar } from "@/components/sections/StatusBar";
import { Wire } from "@/components/sections/Wire";
import { Work } from "@/components/sections/Work";

export const metadata: Metadata = {
  alternates: { canonical: "/" }, // add types: rssAlternates (from "@/lib/site") when Outbox is back
  openGraph: {
    type: "website",
    siteName: "Sandesh Rimal",
    url: "/",
    title: "Sandesh Rimal — Flutter developer and backend engineer",
    description:
      "Flutter developer and backend engineer in Kathmandu. I take mobile apps and the servers behind them from first screen to production.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sandesh Rimal — Flutter developer and backend engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandesh Rimal — Flutter developer and backend engineer",
    description:
      "Flutter developer and backend engineer in Kathmandu. I take mobile apps and the servers behind them from first screen to production.",
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
        <Wire />
        <Work />
        <Stack />
        <About />
        {/* <OutboxPreview /> */}
        <Contact />
      </main>
      <HomeFooter />
    </>
  );
}
