export function Hero() {
  return (
    <section className="pt-[clamp(28px,5vw,64px)]">
      <div className="wrap">
        <div
          data-hero="0"
          className="mono-label flex flex-wrap justify-between gap-x-6 gap-y-1.5"
        >
          <span>
            <span lang="ne" className="font-deva">
              सन्देश
            </span>{" "}
            · <span className="normal-case">/sən.deːʃ/</span> · noun, Nepali
          </span>
          <span>1. a message</span>
        </div>
        <p
          data-hero="1"
          lang="ne"
          role="img"
          aria-label="Sandesh, written in Devanagari"
          className="font-deva mt-[clamp(4px,1.5vw,16px)] text-[calc((100vw_-_2*clamp(20px,4vw,48px))_/_2.26)] sm:text-[clamp(116px,22vw,320px)] leading-[1.12] font-extrabold tracking-[-0.01em] text-accent"
        >
          सन्देश
        </p>
        <div
          data-hero-rule
          aria-hidden="true"
          className="mt-[clamp(4px,1.5vw,16px)] h-px bg-ink"
        />
        <div className="flex flex-wrap items-end gap-x-[clamp(32px,6vw,96px)] gap-y-7 pt-[clamp(24px,3vw,40px)]">
          <h1
            data-hero="2"
            className="min-w-0 flex-[2_1_520px] text-[clamp(34px,4.4vw,60px)] leading-[1.08] font-medium tracking-[-0.025em]"
          >
            I build the apps that send messages and the servers that receive
            them.
          </h1>
          <div
            data-hero="3"
            className="flex min-w-0 flex-[1_1_280px] flex-col gap-5"
          >
            <p className="text-[17px] text-muted">
              Flutter developer and backend engineer in Kathmandu. I take mobile
              apps and the servers behind them from first screen to production.
              I&apos;m also a programming instructor.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a href="#work" className="btn btn-solid">
                See the work ↓
              </a>
              <a href="#contact" className="btn btn-outline">
                Send a message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
