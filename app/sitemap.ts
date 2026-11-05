import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/outbox";
import {
  CASE_STUDY_LIVE,
  CASE_STUDY_MODIFIED,
  CASE_STUDY_PATH,
  SERVICES_PATH,
  SITE_URL,
} from "@/lib/site";

// Needed when the site is exported as static files.
export const dynamic = "force-static";

// Bump this when the page content changes. A date that moves on every deploy is ignored by search engines.
const UPDATED = new Date("2026-11-04T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts().map((p) => ({
    url: `${SITE_URL}/outbox/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
  }));
  return [
    {
      url: SITE_URL,
      lastModified: UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${SERVICES_PATH}`,
      lastModified: UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...(CASE_STUDY_LIVE
      ? [
          {
            url: `${SITE_URL}${CASE_STUDY_PATH}`,
            lastModified: new Date(`${CASE_STUDY_MODIFIED}T00:00:00Z`),
            changeFrequency: "yearly" as const,
            priority: 0.8,
          },
        ]
      : []),
    ...(posts.length
      ? [
          { url: `${SITE_URL}/outbox`, lastModified: new Date(posts[0].lastModified), changeFrequency: "weekly" as const, priority: 0.7 },
          ...posts,
        ]
      : []),
  ];
}
