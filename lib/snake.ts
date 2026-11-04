export type P = { x: number; y: number };
export type Dir = "up" | "down" | "left" | "right";
export type Game = {
  cols: number;
  rows: number;
  snake: P[];
  dir: Dir;
  food: P;
  score: number;
  over: boolean;
};

const DELTA: Record<Dir, P> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
export const OPPOSITE: Record<Dir, Dir> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const same = (a: P, b: P) => a.x === b.x && a.y === b.y;

/** A random free cell, or an off-board cell when the snake fills the board. */
export function placeFood(
  snake: P[],
  cols: number,
  rows: number,
  rand: () => number = Math.random,
): P {
  const free: P[] = [];
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      if (!snake.some((s) => same(s, { x, y }))) free.push({ x, y });
  return free.length ? free[Math.floor(rand() * free.length)] : { x: -1, y: -1 };
}

/** A three-cell snake heading right from the middle of a cols × rows board (at least 8 × 8). */
export function newGame(
  cols: number,
  rows: number,
  rand: () => number = Math.random,
): Game {
  const x = Math.floor(cols / 2);
  const y = Math.floor(rows / 2);
  const snake = [
    { x, y },
    { x: x - 1, y },
    { x: x - 2, y },
  ];
  return {
    cols,
    rows,
    snake,
    dir: "right",
    food: placeFood(snake, cols, rows, rand),
    score: 0,
    over: false,
  };
}

/** Advance one tick. A reversal into the snake's own neck is ignored. */
export function step(
  g: Game,
  want: Dir,
  rand: () => number = Math.random,
): Game {
  if (g.over) return g;
  const dir = want === OPPOSITE[g.dir] ? g.dir : want;
  const head = { x: g.snake[0].x + DELTA[dir].x, y: g.snake[0].y + DELTA[dir].y };
  const ate = same(head, g.food);
  // The tail moves away this tick unless the snake grows, so it is not an obstacle.
  const body = ate ? g.snake : g.snake.slice(0, -1);
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= g.cols ||
    head.y >= g.rows ||
    body.some((s) => same(s, head))
  )
    return { ...g, dir, over: true };
  const snake = [head, ...body];
  return {
    ...g,
    snake,
    dir,
    food: ate ? placeFood(snake, g.cols, g.rows, rand) : g.food,
    score: g.score + (ate ? 1 : 0),
    over: false,
  };
}
