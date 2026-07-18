import { describe, expect, it } from "vitest";
import { getNorwayDateParts } from "@/lib/norwayTime";

describe("getNorwayDateParts", () => {
  it("beregner i Europe/Oslo, ikke serverens tidssone (vintertid, UTC+1)", () => {
    // 23:30 UTC 15. jan = 00:30 norsk tid 16. jan
    const parts = getNorwayDateParts(new Date("2026-01-15T23:30:00Z"));
    expect(parts).toEqual({ year: 2026, month: 1, day: 16, hour: 0 });
  });

  it("håndterer norsk sommertid (UTC+2)", () => {
    // 22:30 UTC 15. jul = 00:30 norsk tid 16. jul
    const parts = getNorwayDateParts(new Date("2026-07-15T22:30:00Z"));
    expect(parts).toEqual({ year: 2026, month: 7, day: 16, hour: 0 });
  });

  it("håndterer månedsskifte over UTC-grensen", () => {
    // 23:15 UTC 31. mars = 01:15 norsk tid 1. april (sommertid)
    const parts = getNorwayDateParts(new Date("2026-03-31T23:15:00Z"));
    expect(parts).toEqual({ year: 2026, month: 4, day: 1, hour: 1 });
  });

  it("gir hour 0–23 (h23), ikke 24", () => {
    const parts = getNorwayDateParts(new Date("2026-06-14T22:00:00Z"));
    expect(parts.hour).toBe(0);
  });

  it("håndterer skuddårsdagen 29. februar 2028", () => {
    const parts = getNorwayDateParts(new Date("2028-02-29T12:00:00Z"));
    expect(parts).toEqual({ year: 2028, month: 2, day: 29, hour: 13 });
  });
});
