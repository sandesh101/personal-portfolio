import { type GameEvent, ROWS } from "./breakout";

type Wave = OscillatorType;
type AC = typeof AudioContext;

export type Sfx = {
  muted: boolean;
  /** Create or resume the audio context. Call it from a click or key press. */
  unlock: () => void;
  play: (e: GameEvent) => void;
  close: () => void;
};

/** Small synthesised sound effects for the game. No audio files; quiet by design. */
export function createSfx(): Sfx {
  let ctx: AudioContext | null = null;
  let lastWall = 0;

  const tone = (freq: number, dur: number, wave: Wave, vol: number, to = freq, delay = 0) => {
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, t);
    if (to !== freq) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
    // A short fade in and out avoids clicks.
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  };

  const sfx: Sfx = {
    muted: false,
    unlock() {
      if (!ctx) {
        const Ctor =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: AC }).webkitAudioContext;
        if (!Ctor) return;
        ctx = new Ctor();
      }
      void ctx.resume();
    },
    play(e) {
      if (sfx.muted || !ctx) return;
      switch (e.type) {
        case "launch":
          tone(300, 0.14, "sine", 0.12, 620);
          break;
        case "wall": {
          const now = ctx.currentTime;
          if (now - lastWall < 0.05) return;
          lastWall = now;
          tone(220, 0.05, "triangle", 0.09);
          break;
        }
        case "paddle":
          tone(340, 0.09, "square", 0.07, 250);
          break;
        case "brick":
          // The higher the brick, the higher the note.
          tone(330 * 2 ** ((ROWS - 1 - (e.row ?? 0)) / 6), 0.1, "triangle", 0.12);
          break;
        case "life":
          tone(420, 0.35, "sawtooth", 0.06, 110);
          break;
        case "lost":
          [330, 262, 196].forEach((f, i) => tone(f, 0.22, "triangle", 0.1, f * 0.9, i * 0.2));
          break;
        case "won":
          [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, "triangle", 0.11, f, i * 0.1));
          break;
      }
    },
    close() {
      void ctx?.close();
      ctx = null;
    },
  };
  return sfx;
}
