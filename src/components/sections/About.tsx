import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 2, suffix: "+", label: "Years of experience in Tech" },
  { value: 10, suffix: "+", label: "Projects completed" },
  { value: 2, suffix: "+", label: "Years of experience in Education (Teaching)" },
  { value: 200, suffix: "+", label: "Students taught" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const end = parseInt(el.dataset.counter || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="relative py-32 md:py-40">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div data-reveal className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              01 — About
            </div>
            <h2
              data-reveal
              className="mt-6 font-display text-4xl md:text-5xl tracking-tight font-medium"
            >
              Engineer
              <br />
              by craft.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            <p data-reveal>
              I'm a mobile and full-stack developer focused on building thoughtful, performant
              applications. My toolkit centers around{" "}
              <span className="text-foreground">Flutter</span> for mobile and the{" "}
              <span className="text-foreground">Node.js</span> for backend — with a strong
              foundation in <span className="text-foreground">Nest.js</span>
            </p>
            <p data-reveal>
              I design mobile-first architectures, obsess over clean UI/UX, and care deeply about
              scalable systems. Alongside building, I teach and mentor the next wave of developers —
              turning concepts into shipped products.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              data-reveal
              className="group relative rounded-2xl border border-border bg-surface/40 backdrop-blur p-6 md:p-8 hover-lift hover:border-foreground/30"
            >
              <div className="font-display text-4xl md:text-5xl font-medium tracking-tight">
                <span data-counter={s.value}>0</span>
                <span className="text-muted-foreground">{s.suffix}</span>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
