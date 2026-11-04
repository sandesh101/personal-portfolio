"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/work/chynabazar-showcase.mp4";

/**
 * Showcase video with a visible pause control. The file is not requested until the video is close to
 * the viewport (until then the poster shows), and it never autoplays for reduced-motion visitors.
 */
export function ShowcaseVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) return;
        v.src = SRC;
        void v.play();
      },
      { rootMargin: "300px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      if (!v.getAttribute("src")) v.src = SRC;
      void v.play();
    } else v.pause();
  }

  return (
    <div role="group" aria-label="Chynabazar showcase video">
      <div className="overflow-hidden rounded-md bg-accent-tint">
        <video
          ref={ref}
          className="block aspect-[5/4] w-full object-cover"
          loop
          muted
          playsInline
          preload="none"
          poster="/work/chynabazar-storefront-wide.webp"
          aria-label="Chynabazar product showcase"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
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
