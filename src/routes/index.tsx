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
      { title: "Sandesh Rimal — Mobile & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Sandesh Rimal — Flutter, mobile and full-stack engineer building scalable apps with clean UI/UX.",
      },
      { property: "og:title", content: "Sandesh Rimal — Mobile & Full-Stack Developer" },
      {
        property: "og:description",
        content: "Mobile-first applications, MERN backends, and meaningful digital experiences.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
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
  );
}
