"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEBRIS_LIFE,
  H,
  type Game,
  movePaddle,
  newGame,
  PADDLE_H,
  PADDLE_W,
  PADDLE_Y,
  R,
  ROWS,
  step,
  W,
} from "@/lib/breakout";
import { createSfx, type Sfx } from "@/lib/sfx";

const M = 0.5; // empty margin around the board, in cells, so the walls have room
const CW = W + 2 * M;
const CH = H + M;
const WALL = 0.14;
const PADDLE_SPEED = 22; // cells per second for the arrow keys
// Keys that keep their normal job: moving focus, activating links, closing things, modifiers.
const IGNORE = new Set(["Tab", "Enter", "Escape", "Shift", "Control", "Alt", "Meta", "CapsLock"]);

type Mode = "idle" | "ready" | "play" | "won" | "lost";

const isInteractive = (t: EventTarget | null) =>
  t instanceof Element && !!t.closest("a,button,input,textarea,select,[role=button]");

/** The big 404: a Breakout board whose bricks spell the number. Any key or a tap on empty space starts a round. */
export function Breakout404() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const toggleMute = useRef<() => void>(() => {});
  const [ui, setUi] = useState({ mode: "idle" as Mode, lives: 3, left: 47, muted: false });

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    const sfx: Sfx = createSfx();
    let g: Game = newGame();
    let active = false;
    let wallA = 0; // walls fade in when a round starts
    let raf = 0;
    let last = 0;
    const keys = { left: false, right: false };
    const colors = { ink: "#0a0a0a", accent: "#2d52e0" };

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors.ink = css.getPropertyValue("--ink").trim() || colors.ink;
      colors.accent = css.getPropertyValue("--accent").trim() || colors.accent;
    };
    const mode = (): Mode => (active ? g.phase : "idle");
    const sync = () =>
      setUi((p) =>
        p.mode === mode() && p.lives === g.lives && p.left === g.left && p.muted === sfx.muted
          ? p
          : { mode: mode(), lives: g.lives, left: g.left, muted: sfx.muted },
      );

    const render = () => {
      const s = c.width / CW;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.save();
      ctx.translate(M * s, M * s);
      if (active) {
        ctx.globalAlpha = wallA;
        ctx.fillStyle = colors.ink;
        ctx.fillRect(-WALL * s, -WALL * s, (W + 2 * WALL) * s, WALL * s); // top
        ctx.fillRect(-WALL * s, -WALL * s, WALL * s, (H + WALL) * s); // left
        ctx.fillRect(W * s, -WALL * s, WALL * s, (H + WALL) * s); // right
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = colors.ink;
      g.bricks.forEach((row, y) =>
        row.forEach((on, x) => on && ctx.fillRect((x + 0.06) * s, (y + 0.06) * s, 0.88 * s, 0.88 * s)),
      );
      for (const d of g.debris) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - d.age / DEBRIS_LIFE);
        ctx.translate((d.x + 0.5) * s, (d.y + 0.5) * s);
        ctx.rotate(d.rot);
        ctx.fillRect(-0.44 * s, -0.44 * s, 0.88 * s, 0.88 * s);
        ctx.restore();
      }
      if (active) {
        ctx.fillStyle = colors.accent;
        ctx.fillRect(g.px * s, PADDLE_Y * s, PADDLE_W * s, PADDLE_H * s);
        ctx.beginPath();
        ctx.arc(g.x * s, g.y * s, R * s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = Math.round(r.width * dpr);
      c.height = Math.round((r.width * CH * dpr) / CW);
      render();
    };

    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 1 / 30);
      last = t;
      wallA = Math.min(1, wallA + dt / 0.4);
      movePaddle(g, g.px + (Number(keys.right) - Number(keys.left)) * PADDLE_SPEED * dt);
      step(g, dt);
      for (const e of g.events) sfx.play(e);
      g.events.length = 0;
      render();
      sync();
      // Keep going while the ball is live or bricks are still falling.
      if (g.phase === "ready" || g.phase === "play" || g.debris.length) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      try {
        sfx.muted = localStorage.getItem("game-muted") === "1";
      } catch {}
      sfx.unlock();
      cancelAnimationFrame(raf);
      g = newGame();
      active = true;
      wallA = 0;
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
    toggleMute.current = () => {
      sfx.muted = !sfx.muted;
      try {
        localStorage.setItem("game-muted", sfx.muted ? "1" : "0");
      } catch {}
      sfx.unlock();
      sync();
    };
    const live = () => active && (g.phase === "ready" || g.phase === "play");

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (live()) {
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left = true;
        else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right = true;
        else if (e.key.toLowerCase() === "m") toggleMute.current();
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
      movePaddle(g, ((clientX - r.left) / r.width) * CW - M - PADDLE_W / 2);
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
      sfx.close();
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
      <div className="relative">
        <canvas
          ref={canvas}
          role="img"
          aria-label="The number 404 built from bricks. Press any key to play Breakout with it: arrow keys move the paddle."
          className="block aspect-[20/14.5] w-full"
          style={{ touchAction: playing ? "none" : "auto" }}
        />
        {ui.mode === "idle" && (
          <p
            className="mono-label pointer-events-none absolute inset-x-0 text-center"
            style={{ top: `${((ROWS + 3 + M) / CH) * 100}%` }}
          >
            Press any key or tap to play.
          </p>
        )}
      </div>
      <div className="mt-1 flex min-h-11 flex-wrap items-center justify-between gap-x-6">
        <p className="mono-label">
          {playing && `Lives ${ui.lives} · ${ui.left} bricks left · mouse, touch or ← → · Esc to exit`}
          {ui.mode === "won" && "404 cleared. Press any key to play again."}
          {ui.mode === "lost" && "Game over. Press any key to try again."}
        </p>
        {ui.mode !== "idle" && (
          <button
            type="button"
            onClick={() => toggleMute.current()}
            aria-pressed={ui.muted}
            className="mono-label inline-flex min-h-11 cursor-pointer items-center border-0 bg-transparent"
          >
            Sound: {ui.muted ? "off" : "on"} (M)
          </button>
        )}
      </div>
      <p role="status" className="sr-only">
        {ui.mode === "won" ? "You cleared the 404." : ui.mode === "lost" ? "Game over." : ""}
      </p>
    </div>
  );
}
