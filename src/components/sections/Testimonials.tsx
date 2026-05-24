import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Sandesh has a rare combination of strong engineering instincts and genuine empathy for users. Our app shipped faster and felt better because of him.",
    name: "Aastha Khanal",
    role: "Product Manager",
  },
  {
    quote:
      "As a mentor, he turned complex concepts into something I could actually build with. The Flutter sessions completely changed my trajectory.",
    name: "Bibek Sharma",
    role: "Student",
  },
  {
    quote:
      "Clean architecture, thoughtful APIs, and animations that just feel right. He raises the bar on every project.",
    name: "Pranita Joshi",
    role: "Designer",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-t-card]", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-40">
      <div className="container-page">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          06 — Kind words
        </div>
        <h2 className="mt-6 font-display text-4xl md:text-5xl tracking-tight font-medium max-w-2xl">
          What people say.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-t-card
              className="rounded-3xl border border-border bg-surface/40 backdrop-blur p-8 hover-lift hover:border-foreground/30 flex flex-col gap-8"
            >
              <span className="font-display text-5xl text-foreground/30 leading-none">"</span>
              <blockquote className="text-base md:text-lg text-foreground/90 text-balance">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-border">
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
