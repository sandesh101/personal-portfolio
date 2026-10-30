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
  openGraph: { url: "/" },
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
