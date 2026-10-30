import Link from "next/link";

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-2.5">
      <span
        lang="ne"
        className="font-deva text-[21px] leading-none font-bold text-accent"
      >
        सन्देश
      </span>
      <span className="text-[15px] font-medium whitespace-nowrap max-[369px]:hidden">
        Sandesh Rimal
      </span>
    </Link>
  );
}
