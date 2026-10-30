import { EMAIL, ext, LINKS } from "@/lib/site";
import { ContactForm } from "../ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-ink py-[clamp(64px,9vw,128px)]"
    >
      <div className="wrap">
        <p data-reveal className="mono-label">
          04 — Contact
        </p>
        <h2
          data-reveal
          className="mt-3.5 text-[clamp(46px,8vw,120px)] leading-none font-semibold tracking-[-0.04em]"
        >
          Send me a{" "}
          <span
            lang="ne"
            className="font-deva font-extrabold tracking-normal text-accent"
          >
            सन्देश
          </span>
          .
        </h2>
        <div className="mt-[clamp(36px,5vw,64px)] flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-10">
          <div
            data-reveal
            className="flex min-w-0 flex-[1_1_340px] flex-col gap-3"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-11 items-center text-[clamp(22px,2.6vw,34px)] font-medium tracking-[-0.02em] [overflow-wrap:anywhere] underline decoration-1 underline-offset-[6px]"
            >
              {EMAIL}
            </a>
            <p className="text-muted">
              I read every message and usually reply within a day.
            </p>
            <div className="mt-2 flex flex-wrap gap-2.5">
              <a
                href={LINKS.linkedin}
                {...ext(LINKS.linkedin)}
                className="btn btn-outline"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
          <div data-reveal className="min-w-0 flex-[1_1_420px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
