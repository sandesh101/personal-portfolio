"use client";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="mono-label h-11 cursor-pointer border-0 bg-transparent px-2.5 font-medium"
    >
      <span className="to-dark">Dark</span>
      <span className="to-light">Light</span>
    </button>
  );
}
