import Image from "next/image";

/** A phone: dark bezel and a small notch around a screenshot cropped to a phone-shaped box. */
export function PhoneFrame({
  src,
  alt,
  sizes,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-[2rem] bg-[#0b0b0c] p-[7px] ${className}`}>
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute top-0 left-1/2 z-10 h-[13px] w-[34%] -translate-x-1/2 rounded-b-xl bg-[#0b0b0c]"
        />
        <div className="relative aspect-[720/1256] overflow-hidden rounded-[1.6rem] bg-bg">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

/** A browser window: three dots, a label where the address would be, then the content. */
export function BrowserFrame({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-lg border border-ink bg-bg ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-fill px-3.5 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="block size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="block size-2.5 rounded-full bg-[#febc2e]" />
          <i className="block size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-bg px-3 py-1 text-center font-mono text-[11px] text-muted">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
