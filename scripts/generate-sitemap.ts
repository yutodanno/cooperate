/**
 * ビルド時に sitemap.xml を自動生成するスクリプト。
 */
import { writeFileSync } from "fs";
import { join } from "path";

const SITE_URL = "https://danno-software.com";
const OUT_PATH = join(import.meta.dirname, "..", "public", "sitemap.xml");

interface PageEntry {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod: string;
}

const pages: PageEntry[] = [
  { loc: "/", changefreq: "monthly", priority: "1.0", lastmod: "2026-07-05" },
  { loc: "/about", changefreq: "monthly", priority: "0.8", lastmod: "2026-07-05" },
  { loc: "/services", changefreq: "monthly", priority: "0.8", lastmod: "2026-07-05" },
  { loc: "/contact", changefreq: "monthly", priority: "0.7", lastmod: "2026-07-05" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3", lastmod: "2026-07-05" },
];

function buildSitemap(entries: PageEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const xml = buildSitemap(pages);
writeFileSync(OUT_PATH, xml, "utf-8");
console.log(`sitemap.xml generated: ${pages.length} URLs`);
