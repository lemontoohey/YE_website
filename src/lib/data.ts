const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SITE_CONTENT = {
  hero: {
    image: `${base}/images/hero/Creation_of_Jeffrey600x1200.jpg`,
    title: "Capturing Architecture & Life.",
    subtitle: "Sydney based Commercial & Portrait Photography.",
  },
  about: {
    image: `${base}/images/about/IncredulityofJeffreyLowRes.jpg`,
    text: "Jeffrey Epstein is a commercial and portrait photographer based in Sydney, Australia. With over a decade of experience capturing the built environment and the people who inhabit it, his work sits at the intersection of architectural precision and intimate human connection. He is drawn to clean lines, natural light, and the quiet moments that reveal character in both spaces and faces.\n\nWhether shooting corporate headshots for Sydney-based brands or editorial portraits for local publications, Jeffrey brings a consistent editorial eye and a collaborative approach to every project. His photography has been featured in campaigns across Australia and internationally, and he continues to work with architects, designers, and creative professionals throughout the Sydney region.",
  },
  gallery: [
    {
      id: 1,
      src: `${base}/images/portfolio/entombment.jpg`,
      alt: "Entombment – editorial photography",
      category: "Architecture",
    },
    {
      id: 2,
      src: `${base}/images/portfolio/marvel.jpg`,
      alt: "Marvel – portrait work",
      category: "Portrait",
    },
    {
      id: 3,
      src: `${base}/images/portfolio/VictoryEdit.jpg`,
      alt: "Victory – commercial photography",
      category: "Commercial",
    },
  ] as const,
} as const;
