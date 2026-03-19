import { useEffect } from "react";

const SITE_URL = "https://danno-software.com";
const SITE_NAME = "株式会社団野ソフトウェア";
const DEFAULT_OG_IMAGE = `${SITE_URL}/ogp.png`;

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute("content", content);
  }
}

function setOrCreateLink(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function setOrCreateMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function removeMeta(name: string) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  if (meta) meta.remove();
}

export function usePageMeta(
  title: string,
  description: string,
  path?: string,
  options?: { noindex?: boolean }
) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    const url = path ? `${SITE_URL}${path}` : SITE_URL;

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', fullTitle);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[property="og:type"]', "website");
    setMetaContent('meta[property="og:image"]', DEFAULT_OG_IMAGE);

    if (options?.noindex) {
      setOrCreateMeta("robots", "noindex, nofollow");
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.remove();
    } else {
      removeMeta("robots");
      setOrCreateLink("canonical", url);
    }
  }, [title, description, path, options?.noindex]);
}
