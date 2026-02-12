/**
 * JSON-LD Schema for Jeffrey Epstein Photography.
 * Defines LocalBusiness + Photographer in Sydney, Australia to disambiguate
 * from unrelated public figures and improve search visibility.
 */
export function PhotographerSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    "@id": "https://jeffreyepsteinphotography.com.au/#organization",
    name: "Jeffrey Epstein Photography",
    description:
      "Commercial and portrait photographer based in Sydney, Australia. Specialising in corporate headshots, editorial photography, and portrait sessions.",
    url: "https://jeffreyepsteinphotography.com.au",
    image: "https://jeffreyepsteinphotography.com.au/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -33.8688,
        longitude: 151.2093,
      },
      geoRadius: "50000",
    },
    knowsAbout: [
      "Commercial Photography",
      "Portrait Photography",
      "Corporate Headshots",
      "Editorial Photography",
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
