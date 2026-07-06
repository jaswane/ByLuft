import type { AqiLevel } from "@/lib/airquality/aqi";
import { aqiLevels, unknownLevel } from "@/lib/airquality/aqi";

/**
 * Nivåmerke for luftkvalitet. Bruker alltid tekst + symbol i tillegg til farge,
 * slik at alvorlighet ikke formidles med farge alene (tilgjengelighet).
 */
export function AqiBadge({
  level,
  size = "md",
}: {
  level: AqiLevel | null;
  size?: "sm" | "md";
}) {
  const info = level ? aqiLevels[level] : unknownLevel;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${padding}`}
      style={{
        backgroundColor: info.softColorVar,
        color: info.colorVar,
        border: `1px solid ${info.colorVar}`,
      }}
    >
      <span aria-hidden="true">{info.symbol}</span>
      {info.label}
    </span>
  );
}
