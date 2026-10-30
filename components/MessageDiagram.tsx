"use client";

import { motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

// Lane centres, as a percentage of the diagram width: App, API, Database.
const A = 16.667;
const B = 50;
const C = 83.333;

type Step =
  { from: number; to: number; label: string } | { self: true; label: string };

const SEQ: Step[] = [
  { from: A, to: B, label: "POST /v1/messages" },
  { self: true, label: "AuthGuard ✓" },
  { self: true, label: "ValidationPipe ✓" },
  { from: B, to: C, label: "insertOne()" },
  { from: C, to: B, label: "acknowledged" },
  { from: B, to: A, label: "201 Created" },
];

// Each line lists the steps during which it is highlighted.
const DART: [string, number[]][] = [
  ["on<MessageSent>((event, emit) async {", []],
  ["  emit(MessageSending());", [1]],
  ["  final res = await api.post(", [1]],
  ["    '/v1/messages',", [1]],
  ["    data: {'body': event.text},", [1]],
  ["  );", []],
  ["  emit(MessageDelivered(res.data['id']));", [6]],
  ["});", []],
];

const TS: [string, number[]][] = [
  ["@UseGuards(AuthGuard)", [2]],
  ["@Post('messages')", [1]],
  ["create(@Body() dto: CreateMessageDto) {", [3]],
  ["  return this.messages.create(dto);", [4, 5]],
  ["}", [6]],
];

const REDUCED = "(prefers-reduced-motion: reduce)";
const noopSubscribe = () => () => {};
const subscribeMotion = (cb: () => void) => {
  const mq = matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => matchMedia(REDUCED).matches,
    () => true,
  );
}

