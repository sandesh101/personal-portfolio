import { getPublishedPosts } from "@/lib/outbox";
import {
  CASE_STUDY_LIVE,
  CASE_STUDY_PATH,
  EMAIL,
  LINKS,
  SERVICES_PATH,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

export const dynamic = "force-static";

// Plain-text summary for AI tools (llms.txt). Same facts as the site, no JavaScript needed.
export function GET() {
  const posts = getPublishedPosts()
    .map((p) => `- [${p.title}](${SITE_URL}/outbox/${p.slug}): ${p.excerpt}`)
    .join("\n");
  const body = `# Sandesh Rimal

> ${SITE_DESCRIPTION}

Based in Kathmandu, Nepal. Contact: ${EMAIL}

## Services
- [Mobile app development in Nepal](${SITE_URL}${SERVICES_PATH}): Flutter apps for Android and iOS, plus NestJS and Node.js backends and APIs.
${CASE_STUDY_LIVE ? `\n## Work\n- [Chynabazar case study](${SITE_URL}${CASE_STUDY_PATH}): e-commerce platform with a Flutter app, a Next.js storefront and a NestJS backend.\n` : ""}${posts ? `\n## Writing (the Outbox)\n${posts}\n` : ""}
## Elsewhere
- [GitHub](${LINKS.github})
- [LinkedIn](${LINKS.linkedin})
- [TikTok](${LINKS.tiktok})
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
