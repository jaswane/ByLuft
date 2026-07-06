import Link from "next/link";
import { Container } from "./Container";

const nav = [
  { href: "/byer", label: "Byer" },
  { href: "/luftkvalitet", label: "Luftkvalitet" },
  { href: "/svevestov", label: "Svevestøv" },
  { href: "/helse", label: "Helse" },
  { href: "/kilder", label: "Kilder" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg tracking-tight"
          aria-label="ByLuft.no – til forsiden"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white text-sm font-bold"
          >
            BL
          </span>
          <span>
            By<span className="text-accent">Luft</span>
          </span>
        </Link>

        <nav aria-label="Hovedmeny" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent-hover"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kompakt meny på mobil */}
        <nav aria-label="Hovedmeny (mobil)" className="md:hidden">
          <ul className="flex items-center gap-1 text-sm">
            <li>
              <Link
                href="/byer"
                className="rounded-md px-3 py-2 text-muted hover:bg-accent-soft hover:text-accent-hover"
              >
                Byer
              </Link>
            </li>
            <li>
              <Link
                href="/luftkvalitet"
                className="rounded-md px-3 py-2 text-muted hover:bg-accent-soft hover:text-accent-hover"
              >
                Guide
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
