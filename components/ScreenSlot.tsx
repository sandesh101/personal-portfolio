import Image, { type StaticImageData } from "next/image";

/**
 * One screenshot slot on the pale-blue panel. Pass `src` (an import or a /public path) to show a real
 * screen; without it the slot shows its [label] placeholder.
 */
export function ScreenSlot({
  label,
  src,
  alt = "",
  className = "",
  parallax,
}: {
  label: string;
  src?: string | StaticImageData;
  alt?: string;
  className?: string;
  /** Drift in % of its own height across the viewport (GSAP, see PageAnimations). */
  parallax?: number;
}) {
  return (
    <div
      data-parallax={parallax}
      className={`relative overflow-hidden rounded-md border border-line bg-bg font-mono text-[11px] text-muted ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 20vw, 40vw"
          className="object-cover"
        />
      ) : (
        <span className="flex justify-center pt-3.5">[{label}]</span>
      )}
    </div>
  );
}
