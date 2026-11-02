"use client";

import { useEffect, useRef, useState } from "react";

/** Autoplaying showcase with a visible pause control; stays paused for reduced-motion visitors. */
export function ShowcaseVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
    }
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  }

  return (
    <div role="group" aria-label="Chynabazar showcase video">
      <div className="overflow-hidden rounded-md bg-accent-tint">
        <video
          ref={ref}
          className="block aspect-[5/4] w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          poster="/work/chynabazar-storefront-wide.webp"
          aria-label="Chynabazar product showcase"
        >
          <source src="/work/chynabazar-showcase.mp4" type="video/mp4" />
        </video>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="mono-label mt-1 inline-flex min-h-11 cursor-pointer items-center border-0 bg-transparent"
      >
        {playing ? "Pause video" : "Play video"}
      </button>
    </div>
  );
}