export function MessageDiagram() {
  // null = not pressed yet. The static HTML shows the finished state, which is what no-JS
  // and reduced-motion visitors get; with JS and motion allowed it starts at Draft.
  const [pressed, setPressed] = useState<number | null>(null);
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const step = pressed ?? (hydrated && !reduced ? 0 : 6);
  const animated = hydrated && !reduced;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function send() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduced) return setPressed(6);
    setPressed(1);
    [2, 3, 4, 5, 6].forEach((s, i) => {
      timers.current.push(setTimeout(() => setPressed(s), 700 * (i + 1)));
    });
  }

  const status = step === 0 ? "Draft" : step < 6 ? "Sending…" : "Delivered ✓";
  const statusColor =
    step === 0 ? "var(--muted)" : step < 6 ? "var(--wait)" : "var(--ok)";
  const sendLabel =
    step > 0 && step < 6
      ? "Sending…"
      : step === 6 && pressed !== null
        ? "Send again"
        : null;

  const rows = SEQ.map((s, i) => {
    const n = i + 1;
    const final = n === 6 && step === 6;
    const done = n < step || final;
    const cur = n === step && step !== 6;
    const pending = n > step;
    const color = final
      ? "var(--ok)"
      : cur
        ? "var(--wait)"
        : done
          ? "var(--ink)"
          : "var(--muted)";
    const kind = pending ? "dashed" : "solid";
    const weight = cur || final ? "2px" : "1px";
    return { s, color, kind, weight, pending };
  });

  const mark = (steps: number[]): CSSProperties => {
    if (!steps.includes(step)) return { padding: "0 16px", whiteSpace: "pre" };
    const col = step === 6 && steps.includes(6) ? "var(--ok)" : "var(--wait)";
    return {
      padding: "0 16px",
      whiteSpace: "pre",
      background: "var(--hl)",
      boxShadow: `inset 3px 0 0 ${col}`,
    };
  };

  const laneBox =
    "w-full max-w-[200px] rounded-md border border-ink bg-bg px-3 py-2.5";

  return (
    <div data-diagram data-ready={hydrated}>
      <div
        data-reveal
        className="flex flex-wrap items-end justify-between gap-5"
      >
        <div className="min-w-0 flex-[1_1_520px]">
          <p className="mono-label">How a message travels</p>
          <h2
            id="wire-h"
            className="mt-2.5 text-[clamp(32px,4vw,52px)] leading-[1.05] font-medium tracking-[-0.025em]"
          >
            Both ends of the wire are mine.
          </h2>
          <p className="mt-3.5 max-w-[620px] text-muted">
            One message, start to finish. Press send and follow it from the
            Flutter app to the NestJS API and the database, then back as a
            delivery receipt. The code below is what I write at each end.
          </p>
        </div>
        <button
          type="button"
          onClick={send}
          className="btn btn-send js-only text-[15px]"
        >
          {sendLabel ?? (
            <>
              Send{" "}
              <span lang="ne" className="font-deva mx-1 font-bold">
                नमस्ते
              </span>{" "}
              →
            </>
          )}
        </button>
      </div>

      <div
        data-reveal
        className="mt-9 rounded-md border border-ink px-[clamp(8px,2vw,24px)] pt-[clamp(16px,3vw,32px)] pb-[clamp(16px,2vw,24px)]"
      >
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center px-1 text-center">
            <div className={laneBox}>
              <p className="text-[15px] leading-tight font-semibold">App</p>
            </div>
            <p
              role="status"
              className="mt-2.5 font-mono text-xs font-medium"
              style={{ color: statusColor }}
            >
              {status}
            </p>
          </div>
          <div className="flex flex-col items-center px-1 text-center">
            <div className={laneBox}>
              <p className="text-[15px] leading-tight font-semibold">API</p>
            </div>
          </div>
          <div className="flex flex-col items-center px-1 text-center">
            <div className={laneBox}>
              <p className="text-[15px] leading-tight font-semibold">
                Database
              </p>
            </div>
          </div>
        </div>

        <div
          role="img"
          aria-label={`Sequence diagram. The app posts a message to the API; the API checks the auth guard and validation pipe, writes to the database, gets an acknowledgement, and returns 201 Created to the app. Current state: ${status}`}
          className="relative mt-2"
        >
          {[A, B, C].map((x) => (
            <div
              key={x}
              aria-hidden="true"
              className="absolute top-0 bottom-0 border-l border-dashed border-muted"
              style={{ left: `${x}%` }}
            />
          ))}
          {rows.map(({ s, color, kind, weight, pending }, i) => (
            <div key={i} className="relative h-[58px]">
              {"self" in s ? (
                <span
                  className="absolute top-3.5 left-1/2 -translate-x-1/2 rounded-md bg-bg px-2.5 py-1 font-mono text-xs font-medium whitespace-nowrap"
                  style={{ border: `${weight} ${kind} ${color}`, color }}
                >
                  {s.label}
                </span>
              ) : (
                <Arrow
                  from={s.from}
                  to={s.to}
                  label={s.label}
                  color={color}
                  kind={kind}
                  weight={weight}
                  pending={pending}
                  animated={animated}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1.5 font-mono text-[11px] text-muted">
          <span>
            payload: {"{"} body: &quot;
            <span lang="ne" className="font-deva">
              नमस्ते
            </span>
            !&quot; {"}"}
          </span>
          <span>solid = done · blue = in flight · dashed = waiting</span>
        </div>
      </div>

      <div data-reveal className="mt-4 flex flex-wrap gap-4">
        <CodePanel
          title="This end"
          file="message_bloc.dart"
          lang="Dart"
          lines={DART}
          mark={mark}
        />
        <CodePanel
          title="That end"
          file="messages.controller.ts"
          lang="TypeScript"
          lines={TS}
          mark={mark}
        />
      </div>
      <p className="mt-3 text-[13px] text-muted">
        Simplified from the patterns I use in production. Highlighted lines run
        at the current step.
      </p>
    </div>
  );
}

function Arrow({
  from,
  to,
  label,
  color,
  kind,
  weight,
  pending,
  animated,
}: {
  pending: boolean;
  animated: boolean;
  from: number;
  to: number;
  label: string;
  color: string;
  kind: string;
  weight: string;
}) {
  const left = Math.min(from, to);
  const width = Math.abs(to - from);
  const right = to > from;
  const head: CSSProperties = {
    position: "absolute",
    top: -5.5,
    width: 0,
    height: 0,
    borderTop: "5px solid transparent",
    borderBottom: "5px solid transparent",
    ...(right
      ? { right: -1, borderLeft: `8px solid ${color}` }
      : { left: -1, borderRight: `8px solid ${color}` }),
  };
  return (
    <>
      <span
        className="absolute top-2 overflow-hidden px-0 text-center font-mono text-[10px] font-medium tracking-[-0.05em] text-ellipsis whitespace-nowrap min-[480px]:px-1.5 min-[480px]:text-xs min-[480px]:tracking-normal"
        style={{ left: `${left}%`, width: `${width}%`, color }}
      >
        {label}
      </span>
      <span
        className="absolute top-9 h-0"
        style={{ left: `${left}%`, width: `${width}%` }}
      >
        {/* The line draws itself from the sending end when its step starts. */}
        <motion.span
          key={pending ? "waiting" : "sent"}
          className="absolute inset-x-0 top-0 block h-0"
          style={{
            borderTop: `${weight} ${kind} ${color}`,
            originX: right ? 0 : 1,
          }}
          initial={animated && !pending ? { scaleX: 0 } : false}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
        <motion.span
          key={pending ? "waiting-head" : "sent-head"}
          style={head}
          initial={animated && !pending ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: 0.45 }}
        />
      </span>
    </>
  );
}

function CodePanel({
  title,
  file,
  lang,
  lines,
  mark,
}: {
  title: string;
  file: string;
  lang: string;
  lines: [string, number[]][];
  mark: (steps: number[]) => CSSProperties;
}) {
  return (
    <div className="min-w-0 flex-[1_1_440px] overflow-hidden rounded-md border border-line">
      <div className="flex justify-between gap-3 border-b border-line bg-fill px-4 py-2.5 font-mono text-xs text-muted">
        <span>
          <span className="font-medium text-ink">{title}</span> · {file}
        </span>
        <span>{lang}</span>
      </div>
      <div className="overflow-x-auto py-3 font-mono text-xs leading-[1.85] sm:text-[13px]">
        {lines.map(([code, steps], i) => (
          <div key={i} style={mark(steps)}>
            <span className="mr-4 inline-block w-7 text-right text-muted">
              {i + 1}
            </span>
            {code}
          </div>
        ))}
      </div>
    </div>
  );
}
