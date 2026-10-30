import { KtmClock } from "../KtmClock";

export function StatusBar() {
  return (
    // id="top" lives here, not on the sticky header: a stuck header is always "at the top", so a link to it goes nowhere.
    <div
      id="top"
      className="border-b border-line font-mono text-xs leading-none text-muted"
    >
      <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-1.5 py-2.5 tracking-[0.04em] uppercase">
        <span>
          Kathmandu, Nepal · <KtmClock /> NPT
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-[7px] bg-ok" />
          Open to freelance and full-time
        </span>
      </div>
    </div>
  );
}
