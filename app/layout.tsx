import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { CookieConsent } from "@/components/CookieConsent";
import { websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // NB: ingen title.template her – pageMetadata() i lib/seo.ts setter komplette
  // titler selv. En template i tillegg ga dobbel «| ByLuft.no»-suffiks.
  title: `${site.name} – Luftkvalitet i norske byer`,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.publisher, url: site.publisherUrl }],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <JsonLd data={websiteJsonLd()} />
        <a
          href="#hovedinnhold"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Hopp til innhold
        </a>
        <SiteHeader />
        <main id="hovedinnhold" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
