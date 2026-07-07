import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js) – lastes én gang globalt fra root layout.
 * Bruker Next.js Script med strategy="afterInteractive" slik at målingen
 * ikke blokkerer første render. Kun vanlig GA4, ingen Tag Manager-container.
 */

const GA_MEASUREMENT_ID = "G-XG1P0ZCCWP";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
