import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Sti uten domene, f.eks. "/byer". Brukes til canonical + OG-url. */
  path: string;
  /** Sett false for sider som ikke skal indekseres. */
  index?: boolean;
}

/** Bygger konsistent metadata (title, description, canonical, OpenGraph) for en side. */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    path === "/" ? `${site.name} – Luftkvalitet i norske byer` : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

/** WebSite + Organization JSON-LD for forsiden. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "nb-NO",
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        description: site.description,
        parentOrganization: {
          "@type": "Organization",
          name: site.publisher,
          url: site.publisherUrl,
        },
      },
    ],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList JSON-LD. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage JSON-LD. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** DefinedTerm JSON-LD for forurensningskomponenter. */
export function definedTermJsonLd(term: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Luftkvalitet – begreper",
      url: absoluteUrl("/luftkvalitet"),
    },
  };
}
