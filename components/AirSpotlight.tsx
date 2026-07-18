import Link from "next/link";
import type { AirSpotlightContent } from "@/data/airSpotlights";
import type { AqiLevel } from "@/lib/airquality/aqi";
import { aqiLevels } from "@/lib/airquality/aqi";

/**
 * Kompakt, server-rendret spotlight som settes rett etter hovedstatuskortet
 * på bysidene. Skal utfylle kortet (forklaring + relevante lenker), ikke
 * gjenta tallene eller konkurrere visuelt med det.
 *
 * Aksentfargen styres av faktisk AqiLevel (sendt separat fra innholds-
 * nøkkelen, siden f.eks. en pollutant-variant kan representere nivå 2, 3
 * eller 4). Uten nivå brukes nøytral aksent. Farge brukes aldri alene som
 * meningsbærer – tekstene bærer innholdet.
 */
export function AirSpotlight({
  content,
  level,
  placeName,
}: {
  content: AirSpotlightContent;
  level: AqiLevel | null;
  placeName?: string;
}) {
  const accent = level ? aqiLevels[level].colorVar : "var(--level-unknown)";

  return (
    <section
      aria-labelledby="air-spotlight-heading"
      className="rounded-xl border border-border bg-surface p-5"
      style={{ borderLeftWidth: 4, borderLeftColor: accent }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {content.eyebrow}
        {placeName ? ` · ${placeName}` : ""}
      </p>
      <h2
        id="air-spotlight-heading"
        className="mt-1 text-base font-semibold text-foreground"
      >
        {content.title}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {content.description}
      </p>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
        {content.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-medium text-accent hover:text-accent-hover"
            >
              {link.label} →
            </Link>
          </li>
        ))}
      </ul>

      {content.notice && (
        <p className="mt-3 border-t border-border pt-2.5 text-xs text-muted">
          {content.notice}
        </p>
      )}
    </section>
  );
}
