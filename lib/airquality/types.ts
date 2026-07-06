import type { AqiLevel } from "./aqi";
import type { PollutantId } from "@/data/pollutants";

/** Normalisert måling for én luftkomponent. */
export interface ComponentReading {
  id: PollutantId;
  label: string;
  unit: string;
  /** Konsentrasjon, avrundet. null hvis komponenten mangler i svaret. */
  concentration: number | null;
  /** Delindeks (AQI) for komponenten, hvis tilgjengelig. */
  aqi: number | null;
  level: AqiLevel | null;
}

/** Normalisert luftkvalitetsresultat for én by. */
export interface AirQualityResult {
  /** true hvis vi faktisk fikk data fra MET. */
  ok: boolean;
  /** Samlet AQI-verdi (float) for tidspunktet, hvis tilgjengelig. */
  overallAqi: number | null;
  overallLevel: AqiLevel | null;
  /** Tidspunktet varselet gjelder for (ISO). */
  time: string | null;
  /** Modellens referansetidspunkt (ISO), tilsvarer "sist oppdatert" fra MET. */
  reftime: string | null;
  /** Navn på nærmeste lokasjon MET returnerte. */
  locationName: string | null;
  /** Full stedssti fra MET, f.eks. "Oslo/Oslo/Sentrum 2". */
  locationPath: string | null;
  components: ComponentReading[];
  /** Kilde-etikett for visning. */
  source: string;
  /** Feilmelding for logging/diagnose (vises ikke rått til bruker). */
  error?: string;
}
