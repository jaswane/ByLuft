import { afterEach, describe, expect, it } from "vitest";
import type { AqiLevel } from "@/lib/airquality/aqi";
import type {
  AirQualityResult,
  ComponentReading,
} from "@/lib/airquality/types";
import {
  buildSpotlightContext,
  getAirSeason,
  getDayPhase,
  getDominantPollutant,
  getForcedSpotlightKey,
  getFreshness,
  getSpotlightKey,
  isSpotlightKey,
  spotlightKeys,
  type SpotlightContext,
} from "@/lib/airquality/spotlight";
import { airSpotlights } from "@/data/airSpotlights";
import { cities } from "@/data/cities";

/** Bygger et minimalt ComponentReading. */
function comp(
  id: ComponentReading["id"],
  aqi: number | null,
): ComponentReading {
  return { id, label: id, unit: "µg/m³", concentration: aqi, aqi, level: null };
}

/** Bygger et minimalt AirQualityResult. */
function result(partial: Partial<AirQualityResult>): AirQualityResult {
  return {
    ok: true,
    overallAqi: null,
    overallLevel: null,
    time: null,
    reftime: null,
    locationName: null,
    locationPath: null,
    components: [],
    source: "test",
    ...partial,
  };
}

/** Bygger en SpotlightContext med fornuftige defaults. */
function ctx(partial: Partial<SpotlightContext>): SpotlightContext {
  return {
    level: null,
    dominant: "unknown",
    freshness: "fresh",
    season: "winter",
    dayPhase: "day",
    placeName: "Testby",
    placeSlug: "testby",
    forecastTime: null,
    reftime: null,
    ...partial,
  };
}

describe("getAirSeason", () => {
  it.each([
    [1, 1, "winter"],
    [2, 28, "winter"],
    [2, 29, "winter"], // skuddår – hele februar er vinter
    [3, 1, "spring-road-dust"],
    [4, 30, "spring-road-dust"],
    [5, 1, "early-summer"],
    [6, 15, "early-summer"],
    [6, 16, "summer-ozone"],
    [8, 31, "summer-ozone"],
    [9, 1, "autumn"],
    [10, 15, "autumn"],
    [10, 16, "heating-season"],
    [12, 31, "heating-season"],
  ] as const)("måned %i dag %i → %s", (month, day, expected) => {
    expect(getAirSeason(month, day)).toBe(expected);
  });

  it("29. februar 2028 (reell dato via norsk tid) er vinter", () => {
    const context = buildSpotlightContext({
      result: result({ ok: false }),
      city: cities[0],
      now: new Date("2028-02-29T12:00:00Z"),
    });
    expect(context.season).toBe("winter");
  });
});

describe("getDayPhase", () => {
  it.each([
    [0, "night"],
    [5, "night"],
    [6, "morning"],
    [9, "morning"],
    [10, "day"],
    [17, "day"],
    [18, "evening"],
    [22, "evening"],
    [23, "night"],
  ] as const)("time %i → %s", (hour, expected) => {
    expect(getDayPhase(hour)).toBe(expected);
  });
});

describe("getDominantPollutant", () => {
  it("velger komponenten med høyest delindeks", () => {
    expect(
      getDominantPollutant([comp("pm25", 1.2), comp("o3", 2.4), comp("no2", 1.8)]),
    ).toBe("o3");
  });

  it("prioriterer pm25 ved lik delindeks", () => {
    expect(
      getDominantPollutant([comp("o3", 2.0), comp("pm25", 2.0), comp("pm10", 2.0)]),
    ).toBe("pm25");
  });

  it("ignorerer komponenter uten delindeks (delvis manglende data)", () => {
    expect(
      getDominantPollutant([comp("pm25", null), comp("no2", 1.5)]),
    ).toBe("no2");
  });

  it("returnerer unknown når ingen komponenter har delindeks", () => {
    expect(getDominantPollutant([comp("pm25", null)])).toBe("unknown");
    expect(getDominantPollutant([])).toBe("unknown");
  });
});

describe("getFreshness", () => {
  const now = new Date("2026-01-15T12:00:00Z");

  it("ok=false → unavailable", () => {
    expect(getFreshness(result({ ok: false }), now)).toBe("unavailable");
  });

  it("manglende reftime → stale", () => {
    expect(getFreshness(result({ ok: true, reftime: null }), now)).toBe("stale");
  });

  it("ugyldig reftime → stale", () => {
    expect(
      getFreshness(result({ ok: true, reftime: "ikke-en-dato" }), now),
    ).toBe("stale");
  });

  it("23 timer gammel → fresh (MET-modellen kjører minst daglig)", () => {
    expect(
      getFreshness(result({ ok: true, reftime: "2026-01-14T13:00:00Z" }), now),
    ).toBe("fresh");
  });

  it("25 timer gammel → stale", () => {
    expect(
      getFreshness(result({ ok: true, reftime: "2026-01-14T11:00:00Z" }), now),
    ).toBe("stale");
  });
});

