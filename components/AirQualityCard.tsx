import type { City } from "@/data/cities";
import type { AirQualityResult } from "@/lib/airquality/types";
import { aqiLevels, unknownLevel } from "@/lib/airquality/aqi";
import { formatDateTime } from "@/lib/format";
import { AqiBadge } from "./AqiBadge";

/**
 * Statuskort for en by. Viser samlet nivå og komponenter hvis data finnes,
 * ellers en ærlig melding om at data ikke er tilgjengelig akkurat nå.
 * Hardkoder aldri en "live"-verdi når data mangler.
 */
export function AirQualityCard({
  city,
  result,
}: {
  city: City;
  result: AirQualityResult;
}) {
  const hasData = result.ok && result.overallLevel !== null;
  const info = result.overallLevel
    ? aqiLevels[result.overallLevel]
    : unknownLevel;
  const forecastTime = formatDateTime(result.time);
  const updated = formatDateTime(result.reftime);

  return (
    <section
      aria-labelledby="status-heading"
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      <div
        className="p-6 sm:p-8"
        style={{ backgroundColor: info.softColorVar }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted">
              Luftkvalitetsvarsel for {city.name}
            </p>
            <h2
              id="status-heading"
              className="mt-1 flex items-center gap-2 text-2xl font-bold"
              style={{ color: hasData ? info.colorVar : "var(--foreground)" }}
            >
              <span aria-hidden="true">{info.symbol}</span>
              {info.label}
            </h2>
            <p className="mt-1 text-sm text-muted">{info.riskShort}</p>
          </div>
        </div>

        <p className="mt-4 max-w-prose text-sm text-foreground/90">
          {info.description}
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {hasData ? (
          <>
            <h3 className="text-sm font-semibold text-foreground">
              Viktigste komponenter
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {result.components.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <span className="font-medium">{c.label}</span>
                    <span className="ml-2 text-sm text-muted">
                      {c.concentration !== null
                        ? `${c.concentration.toLocaleString("nb-NO")} ${c.unit}`
                        : "–"}
                    </span>
                  </div>
                  <AqiBadge level={c.level} size="sm" />
                </li>
              ))}
            </ul>

            <dl className="mt-5 grid gap-1 text-sm text-muted sm:grid-cols-2">
              {forecastTime && (
                <div className="flex gap-2">
                  <dt className="font-medium text-foreground">Gjelder for:</dt>
                  <dd>{forecastTime}</dd>
                </div>
              )}
              {updated && (
                <div className="flex gap-2">
                  <dt className="font-medium text-foreground">
                    Varsel oppdatert:
                  </dt>
                  <dd>{updated}</dd>
                </div>
              )}
            </dl>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-background p-5">
            <p className="font-medium text-foreground">
              Vi har ikke oppdaterte data for {city.name} akkurat nå
            </p>
            <p className="mt-2 text-sm text-muted">
              Vi klarte ikke å hente et ferskt luftkvalitetsvarsel i dette
              øyeblikket. Vi viser ingen gjettede tall. Prøv igjen senere, eller
              sjekk den offisielle kilden. Forklaringene og de typiske lokale
              kildene nedenfor gjelder uansett.
            </p>
          </div>
        )}

        <p className="mt-4 border-t border-border pt-3 text-sm text-muted">
          Dette er et beregnet varsel fra MET Norway, ikke en måling på ditt
          eksakte sted. Luftkvaliteten kan variere lokalt innen samme by – for
          eksempel er lufta ofte dårligere rett ved en trafikkert vei enn i en
          park.
        </p>
      </div>
    </section>
  );
}
