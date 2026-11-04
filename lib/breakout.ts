// Breakout where the bricks spell "404". Units are brick widths: the board is W × H cells.
export const W = 19;
export const H = 17;
export const ROWS = 7;
export const PADDLE_W = 3.4;
export const PADDLE_H = 0.5;
export const PADDLE_Y = H - 1.3;
export const R = 0.3;
const START_SPEED = 10;
const MAX_SPEED = 17;

const FONT: Record<string, string[]> = {
  "4": ["...X.", "..XX.", ".X.X.", "X..X.", "XXXXX", "...X.", "...X."],
  "0": [".XXX.", "X...X", "X..XX", "X.X.X", "XX..X", "X...X", ".XXX."],
};

export type Phase = "ready" | "play" | "won" | "lost";
export type Game = {
  bricks: boolean[][];
  left: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  px: number;
  lives: number;
  speed: number;
  wait: number;
  phase: Phase;
};

export function newGame(): Game {
  const bricks = Array.from({ length: ROWS }, () => Array<boolean>(W).fill(false));
  let left = 0;
  [...("404")].forEach((ch, i) => {
    FONT[ch].forEach((row, y) =>
      [...row].forEach((c, x) => {
        if (c === "X") {
          bricks[y][i * 7 + x] = true;
          left++;
        }
      }),
    );
  });
  const g: Game = {
    bricks,
    left,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    px: (W - PADDLE_W) / 2,
    lives: 3,
    speed: START_SPEED,
    wait: 0.6,
    phase: "ready",
  };
  park(g);
  return g;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Rest the ball on the paddle. */
function park(g: Game) {
  g.x = g.px + PADDLE_W / 2;
  g.y = PADDLE_Y - R;
  g.vx = 0;
  g.vy = 0;
}

export function movePaddle(g: Game, px: number) {
  g.px = clamp(px, 0, W - PADDLE_W);
}

/** Advance the game by dt seconds. Mutates g. */
export function step(g: Game, dt: number, rand: () => number = Math.random) {
  if (g.phase === "won" || g.phase === "lost") return;
  if (g.phase === "ready") {
    park(g);
    g.wait -= dt;
    if (g.wait <= 0) {
      g.phase = "play";
      g.vx = (rand() - 0.5) * g.speed * 0.6;
      g.vy = -Math.sqrt(g.speed ** 2 - g.vx ** 2);
    }
    return;
  }
  // Small sub-steps so a fast ball cannot skip through a brick or the paddle.
  const n = Math.max(1, Math.ceil((g.speed * dt) / 0.2));
  for (let i = 0; i < n && g.phase === "play"; i++) sub(g, dt / n);
}

function sub(g: Game, dt: number) {
  g.x += g.vx * dt;
  g.y += g.vy * dt;
  if (g.x - R < 0) {
    g.x = R;
    g.vx = Math.abs(g.vx);
  } else if (g.x + R > W) {
    g.x = W - R;
    g.vx = -Math.abs(g.vx);
  }
  if (g.y - R < 0) {
    g.y = R;
    g.vy = Math.abs(g.vy);
  }

  hitBrick(g);

  if (g.vy > 0 && g.y + R >= PADDLE_Y && g.y + R <= PADDLE_Y + PADDLE_H + 0.4 &&
      g.x >= g.px - R && g.x <= g.px + PADDLE_W + R) {
    const t = clamp((g.x - (g.px + PADDLE_W / 2)) / (PADDLE_W / 2), -1, 1);
    const a = (t * 60 * Math.PI) / 180;
    g.vx = g.speed * Math.sin(a);
    g.vy = -g.speed * Math.cos(a);
    g.y = PADDLE_Y - R;
  }

  if (g.y - R > H) {
    g.lives--;
    if (g.lives <= 0) g.phase = "lost";
    else {
      g.phase = "ready";
      g.wait = 0.8;
      park(g);
    }
  }
}

function hitBrick(g: Game) {
  for (let cy = Math.floor(g.y - R); cy <= Math.floor(g.y + R); cy++) {
    for (let cx = Math.floor(g.x - R); cx <= Math.floor(g.x + R); cx++) {
      if (cy < 0 || cy >= ROWS || cx < 0 || cx >= W || !g.bricks[cy][cx]) continue;
      const dx = g.x - clamp(g.x, cx, cx + 1);
      const dy = g.y - clamp(g.y, cy, cy + 1);
      if (dx * dx + dy * dy >= R * R) continue;
      g.bricks[cy][cx] = false;
      g.left--;
      if (Math.abs(dx) > Math.abs(dy)) g.vx = dx > 0 ? Math.abs(g.vx) : -Math.abs(g.vx);
      else g.vy = dy > 0 ? Math.abs(g.vy) : -Math.abs(g.vy);
      g.speed = Math.min(MAX_SPEED, g.speed + 0.12);
      const k = g.speed / Math.hypot(g.vx, g.vy);
      g.vx *= k;
      g.vy *= k;
      if (g.left === 0) g.phase = "won";
      return;
    }
  }
}
