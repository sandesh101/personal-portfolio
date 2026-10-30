const front = [
  ["Flutter, Dart", "Android · iOS"],
  ["Bloc, Riverpod", "state"],
  ["Clean Architecture", "feature-first"],
  ["Firebase", "auth · push"],
  ["Figma to UI", "handoff"],
];
const back = [
  ["NestJS, Node.js, Express", "TypeScript"],
  ["REST APIs", "DTOs · guards"],
  ["MongoDB, MySQL", "data"],
  ["SuperTokens auth", "security"],
  ["Modular monolith", "architecture"],
];

function Column({
  title,
  blurb,
  items,
  side,
}: {
  title: string;
  blurb: string;
  items: string[][];
  side: "left" | "right";
}) {
  return (
    <div
      data-reveal
      className={`min-w-0 flex-[1_1_380px] pb-10 ${
        side === "left"
          ? "pr-[clamp(0px,3vw,48px)]"
          : "border-l border-inv-line pl-[clamp(0px,3vw,48px)] max-[800px]:border-l-0 max-[800px]:pl-0"
      }`}
    >
      <h3 className="text-[clamp(24px,2.4vw,32px)] font-medium tracking-[-0.02em]">
        {title}
      </h3>
      <p className="mt-3 max-w-[460px] text-inv-muted">{blurb}</p>
      <ul className="mt-6 border-t border-inv-line">
        {items.map(([k, v]) => (
          <li
            key={k}
            className="flex justify-between gap-4 border-b border-inv-line py-3"
          >
            <span>{k}</span>
            <span className="text-right font-mono text-xs text-inv-muted">
              {v}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="sides-h"
      className="on-navy scroll-mt-16 bg-navy py-[clamp(64px,9vw,128px)] text-navy-fg"
    >
      <div className="wrap">
        <p data-reveal className="mono-label !text-inv-muted">
          02 — Stack
        </p>
        <h2
          data-reveal
          id="sides-h"
          className="mt-3 text-[clamp(34px,4.6vw,64px)] leading-[1.02] font-medium tracking-[-0.03em]"
        >
          Two sides of one product.
        </h2>
        <div className="mt-[clamp(36px,5vw,64px)] flex flex-wrap">
          <Column
            side="left"
            title="On the screen"
            blurb="Mobile-first apps in Flutter, with predictable state and a clean architecture, that stay fast on a mid-range Android phone."
            items={front}
          />
          <Column
            side="right"
            title="Behind it"
            blurb="APIs in Node.js, with clear module boundaries, validated input, solid auth and consistent data."
            items={back}
          />
        </div>
        <p className="mt-2 font-mono text-xs text-inv-muted">
          Also: Git · Docker · Postman · Figma · Xcode · Linux
        </p>
      </div>
    </section>
  );
}
