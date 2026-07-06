import { NextRequest, NextResponse } from "next/server";
import { getAirQualityForCoords } from "@/lib/airquality/met";

/**
 * Intern API-rute for «Min lokasjon»-verktøyet.
 *
 * - Tar imot lat/lon fra klienten etter eksplisitt brukerhandling.
 * - Validerer og avgrenser koordinatene til Norge/Svalbard-området.
 * - Runder koordinatene til 3 desimaler (~100 m) før kall mot MET –
 *   nøyaktig nok for et områdevarsel, og vi tar ikke imot mer presisjon
 *   enn vi trenger.
 * - Lagrer ingenting: ingen database, ingen cookies, ingen logging av posisjon.
 * - Feilmeldinger er generelle og lekker ikke tekniske detaljer.
 */

/** Omtrentlig avgrensning for fastlands-Norge + Svalbard. */
const BOUNDS = {
  latMin: 57.5,
  latMax: 81.5,
  lonMin: 3.5,
  lonMax: 34.0,
};

function isSupportedArea(lat: number, lon: number): boolean {
  return (
    lat >= BOUNDS.latMin &&
    lat <= BOUNDS.latMax &&
    lon >= BOUNDS.lonMin &&
    lon <= BOUNDS.lonMax
  );
}

function round3(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export async function GET(req: NextRequest) {
  const latRaw = req.nextUrl.searchParams.get("lat");
  const lonRaw = req.nextUrl.searchParams.get("lon");
  const lat = latRaw === null ? NaN : Number(latRaw);
  const lon = lonRaw === null ? NaN : Number(lonRaw);

  const baseHeaders = {
    // Verktøyrute – skal aldri indekseres.
    "X-Robots-Tag": "noindex, nofollow",
  };

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json(
      { ok: false, message: "Ugyldige koordinater." },
      { status: 400, headers: baseHeaders },
    );
  }

  if (!isSupportedArea(lat, lon)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Posisjonen din ser ut til å være utenfor området ByLuft dekker (Norge). Prøv bysøket i stedet.",
      },
      { status: 422, headers: baseHeaders },
    );
  }

  const result = await getAirQualityForCoords(round3(lat), round3(lon));

  // Send aldri result.error (kan inneholde tekniske detaljer) til klienten.
  const payload = {
    ok: result.ok,
    overallAqi: result.overallAqi,
    overallLevel: result.overallLevel,
    time: result.time,
    reftime: result.reftime,
    locationName: result.locationName,
    locationPath: result.locationPath,
    components: result.components,
    source: result.source,
  };

  return NextResponse.json(payload, {
    headers: {
      ...baseHeaders,
      // Kort delt cache på rundede koordinater avlaster MET ved gjentatte
      // oppslag fra samme område, uten å servere utdaterte varsler lenge.
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
  });
}
