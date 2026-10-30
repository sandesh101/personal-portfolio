import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CHANNELS, type Channel } from "./channels";

export type PostMeta = {
  slug: string;
  id: string;
  title: string;
  channel: Channel;
  route: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  excerpt: string;
  minutes: number;
  /** Layout sample, not a real post. Kept out of the feed and the sitemap. */
  sample: boolean;
};
export type Post = PostMeta & { content: string };

const DIR = path.join(process.cwd(), "content/outbox");

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parse(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const { data, content } = matter(
    fs.readFileSync(path.join(DIR, file), "utf8"),
  );
  for (const key of ["id", "title", "channel", "route", "date", "excerpt"]) {
    if (!data[key])
      throw new Error(`content/outbox/${file}: missing frontmatter "${key}"`);
  }
  if (!CHANNELS.includes(data.channel)) {
    throw new Error(
      `content/outbox/${file}: channel must be one of ${CHANNELS.join(", ")}`,
    );
  }
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    id: String(data.id),
    title: String(data.title),
    channel: data.channel,
    route: String(data.route),
    date: String(data.date),
    excerpt: String(data.excerpt),
    minutes: Math.max(1, Math.round(words / 200)),
    sample: data.sample === true,
    content,
  };
}

/** Newest first. */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The h2s, for the "In this message" table of contents. Ignores fenced code. */
export function getHeadings(content: string) {
  const out: { id: string; text: string }[] = [];
  let fenced = false;
  for (const line of content.split("\n")) {
    if (line.trim().startsWith("```")) fenced = !fenced;
    const m = !fenced && /^##\s+(.+?)\s*$/.exec(line);
    if (m) out.push({ id: slugify(m[1]), text: m[1] });
  }
  return out;
}
