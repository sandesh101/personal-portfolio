import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
// Outbox and the case study are hidden for now, so they stay out of the sitemap.
// To bring them back, restore the imports and entries below.
// import { getPosts } from "@/lib/outbox";

// Needed when the site is exported as static files.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // const posts = getPosts()
  //   .filter((p) => !p.sample)
  //   .map((p) => ({
  //     url: `${SITE_URL}/outbox/${p.slug}`,
  //     lastModified: new Date(`${p.date}T00:00:00Z`),
  //   }));
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    // { url: `${SITE_URL}/work/chynabazar`, changeFrequency: "yearly", priority: 0.8 },
    // { url: `${SITE_URL}/outbox`, changeFrequency: "weekly", priority: 0.7 },
    // ...posts,
  ];
}
