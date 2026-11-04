"use client";

import { useEffect, useRef, useState } from "react";
import { type Dir, type Game, newGame, OPPOSITE, step } from "@/lib/snake";

const CELL = 24;
const TICK = 100;
const KEYS: Record<string, Dir> = {
  ArrowUp: "up",
  w: "up",
  ArrowDown: "down",
  s: "down",
  ArrowLeft: "left",
  a: "left",
  ArrowRight: "right",
  d: "right",
};
// Keys that keep their normal job: moving focus, activating links, closing things, modifiers.
const IGNORE = new Set(["Tab", "Enter", "Escape", "Shift", "Control", "Alt", "Meta", "CapsLock"]);

type Status = "off" | "playing" | "over";

const isInteractive = (t: EventTarget | null) =>
  t instanceof Element && !!t.closest("a,button,input,textarea,select,[role=button]");

/** Queue a turn, ignoring repeats and reversals so two quick inputs cannot fold the snake onto itself. */
function turn(g: Game, queue: Dir[], d: Dir) {
  const last = queue.at(-1) ?? g.dir;
  if (d !== last && d !== OPPOSITE[last] && queue.length < 3) queue.push(d);
}

function draw(c: HTMLCanvasElement | null, g: Game | null) {
  const ctx = c?.getContext("2d");
  if (!c || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);
  if (!g) return;
  const css = getComputedStyle(document.documentElement);
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = css.getPropertyValue("--accent");
  ctx.beginPath();
  ctx.arc((g.food.x + 0.5) * CELL, (g.food.y + 0.5) * CELL, CELL * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = css.getPropertyValue("--ink");
  g.snake.forEach((p, i) => {
    ctx.globalAlpha = i === 0 ? 0.38 : 0.2;
    ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2);
  });
  ctx.globalAlpha = 1;
}

/**
 * A snake hidden behind the page. Any key, or a click on empty space, wakes it up as a faint
 * layer behind the content; Escape puts it away. Links and buttons keep working as normal.
 */
export function HiddenSnake() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game | null>(null);
  const queue = useRef<Dir[]>([]);
  const statusRef = useRef<Status>("off");
  const [status, setStatus] = useState<Status>("off");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const go = (s: Status) => {
      statusRef.current = s;
      setStatus(s);
    };
    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
    };
    size();

    const stop = () => {
      game.current = null;
      queue.current = [];
      draw(c, null);
      go("off");
    };
    const start = () => {
      size();
      game.current = newGame(
        Math.max(8, Math.floor(window.innerWidth / CELL)),
        Math.max(8, Math.floor(window.innerHeight / CELL)),
      );
      queue.current = [];
      setScore(0);
      draw(c, game.current);
      go("playing");
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const s = statusRef.current;
      if (s === "playing" && game.current) {
        const d = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
        if (d) {
          e.preventDefault();
          turn(game.current, queue.current, d);
        } else if (e.key === "Escape") stop();
        return;
      }
      if (e.key === "Escape") {
        if (s === "over") stop();
        return;
      }
      if (IGNORE.has(e.key) || isInteractive(e.target)) return;
      start();
    };
    const onPointer = (e: PointerEvent) => {
      if (statusRef.current === "playing" || isInteractive(e.target)) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      start();
    };
    let touch: { x: number; y: number } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t0 = touch;
      touch = null;
      if (!t0 || statusRef.current !== "playing" || !game.current) return;
      const dx = e.changedTouches[0].clientX - t0.x;
      const dy = e.changedTouches[0].clientY - t0.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
      turn(
        game.current,
        queue.current,
        Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up",
      );
    };
    // The grid is sized to the window, so a resize ends the round.
    const onResize = () => {
      size();
      if (statusRef.current !== "off") stop();
    };
    // Repaint when the colour theme flips.
    const obs = new MutationObserver(() => draw(c, game.current));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      const g = game.current;
      if (!g) return;
      const next = step(g, queue.current.shift() ?? g.dir);
      game.current = next;
      setScore(next.score);
      draw(canvas.current, next);
      if (next.over) {
        statusRef.current = "over";
        setStatus("over");
      }
    }, TICK);
    return () => clearInterval(id);
  }, [status]);

  return (
    <>
      <canvas
        ref={canvas}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 -z-10 h-full w-full transition-opacity duration-300 motion-reduce:transition-none ${
          status === "off" ? "opacity-0" : "opacity-100"
        }`}
      />
      <p
        role="status"
        className={`mono-label fixed bottom-4 left-5 z-20 ${status === "off" ? "sr-only" : ""}`}
      >
        {status === "playing" && `Snake · ${score} · Esc to exit`}
        {status === "over" && `Game over · ${score} · any key to retry · Esc to exit`}
      </p>
    </>
  );
}
