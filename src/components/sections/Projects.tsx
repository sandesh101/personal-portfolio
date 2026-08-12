import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  year: string;
  description: string;
  stack: string[];
  accent: string;
  link?: string;
  repo?: string;
};

const projects: Project[] = [
  {
    title: "Chynabazar",
    year: "2026",
    description:
      "ChinaBazar is a comprehensive e-commerce platform (modular monolith) with NestJS backend, Next.js web, and Flutter mobile apps for consumers and warehouse operations, covering shopping, payments, notifications, SKU/inventory management, and ERP integration.",
    stack: ["Nest Js", "TypeScript", "Flutter", "Bloc"],
    accent: "from-sky-200 to-indigo-500",
    link: "https://chynabazar.com",
  },
  {
    title: "Express Postman Collection Generator",
    year: "2026",
    description:
      "A lightweight CLI to automatically generate Postman collections from Express.js route files. Zero configuration and exports Postman Collection v2.1 JSON.",
    stack: ["Node.js", "Express", "postman-collection"],
    accent: "from-emerald-200 to-emerald-500",
    link: "https://www.npmjs.com/package/express-routes-postman",
  },
  {
    title: "खर्च — Expense Tracker",
    year: "2025",
    description:
      "A mobile-first expense tracking app with real-time analytics, budgets and category insights — powered by Riverpod state management and a Node/Express API.",
    stack: ["Flutter", "Riverpod", "Node.js", "Express", "MongoDB"],
    accent: "from-neutral-200 to-neutral-500",
  },
  {
    title: "Student Exam Resource Platform",
    year: "2024",
    description:
      "Upload, organize and access semester notes and past question papers — with offline support and subject-based structure for students.",
    stack: ["Flutter", "Firebase", "Node.js", "MongoDB"],
    accent: "from-neutral-300 to-neutral-600",
  },
  {
    title: "Portfolio Website",
    year: "2025",
    description:
      "An animated, minimal developer portfolio built with React, GSAP and Lenis — focused on motion, typography and cinematic transitions.",
    stack: ["React", "GSAP", "Lenis", "Tailwind"],
    accent: "from-neutral-100 to-neutral-400",
  },
  // {
  //   title: "MERN API Suite",
  //   year: "2024",
  //   description:
  //     "Production-ready REST API templates with JWT auth, role-based access, rate limiting and clean controller/service architecture.",
  //   stack: ["Node.js", "Express", "MongoDB", "JWT"],
  //   accent: "from-neutral-400 to-neutral-700",
  // },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });

        const visual = el.querySelector<HTMLElement>("[data-parallax]");
        if (visual) {
          gsap.to(visual, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="work" className="relative py-32 md:py-40">
      <div className="container-page">
        <div className="flex items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              03 — Selected Work
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl tracking-tight font-medium max-w-xl">
              Things I've shipped recently.
            </h2>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            All projects <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <article
              key={p.title}
              data-project
              style={{ zIndex: i + 1 }}
              className="group sticky top-24 md:top-28 z-0 grid lg:grid-cols-12 gap-6 lg:gap-10 rounded-3xl border border-border bg-surface/90 backdrop-blur p-6 lg:p-8 hover-lift hover:border-foreground/30 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] mt-4 first:mt-0"
            >
              <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto rounded-2xl border border-border overflow-hidden bg-background">
                <div
                  data-parallax
                  className={`absolute inset-0 bg-linear-to-br ${p.accent} opacity-20`}
                />
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl md:text-8xl font-medium tracking-tighter text-foreground/10 select-none">
                    0{i + 1}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.year}</span>
                  {/* <span className="rounded-full border border-border bg-background/60 backdrop-blur px-2.5 py-1">
                    Case study
                  </span> */}
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl md:text-4xl font-medium tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl text-balance">
                    {p.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.link && (
                    <motion.a
                      whileHover={{ x: 2 }}
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium"
                    >
                      Live preview <ArrowUpRight className="h-4 w-4" />
                    </motion.a>
                  )}
                  <a
                    href={
                      p.repo ??
                      "https://github.com/sandesh101/postman-collection-generator"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                  >
                    <Github className="h-4 w-4" /> Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
