import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";

const footerNav = [
  { href: "/byer", label: "Byer" },
  { href: "/luftkvalitet", label: "Luftkvalitet forklart" },
  { href: "/svevestov", label: "Svevestøv (PM2.5 og PM10)" },
  { href: "/no2", label: "Nitrogendioksid (NO₂)" },
  { href: "/ozon", label: "Bakkenær ozon (O₃)" },
  { href: "/helse", label: "Helse og luftkvalitet" },
];

const aboutNav = [
  { href: "/om", label: "Om ByLuft.no" },
  { href: "/kilder", label: "Kilder og data" },
  { href: "/personvern", label: "Personvern" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="font-semibold text-lg">
              By<span className="text-accent">Luft</span>.no
            </div>
            <p className="mt-2 text-sm text-muted">
              Luftkvalitet i norske byer, forklart enkelt og basert på offentlige
              kilder.
            </p>
          </div>

          <nav aria-label="Emner" className="text-sm">
            <h2 className="mb-3 font-semibold text-foreground">Emner</h2>
            <ul className="space-y-2 text-muted">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent-hover">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Om nettstedet" className="text-sm">
            <h2 className="mb-3 font-semibold text-foreground">Om nettstedet</h2>
            <ul className="space-y-2 text-muted">
              {aboutNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent-hover">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://uvindex.no"
                  rel="noopener"
                  className="hover:text-accent-hover"
                >
                  UV-indeks og solbeskyttelse – UVindex.no
                </a>
              </li>
            </ul>
          </nav>

          <div className="text-sm">
            <h2 className="mb-3 font-semibold text-foreground">Viktig</h2>
            <p className="text-muted">
              ByLuft.no er ikke en offentlig tjeneste og gir ikke medisinske råd.
              Ved akutte helseplager, kontakt lege eller ring 113.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Et prosjekt fra{" "}
            <a
              href={site.publisherUrl}
              className="font-medium text-accent hover:text-accent-hover"
              rel="noopener"
            >
              Swane Creative
            </a>
          </p>
          <p>© {new Date().getFullYear()} ByLuft.no</p>
        </div>
      </Container>
    </footer>
  );
}
