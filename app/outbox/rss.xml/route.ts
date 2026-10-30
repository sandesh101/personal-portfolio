import { getPosts } from "@/lib/outbox";
import { EMAIL, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  // The layout sample is not a real message, so it stays out of the feed.
  const posts = getPosts().filter((p) => !p.sample);
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/outbox/${p.slug}`;
      return `    <item>
      <title>${esc(`${p.id} ${p.title}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(p.channel)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Outbox — Sandesh Rimal</title>
    <link>${SITE_URL}/outbox</link>
    <description>Notes on Flutter, NestJS and teaching code. Every post is sent like a message.</description>
    <language>en</language>
    <managingEditor>${EMAIL} (Sandesh Rimal)</managingEditor>
    <atom:link href="${SITE_URL}/outbox/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
