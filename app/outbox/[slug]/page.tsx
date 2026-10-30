import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MiniFooter } from "@/components/Footers";
import { mdxComponents } from "@/components/mdx";
import { outlineLink, SimpleHeader } from "@/components/SimpleHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { formatDate, getHeadings, getPost, getPosts } from "@/lib/outbox";
import { EMAIL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/outbox/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    robots: post.sample ? { index: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

const dt = "py-2 font-mono text-xs leading-[1.9] text-muted";
const dd = "m-0 border-b border-line py-2";

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const all = getPosts();
  const i = all.findIndex((p) => p.slug === post.slug);
  const newer = all[i - 1];
  const older = all[i + 1];
  const headings = getHeadings(post.content);
  const reply = `mailto:${EMAIL}?subject=${encodeURIComponent(`Re: ${post.title}`)}`;

  return (
    <>
      <SimpleHeader>
        <Link href="/outbox" className={outlineLink}>
          ← Outbox
        </Link>
        <ThemeToggle />
      </SimpleHeader>

      <main id="main">
        <article className="pt-[clamp(32px,5vw,72px)] pb-[clamp(56px,7vw,96px)]">
          <div className="mx-auto max-w-[calc(1120px+2*clamp(20px,4vw,48px))] px-[clamp(20px,4vw,48px)]">
            {post.sample && (
              <p className="mb-3.5 font-mono text-xs text-muted">
                [Sample post: shows how a post looks. The text below is sample
                copy for layout.]
              </p>
            )}

            <div className="overflow-hidden rounded-md border border-ink">
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1.5 border-b border-line bg-fill px-5 py-2.5 font-mono text-xs text-muted">
                <span>
                  Message {post.id} · {post.route}
                </span>
                <span>{post.minutes} min read</span>
              </div>
              <dl className="m-0 grid grid-cols-[72px_minmax(0,1fr)] gap-x-4 px-5 pt-2 pb-1 text-[15px]">
                <dt className={dt}>From</dt>
                <dd className={dd}>
                  Sandesh Rimal{" "}
                  <span className="text-muted">&lt;{EMAIL}&gt;</span>
                </dd>
                <dt className={dt}>To</dt>
                <dd className={dd}>You</dd>
                <dt className={dt}>Sent</dt>
                <dd className={dd}>{formatDate(post.date)}</dd>
                <dt className={`${dt} !pt-3.5`}>Subject</dt>
                <dd className="m-0 pt-3 pb-[18px]">
                  <h1 className="text-[clamp(34px,5vw,64px)] leading-[1.04] font-semibold tracking-[-0.035em]">
                    {post.title}
                  </h1>
                </dd>
              </dl>
            </div>

            <div className="mt-[clamp(36px,5vw,64px)] flex flex-wrap items-start gap-x-[clamp(40px,6vw,88px)] gap-y-10">
              {headings.length > 0 && (
                <nav
                  aria-label="In this message"
                  className="sticky top-24 min-w-0 flex-[0_0_220px] text-sm"
                >
                  <p className="mono-label mb-2 !text-[11px]">
                    In this message
                  </p>
                  <ol className="border-t border-line">
                    {headings.map((h) => (
                      <li key={h.id} className="border-b border-line">
                        <a href={`#${h.id}`} className="block py-2.5">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="min-w-0 max-w-[680px] flex-[1_1_560px] text-lg leading-[1.75]">
                <div className="post">
                  <MDXRemote source={post.content} components={mdxComponents} />
                </div>

                <div className="mt-14 border-t border-ink pt-6">
                  <p className="font-mono text-[13px] text-muted">
                    End of message
                  </p>
                  <p className="mt-2.5">Sandesh</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-md border border-line p-5">
                    <div className="min-w-0">
                      <p className="font-medium">Reply to this message</p>
                      <p className="mt-0.5 text-[15px] leading-normal text-muted">
                        Questions, corrections or a better way? Replies go
                        straight to my inbox.
                      </p>
                    </div>
                    <a
                      href={reply}
                      className="btn btn-send h-11 px-[18px] text-[15px]"
                    >
                      Reply →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {(older || newer) && (
              <nav
                aria-label="More messages"
                className="mt-[clamp(56px,7vw,96px)] flex flex-wrap border-t border-ink"
              >
                {older ? (
                  <Link
                    href={`/outbox/${older.slug}`}
                    className="min-w-0 flex-[1_1_300px] border-b border-line py-6 pr-6"
                  >
                    <span className="block font-mono text-xs text-muted">
                      ← Older · {older.id}
                    </span>
                    <span className="mt-1.5 block text-xl font-medium tracking-[-0.01em]">
                      {older.title}
                    </span>
                  </Link>
                ) : (
                  <span className="flex-[1_1_300px]" />
                )}
                {newer && (
                  <Link
                    href={`/outbox/${newer.slug}`}
                    className="min-w-0 flex-[1_1_300px] border-b border-l border-line py-6 pl-6 text-right"
                  >
                    <span className="block font-mono text-xs text-muted">
                      Newer · {newer.id} →
                    </span>
                    <span className="mt-1.5 block text-xl font-medium tracking-[-0.01em]">
                      {newer.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </article>
      </main>

      <MiniFooter links={[{ label: "RSS", href: "/outbox/rss.xml" }]} />
    </>
  );
}
