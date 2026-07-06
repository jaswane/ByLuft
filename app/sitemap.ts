import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { citySlugs } from "@/data/cities";

/**
 * Sitemap. Inkluderer kun offentlige innholdssider.
 * Tekniske ruter (API, o.l.) er bevisst utelatt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "/",
    "/byer",
    "/luftkvalitet",
    "/svevestov",
    "/no2",
    "/ozon",
    "/helse",
    "/om",
    "/kilder",
    "/personvern",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const cityEntries: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: absoluteUrl(`/luftkvalitet/${slug}`),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticEntries, ...cityEntries];
}
