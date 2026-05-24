import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Youtube } from "lucide-react";
import gsap from "gsap";

const titles = ["Mobile Application Developer"];

export function Hero() {
  const rotatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rotatorRef.current;
    if (!el) return;
    let i = 0;
    const tl = gsap.timeline({ repeat: -1 });
    titles.forEach(() => {
      tl.to(el, {
        duration: 0,
        onStart: () => {
          el.textContent = titles[i % titles.length];
        },
      })
        .fromTo(
          el,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        )
        .to({}, { duration: 2.2 })
        .to(el, {
          yPercent: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => i++,
        });
    });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-24 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-grid bg-grid-fade" />
      <div className="blob bg-white/10 w-[500px] h-[500px] -top-32 -left-32" />
      <div className="blob bg-white/5 w-[600px] h-[600px] -bottom-40 -right-40" />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-3 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for freelance &amp; collaborations
        </motion.div>

        <h1 className="mt-8 font-display font-medium tracking-[-0.04em] text-balance text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.95]">
          <SplitLine delay={1.85}>Sandesh</SplitLine>
          <SplitLine delay={2.0} className="text-muted-foreground">
            Rimal.
          </SplitLine>
        </h1>

        <div className="mt-8 flex items-center gap-3 text-base md:text-lg text-muted-foreground">
          <span className="h-px w-10 bg-red-500" />
          <span className="relative inline-block h-[1.6em] overflow-hidden">
            {/* <span ref={rotatorRef} className="inline-block text-foreground font-medium">
              {titles[0]}
            </span> */}
            <span className="inline-block text-foreground font-medium">{titles[0]}</span>
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground text-balance"
        >
          I build scalable mobile and web applications with modern technologies and clean user
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover-lift"
          >
            View Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-5 py-3 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Contact Me
          </a>

          <div className="ml-auto hidden md:flex items-center gap-1">
            {[
              { Icon: Github, href: "https://github.com/sandesh101", label: "GitHub" },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/sandesh-rimal/",
                label: "LinkedIn",
              },
              { Icon: Mail, href: "mailto:rimal.sandesh11@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function SplitLine({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
