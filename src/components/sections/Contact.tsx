import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-c-reveal]", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
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
    <section ref={ref} id="contact" className="relative py-32 md:py-40">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div data-c-reveal className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              07 — Contact
            </div>
            <h2
              data-c-reveal
              className="mt-6 font-display text-5xl md:text-6xl tracking-tight font-medium text-balance"
            >
              Let's build something <span className="text-muted-foreground">meaningful.</span>
            </h2>
            <div data-c-reveal className="mt-10 space-y-4 text-muted-foreground">
              <a
                href="mailto:hello@sandeshrimal.dev"
                className="group flex items-center gap-3 text-foreground"
              >
                <Mail className="h-4 w-4" /> rimal.sandesh11@gmail.com
                <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </a>
              <a
                href="https://github.com/sandesh101"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" /> github.com/sandesh101
              </a>
              <a
                href="https://linkedin.com/in/sandesh-rimal"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" /> linkedin.com/in/sandesh-rimal
              </a>
            </div>

            <div
              data-c-reveal
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-3 py-1.5 text-xs text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Currently accepting new projects
            </div>
          </div>

          <form
            data-c-reveal
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3000);
              (e.target as HTMLFormElement).reset();
            }}
            className="lg:col-span-7 rounded-3xl border border-border bg-surface/40 backdrop-blur p-6 md:p-10 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" />
            </div>
            <Field label="Subject" name="subject" placeholder="What's this about?" />
            <Field
              label="Message"
              name="message"
              placeholder="Tell me about your idea…"
              multiline
            />
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover-lift"
            >
              {sent ? "Message sent ✓" : "Send message"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  multiline,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label className="block group">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <div className="relative mt-2">
        {multiline ? (
          <textarea
            name={name}
            rows={5}
            required
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-foreground placeholder:text-muted-foreground/60 transition-colors resize-none"
          />
        ) : (
          <input
            name={name}
            type={type}
            required
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-foreground placeholder:text-muted-foreground/60 transition-colors"
          />
        )}
        <motion.span
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="absolute left-0 right-0 bottom-0 h-px bg-foreground"
        />
      </div>
    </label>
  );
}
