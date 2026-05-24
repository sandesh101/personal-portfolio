import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command, Sun, Moon } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Nav({ onOpenCmd }: { onOpenCmd: () => void }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        // When multiple sections intersect, pick the one with largest visible area
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
    >
      <nav
        className={`flex items-center gap-2 rounded-full border border-border backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "bg-background/70 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)]"
            : "bg-background/30"
        } pl-5 pr-2 py-2`}
      >
        <a href="#home" className="font-display font-semibold text-sm tracking-tight mr-2">
          SR<span className="text-muted-foreground">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="relative px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${active === s.id ? "text-foreground" : ""}`}>
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1 ml-1">
          <button
            onClick={onOpenCmd}
            aria-label="Open command menu"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Command className="h-3 w-3" />
            <span>K</span>
          </button>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary transition-colors"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
