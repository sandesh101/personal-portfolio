import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { CommandMenu } from "@/components/CommandMenu";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sandesh Rimal | Flutter Developer in Nepal" },
      {
        name: "description",
        content:
          "Sandesh Rimal is a Flutter developer in Nepal specializing in mobile apps, clean UI/UX, and scalable full-stack engineering for growing businesses.",
      },
      {
        name: "keywords",
        content:
          "Sandesh Rimal, Flutter developer in Nepal, mobile app developer Nepal, Dart developer Nepal, Flutter app development, full stack developer Nepal",
      },
      {
        property: "og:title",
        content: "Sandesh Rimal | Flutter Developer in Nepal",
      },
      {
        property: "og:description",
        content:
          "Flutter and full-stack developer in Nepal building scalable mobile experiences and high-performing digital products.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sandeshrimal.com.np/" },
      {
        property: "og:image",
        content: "https://sandeshrimal.com.np/og-image.svg",
      },
    ],
    links: [{ rel: "canonical", href: "https://sandeshrimal.com.np/" }],
  }),
  component: Index,
});

function Index() {
  const [cmdOpen, setCmdOpen] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sandesh Rimal",
    jobTitle: "Flutter Developer and Full-Stack Developer",
    description:
      "Flutter developer in Nepal building mobile apps, backend systems, and polished digital experiences for modern businesses.",
    url: "https://sandeshrimal.com.np/",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
      addressLocality: "Nepal",
    },
    knowsAbout: [
      "Flutter",
      "Dart",
      "Mobile App Development",
      "Node.js",
      "Nest.js",
      "MongoDB",
      "Full Stack Development",
      "UI/UX Design",
    ],
    sameAs: [
      "https://www.linkedin.com/in/sandesh-rimal/",
      "https://github.com/sandesh101",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <SmoothScroll>
        <Preloader />
        <div className="noise relative min-h-screen bg-background text-foreground antialiased">
          <Nav onOpenCmd={() => setCmdOpen(true)} />
          <CommandMenu open={cmdOpen} setOpen={setCmdOpen} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            {/* <Testimonials /> */}
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
