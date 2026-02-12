const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function withBase(path: string) {
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

type ScrapedContent = {
  hero: { title: string; subtitle: string };
  about: { text: string };
  gallery: Array<{ src: string; alt: string; category: string }>;
};

const DEFAULT_CONTENT: ScrapedContent = {
  hero: {
    title: "Capturing Architecture & Life.",
    subtitle: "Sydney based Commercial & Portrait Photography.",
  },
  about: {
    text: "Jeffrey Epstein is a commercial and portrait photographer based in Sydney, Australia. With over a decade of experience capturing the built environment and the people who inhabit it, his work sits at the intersection of architectural precision and intimate human connection. He is drawn to clean lines, natural light, and the quiet moments that reveal character in both spaces and faces.\n\nWhether shooting corporate headshots for Sydney-based brands or editorial portraits for local publications, Jeffrey brings a consistent editorial eye and a collaborative approach to every project. His photography has been featured in campaigns across Australia and internationally, and he continues to work with architects, designers, and creative professionals throughout the Sydney region.",
  },
  gallery: [
    { src: "/images/portfolio/entombment.jpg", alt: "Entombment – editorial photography", category: "Architecture" },
    { src: "/images/portfolio/marvel.jpg", alt: "Marvel – portrait work", category: "Portrait" },
    { src: "/images/portfolio/VictoryEdit.jpg", alt: "Victory – commercial photography", category: "Commercial" },
  ],
};

import scrapedContentRaw from "./scraped_content.json";

const content: ScrapedContent =
  scrapedContentRaw && typeof scrapedContentRaw === "object" && "hero" in scrapedContentRaw
    ? (scrapedContentRaw as ScrapedContent)
    : DEFAULT_CONTENT;

export const SITE_CONTENT = {
  hero: {
    image: withBase("/images/hero/Creation_of_Jeffrey600x1200.jpg"),
    title: content.hero?.title || DEFAULT_CONTENT.hero.title,
    subtitle: content.hero?.subtitle || DEFAULT_CONTENT.hero.subtitle,
  },
  about: {
    image: withBase("/images/about/IncredulityofJeffreyLowRes.jpg"),
    text: content.about?.text || DEFAULT_CONTENT.about.text,
  },
  gallery: (content.gallery?.length ? content.gallery : DEFAULT_CONTENT.gallery).map(
    (item, i) => ({
      id: i + 1,
      src: withBase(item.src.startsWith("/") ? item.src : `/${item.src}`),
      alt: item.alt || "Portfolio image",
      category: item.category || "Portrait",
    })
  ),
} as const;
