import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Mobile",
    items: ["Flutter", "Dart", "Bloc", "Riverpod", "Firebase", "Android", "iOS"],
  },
  // {
  //   title: "Frontend",
  //   items: ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript"],
  // },
  {
    title: "Backend",
    items: ["Node.js", "Nest.js", "REST APIs", "MongoDB", "MySQL", "JWT Auth"],
  },
  {
    title: "Tools & DevOps",
    items: ["Git & GitHub", "Docker", "Postman", "Figma", "Xcode", "Linux"],
  },
];

const marquee = [
  "Flutter",
  "Dart",
  "Bloc",
  "Clean Architecture",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Firebase",
  "Riverpod",
  "Docker",
  "Figma",
  "JWT",
];

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-skill-card]", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="skills" className="relative py-32 md:py-40 overflow-hidden">
      <div className="container-page">
        <div className="flex items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              02 — Skills
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl tracking-tight font-medium max-w-xl">
              Tools that quietly do the heavy lifting.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              data-skill-card
              className="group relative rounded-3xl border border-border bg-surface/40 backdrop-blur p-8 hover-lift hover:border-foreground/30"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-medium">{cat.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {cat.items.length.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-24 py-8 border-y border-border overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-3xl md:text-5xl text-muted-foreground">
          {[...marquee, ...marquee].map((w, i) => (
            <span key={i} className="flex items-center gap-12">
              {w}
              <span className="text-foreground/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