describe("getSpotlightKey – prioritering", () => {
  it("dårlig luft + dominant pm10 om vinteren → pollutant-pm10 (ikke sesong)", () => {
    expect(
      getSpotlightKey(
        ctx({ level: 3, dominant: "pm10", season: "winter" }),
      ),
    ).toBe("pollutant-pm10");
  });

  it("god luft i fyringssesongen → level-1, aldri sesongadvarsel", () => {
    expect(
      getSpotlightKey(
        ctx({ level: 1, dominant: "pm25", season: "heating-season" }),
      ),
    ).toBe("level-1");
  });

  it("manglende data om sommeren → data-unavailable, ikke god luft", () => {
    expect(
      getSpotlightKey(
        ctx({ freshness: "unavailable", season: "summer-ozone" }),
      ),
    ).toBe("data-unavailable");
  });

  it("utdatert varsel slår nivå og komponent", () => {
    expect(
      getSpotlightKey(
        ctx({ freshness: "stale", level: 2, dominant: "o3" }),
      ),
    ).toBe("data-stale");
  });

  it("moderat + dominant o3 → pollutant-o3", () => {
    expect(getSpotlightKey(ctx({ level: 2, dominant: "o3" }))).toBe(
      "pollutant-o3",
    );
  });

  it("svært høy uten kjent komponent → level-4", () => {
    expect(getSpotlightKey(ctx({ level: 4, dominant: "unknown" }))).toBe(
      "level-4",
    );
  });

  it("so2 som dominant behandles som ukjent (ingen egen guide)", () => {
    expect(getSpotlightKey(ctx({ level: 3, dominant: "so2" }))).toBe("level-3");
  });

  it("nivå null med ferske data → sesongfallback", () => {
    expect(
      getSpotlightKey(ctx({ level: null, season: "spring-road-dust" })),
    ).toBe("season-spring-road-dust");
  });

  it.each([1, 2, 3, 4] as AqiLevel[])(
    "alle nivåer (%i) gir en gyldig nøkkel med innhold",
    (level) => {
      const key = getSpotlightKey(ctx({ level, dominant: "unknown" }));
      expect(isSpotlightKey(key)).toBe(true);
      expect(airSpotlights[key]).toBeDefined();
    },
  );
});

describe("getForcedSpotlightKey", () => {
  afterEach(() => {
    delete process.env.FORCE_AIR_SPOTLIGHT;
  });

  it("returnerer gyldig nøkkel", () => {
    process.env.FORCE_AIR_SPOTLIGHT = "pollutant-o3";
    expect(getForcedSpotlightKey()).toBe("pollutant-o3");
  });

  it("ignorerer ugyldig verdi", () => {
    process.env.FORCE_AIR_SPOTLIGHT = "tull-og-toys";
    expect(getForcedSpotlightKey()).toBeUndefined();
  });

  it("ignorerer tom/usatt verdi", () => {
    expect(getForcedSpotlightKey()).toBeUndefined();
  });
});

describe("airSpotlights – innhold og språkregler", () => {
  it("har innhold for samtlige nøkler", () => {
    for (const key of spotlightKeys) {
      const c = airSpotlights[key];
      expect(c.eyebrow.length, key).toBeGreaterThan(0);
      expect(c.title.length, key).toBeGreaterThan(0);
      expect(c.description.length, key).toBeGreaterThan(0);
      expect(c.links.length, key).toBeGreaterThan(0);
    }
  });

  const EXISTING_ROUTES = new Set([
    "/",
    "/byer",
    "/luftkvalitet",
    "/svevestov",
    "/no2",
    "/ozon",
    "/helse",
    "/kan-jeg-ga-ut",
    "/pollen-og-luftkvalitet",
    "/om",
    "/kilder",
    "/personvern",
  ]);

  it("alle lenker peker på eksisterende ruter", () => {
    for (const key of spotlightKeys) {
      for (const link of airSpotlights[key].links) {
        expect(EXISTING_ROUTES.has(link.href), `${key} → ${link.href}`).toBe(
          true,
        );
      }
    }
  });

  it("bruker varsel-språk: aldri måling/live/sanntid/garantier", () => {
    const forbidden = /måling|sanntid|\blive\b|trygt å gå ut|skyldes/i;
    for (const key of spotlightKeys) {
      const c = airSpotlights[key];
      const all = [c.eyebrow, c.title, c.description, c.notice ?? ""].join(" ");
      expect(forbidden.test(all), `${key}: «${all}»`).toBe(false);
    }
  });

  it("pollen nevnes kun i sesongvarianter med eksplisitt ikke-pollenvarsel-notis", () => {
    for (const key of spotlightKeys) {
      const c = airSpotlights[key];
      const text = [c.eyebrow, c.title, c.description].join(" ");
      if (/pollen/i.test(text) || c.links.some((l) => l.href.includes("pollen"))) {
        expect(key.startsWith("season-"), key).toBe(true);
        expect(c.notice, key).toMatch(/ikke pollenvarsel/);
      }
    }
  });
});
