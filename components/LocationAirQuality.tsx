"use client";

import { useState } from "react";
import Link from "next/link";
import { aqiLevels, unknownLevel, type AqiLevel } from "@/lib/airquality/aqi";
import { formatDateTime } from "@/lib/format";
import { AqiBadge } from "./AqiBadge";

/**
 * «Min lokasjon»-verktøy. Ber om posisjon først når brukeren trykker på
 * knappen (aldri automatisk), henter beregnet luftkvalitetsvarsel fra MET via
 * vår interne API-rute, og viser et statuskort merket «Området ditt».
 * Posisjonen brukes kun til dette ene oppslaget og lagres ikke.
 */

interface LocationResult {
  ok: boolean;
  overallAqi: number | null;
  overallLevel: AqiLevel | null;
  time: string | null;
  reftime: string | null;
  locationName: string | null;
  locationPath: string | null;
  components: Array<{
    id: string;
    label: string;
    unit: string;
    concentration: number | null;
    aqi: number | null;
    level: AqiLevel | null;
  }>;
  message?: string;
}

type Status =
  | { state: "idle" }
  | { state: "locating" }
  | { state: "loading" }
  | { state: "denied" }
  | { state: "unsupported" }
  | { state: "error"; message: string }
  | { state: "success"; result: LocationResult };

export function LocationAirQuality({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function lookup(lat: number, lon: number) {
    setStatus({ state: "loading" });
    try {
      const res = await fetch(
        `/api/airquality/location?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}`,
      );
      const data = (await res.json()) as LocationResult & { message?: string };
      if (!res.ok) {
        setStatus({
          state: "error",
          message:
            data.message ??
            "Vi klarte ikke å hente varsel for posisjonen din. Prøv bysøket i stedet.",
        });
        return;
      }
      setStatus({ state: "success", result: data });
    } catch {
      setStatus({
        state: "error",
        message:
          "Vi klarte ikke å hente varsel for posisjonen din akkurat nå. Prøv igjen senere, eller bruk bysøket.",
      });
    }
  }

  function requestLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus({ state: "unsupported" });
      return;
    }
    setStatus({ state: "locating" });
    navigator.geolocation.getCurrentPosition(
      (pos) => lookup(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus({ state: "denied" });
        } else {
          setStatus({
            state: "error",
            message:
              "Vi fikk ikke tak i posisjonen din. Prøv igjen, eller bruk bysøket.",
          });
        }
      },
      { timeout: 10000, maximumAge: 300000 },
    );
  }

  const busy = status.state === "locating" || status.state === "loading";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={requestLocation}
          disabled={busy}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          <span aria-hidden="true">📍</span>
          {busy ? "Henter …" : "Min lokasjon"}
        </button>
        {!compact && (
          <p className="text-xs text-muted">
            Posisjonen brukes kun til å hente et beregnet luftkvalitetsvarsel
            fra MET, og lagres ikke.
          </p>
        )}
      </div>

      <div aria-live="polite">
        {status.state === "denied" && (
          <p className="mt-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
            Det er helt greit å ikke dele posisjon. Bruk søket eller{" "}
            <Link href="/byer" className="font-medium text-accent hover:text-accent-hover">
              velg et sted fra listen
            </Link>{" "}
            i stedet.
          </p>
        )}

        {status.state === "unsupported" && (
          <p className="mt-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
            Nettleseren din støtter ikke posisjon. Bruk søket eller{" "}
            <Link href="/byer" className="font-medium text-accent hover:text-accent-hover">
              stedslisten
            </Link>
            .
          </p>
        )}

        {status.state === "error" && (
          <p className="mt-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
            {status.message}
          </p>
        )}

        {status.state === "success" && <LocationCard result={status.result} />}
      </div>
    </div>
  );
}

function LocationCard({ result }: { result: LocationResult }) {
  const hasData = result.ok && result.overallLevel !== null;
  const info = result.overallLevel
    ? aqiLevels[result.overallLevel]
    : unknownLevel;
  const forecastTime = formatDateTime(result.time);
  const updated = formatDateTime(result.reftime);
  const areaLabel = result.locationPath
    ? result.locationPath.split("/").slice(1).join(", ")
    : result.locationName;

  return (
    <section
      aria-label="Luftkvalitetsvarsel for området ditt"
      className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      <div className="p-5" style={{ backgroundColor: info.softColorVar }}>
        <p className="text-sm font-medium text-muted">
          Området ditt{areaLabel ? ` · ${areaLabel}` : ""}
        </p>
        <p
          className="mt-1 flex items-center gap-2 text-xl font-bold"
          style={{ color: hasData ? info.colorVar : "var(--foreground)" }}
        >
          <span aria-hidden="true">{info.symbol}</span>
          {info.label}
        </p>
        <p className="mt-1 text-sm text-muted">{info.riskShort}</p>
      </div>

      <div className="p-5">
        {hasData ? (
          <>
            <ul className="grid gap-2 sm:grid-cols-2">
              {result.components.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <span>
                    <span className="font-medium">{c.label}</span>{" "}
                    <span className="text-muted">
                      {c.concentration !== null
                        ? `${c.concentration.toLocaleString("nb-NO")} ${c.unit}`
                        : "–"}
                    </span>
                  </span>
                  <AqiBadge level={c.level} size="sm" />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">
              {forecastTime && <>Gjelder for {forecastTime}. </>}
              {updated && <>Varsel oppdatert {updated}. </>}
              Beregnet luftkvalitetsvarsel fra MET Norway – ikke en måling på
              ditt eksakte sted. Lufta kan variere lokalt.
            </p>
          </>
        ) : (
          <p className="text-sm text-muted">
            Vi har ikke et beregnet varsel for dette området akkurat nå. Vi
            viser ingen gjettede tall – prøv igjen senere, eller{" "}
            <Link href="/byer" className="font-medium text-accent hover:text-accent-hover">
              finn nærmeste sted i listen
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
