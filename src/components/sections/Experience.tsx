import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "Nov 2025 — Present",
    role: "Flutter Developer",
    org: "DarviLab Pvt. Ltd.",
    description:
      "Full-time Flutter Developer working on cross-platform mobile apps and feature delivery.",
  },
  {
    year: "May 2024 — Present",
    role: "Instructor",
    org: "Asian School of Management and Technology",
    description:
      "Part-time instructor teaching Java, JavaScript, Mobile Programming, PHP, MySQL mentoring students.",
  },
  {
    year: "Jan 2024 — Sep 2024",
    role: "Flutter Developer",
    org: "Eydean Inc.",
    description: "Worked on Flutter projects and mobile features across client apps.",
  },
  {
    year: "Jul 2023 — Feb 2024",
    role: "Web Development Instructor",
    org: "St. Lawrence College",
    description:
      "Part-time instructor teaching web design and development (Figma, HTML, CSS, Bootstrap, JavaScript).",
  },
  {
    year: "May 2023 — Sep 2023",
    role: "Flutter Developer",
    org: "WHive IT Professionals",
    description: "Interning Flutter development on mobile projects and integrations.",
  },
];

const education = [
  {
    title: "MIT",
    org: "Tribhuvan University (Central Department of Computer Science & Information Technology)",
    year: "2026-2028",
  },
  {
    title: "BSc. CSIT",
    org: "Asian School of Management and Technology (T.U. Affiliated)",
    year: "2018-2022",
  },
  { title: "+2", org: "National Institute of Science and Technology", year: "2016-2018" },
];

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-timeline-item]", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from("[data-edu]", {
        scrollTrigger: { trigger: "#education", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="experience" className="relative py-32 md:py-40">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              04 — Experience
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl tracking-tight font-medium">
              Work &amp; teaching.
            </h2>
          </div>

          <div className="lg:col-span-8 relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
            <ul className="space-y-12">
              {timeline.map((t) => (
                <li key={t.role} data-timeline-item className="relative pl-12">
                  <span className="absolute left-0 top-1.5 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                  </span>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t.year}
                  </div>
                  <h3 className="mt-2 font-display text-xl md:text-2xl font-medium">{t.role}</h3>
                  <div className="text-muted-foreground">{t.org}</div>
                  <p className="mt-3 text-muted-foreground text-balance">{t.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="education" className="mt-32">
          <div className="flex items-end justify-between gap-8 mb-12">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                05 — Education
              </div>
              <h2 className="mt-6 font-display text-4xl md:text-5xl tracking-tight font-medium">
                Always learning.
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {education.map((e) => (
              <div
                key={e.title}
                data-edu
                className="rounded-2xl border border-border bg-surface/40 backdrop-blur p-6 hover-lift hover:border-foreground/30"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {e.year}
                </div>
                <h3 className="mt-3 font-display text-lg font-medium leading-snug">{e.title}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{e.org}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
