import Link from "next/link";
import { SERVICES_PATH } from "@/lib/site";

const items = [
  {
    title: "Mobile apps",
    body: "Flutter apps for Android and iOS, with predictable state and a clean architecture.",
    fit: "You need an app built from design to the Play Store.",
  },
  {
    title: "Backends and APIs",
    body: "NestJS APIs with clear modules, validated input, solid auth and consistent data.",
    fit: "Your app needs a server that's easy to extend.",
  },
  {
    title: "Both halves",
    body: "The app and the server from one person, so nothing gets lost between them.",
    fit: "You're a small team or starting a product.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-h"
      className="scroll-mt-16 border-t border-line py-[clamp(64px,9vw,96px)]"
    >
      <div className="wrap">
        <p data-reveal className="mono-label">
          02 — What I take on
        </p>
        <h2
          data-reveal
          id="services-h"
          className="mt-3 text-[clamp(36px,4.6vw,64px)] leading-[1.02] font-semibold tracking-[-0.03em]"
        >
          Three ways to work together.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              className="flex flex-col gap-4 rounded-md border border-line p-7"
            >
              <p className="mono-label">0{i + 1}</p>
              <h3 className="text-[clamp(26px,2.4vw,32px)] leading-[1.15] font-medium tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="text-[17px]">{s.body}</p>
              <div className="mt-auto border-t border-line pt-4">
                <p className="mono-label">Good fit if</p>
                <p className="mt-1.5 text-[15px] text-muted">{s.fit}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          data-reveal
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <a href="#contact" className="btn btn-solid">
            Tell me about your project →
          </a>
          <Link href={SERVICES_PATH} className="btn btn-outline">
            Mobile app development in Nepal
          </Link>
          {/* <span className="text-muted">Also open to full-time roles.</span> */}
        </div>
      </div>
    </section>
  );
}
