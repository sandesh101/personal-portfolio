"use client";

import { useEffect, useRef, useState } from "react";
import { H, type Game, movePaddle, newGame, PADDLE_H, PADDLE_W, PADDLE_Y, R, step, W } from "@/lib/breakout";

const PADDLE_SPEED = 22; // cells per second for the arrow keys
// Keys that keep their normal job: moving focus, activating links, closing things, modifiers.
const IGNORE = new Set(["Tab", "Enter", "Escape", "Shift", "Control", "Alt", "Meta", "CapsLock"]);

type Mode = "idle" | "ready" | "play" | "won" | "lost";

const isInteractive = (t: EventTarget | null) =>
  t instanceof Element && !!t.closest("a,button,input,textarea,select,[role=button]");

/** The big 404: a Breakout board whose bricks spell the number. Any key or a tap on empty space starts a round. */
export function Breakout404() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ui, setUi] = useState({ mode: "idle" as Mode, lives: 3, left: 47 });

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    let g: Game = newGame();
    let active = false;
    let raf = 0;
    let last = 0;
    const keys = { left: false, right: false };
    const colors = { ink: "#0a0a0a", accent: "#2d52e0", line: "#e5e5e5" };

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors.ink = css.getPropertyValue("--ink").trim() || colors.ink;
      colors.accent = css.getPropertyValue("--accent").trim() || colors.accent;
    };
    const mode = (): Mode => (active ? g.phase : "idle");
    const sync = () =>
      setUi((p) =>
        p.mode === mode() && p.lives === g.lives && p.left === g.left
          ? p
          : { mode: mode(), lives: g.lives, left: g.left },
      );

    const render = () => {
      const s = c.width / W;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = colors.ink;
      g.bricks.forEach((row, y) =>
        row.forEach((on, x) => on && ctx.fillRect((x + 0.06) * s, (y + 0.06) * s, 0.88 * s, 0.88 * s)),
      );
      if (!active) return;
      ctx.fillStyle = colors.accent;
      ctx.fillRect(g.px * s, PADDLE_Y * s, PADDLE_W * s, PADDLE_H * s);
      ctx.beginPath();
      ctx.arc(g.x * s, g.y * s, R * s, 0, Math.PI * 2);
      ctx.fill();
    };

    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = Math.round(r.width * dpr);
      c.height = Math.round((r.width * H * dpr) / W);
      render();
    };

    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 1 / 30);
      last = t;
      movePaddle(g, g.px + (Number(keys.right) - Number(keys.left)) * PADDLE_SPEED * dt);
      step(g, dt);
      render();
      sync();
      if (g.phase === "ready" || g.phase === "play") raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      g = newGame();
      active = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
      sync();
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      g = newGame();
      active = false;
      render();
      sync();
    };
    const live = () => active && (g.phase === "ready" || g.phase === "play");

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (live()) {
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left = true;
        else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right = true;
        else if (e.key === "Escape") return stop();
        else if (e.key !== " ") return;
        e.preventDefault();
        return;
      }
      if (e.key === "Escape") return active ? stop() : undefined;
      if (IGNORE.has(e.key) || isInteractive(e.target)) return;
      start();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left = false;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right = false;
    };
    const follow = (clientX: number) => {
      const r = c.getBoundingClientRect();
      movePaddle(g, ((clientX - r.left) / r.width) * W - PADDLE_W / 2);
    };
    const onPointerMove = (e: PointerEvent) => live() && follow(e.clientX);
    const onPointerDown = (e: PointerEvent) => {
      if (live()) return follow(e.clientX);
      if (isInteractive(e.target) || (e.pointerType === "mouse" && e.button !== 0)) return;
      start();
      follow(e.clientX);
    };
    // The canvas size follows the layout, so a resize only redraws; the game carries on.
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    // Repaint when the colour theme flips.
    const obs = new MutationObserver(() => {
      readColors();
      render();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    readColors();
    resize();

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      obs.disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const playing = ui.mode === "ready" || ui.mode === "play";
  return (
    <div className="w-full">
      <canvas
        ref={canvas}
        role="img"
        aria-label="The number 404 built from bricks. Press any key to play Breakout with it: arrow keys move the paddle."
        className="block aspect-[19/17] w-full"
        style={{ touchAction: playing ? "none" : "auto" }}
      />
      <p className="mono-label mt-3 min-h-5">
        {ui.mode === "idle" && "Press any key or tap to play."}
        {playing && `Lives ${ui.lives} · ${ui.left} bricks left · mouse, touch or ← → · Esc to exit`}
        {ui.mode === "won" && "404 cleared. Press any key to play again."}
        {ui.mode === "lost" && "Game over. Press any key to try again."}
      </p>
      <p role="status" className="sr-only">
        {ui.mode === "won" ? "You cleared the 404." : ui.mode === "lost" ? "Game over." : ""}
      </p>
    </div>
  );
}
