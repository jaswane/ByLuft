import type { AqiLevel } from "@/lib/airquality/aqi";

interface AdviceGroup {
  group: string;
  advice: string;
}

/** Generelle råd per nivå. Rådene er forenklet og erstatter ikke medisinsk hjelp. */
const adviceByLevel: Record<AqiLevel | 0, AdviceGroup[]> = {
  0: [
    {
      group: "Alle",
      advice:
        "Når vi mangler ferske data, følg eventuelle lokale varsler. De fleste kan være ute som normalt.",
    },
  ],
  1: [
    {
      group: "Alle",
      advice: "Lite luftforurensning. Du kan være ute og aktiv som normalt.",
    },
  ],
  2: [
    {
      group: "De fleste",
      advice: "Utendørs aktivitet anbefales. Nivået er greit for folk flest.",
    },
    {
      group: "Følsomme personer",
      advice:
        "Har du astma eller luftveisplager og merker symptomer, ta det litt roligere ute.",
    },
  ],
  3: [
    {
      group: "De fleste",
      advice: "De fleste kan være ute, men vær oppmerksom ved tung anstrengelse.",
    },
    {
      group: "Følsomme grupper",
      advice:
        "Barn, eldre, gravide og personer med luftveis- eller hjerte-/karsykdom bør redusere langvarig, hard aktivitet ute. Vurder å legge trening innendørs.",
    },
  ],
  4: [
    {
      group: "De fleste",
      advice:
        "Begrens langvarig, hard fysisk aktivitet utendørs, særlig nær trafikk.",
    },
    {
      group: "Følsomme grupper",
      advice:
        "Barn, eldre, gravide og personer med luftveis- eller hjertesykdom bør være mest mulig inne og unngå anstrengelse ute. Ha eventuelle medisiner tilgjengelig og følg lokale råd.",
    },
  ],
};

export function HealthAdvice({ level }: { level: AqiLevel | null }) {
  const groups = adviceByLevel[level ?? 0];

  return (
    <section
      aria-labelledby="helserad-heading"
      className="rounded-xl border border-border bg-surface p-6"
    >
      <h2 id="helserad-heading" className="text-lg font-semibold">
        Helseråd {level ? "for dette nivået" : ""}
      </h2>
      <ul className="mt-4 space-y-3">
        {groups.map((g) => (
          <li key={g.group} className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              {g.group}
            </span>
            <span className="text-sm text-muted">{g.advice}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-border pt-3 text-xs text-muted">
        Dette er generell informasjon, ikke medisinske råd. Er du i tvil om egen
        helse, kontakt lege eller les mer hos{" "}
        <a
          href="https://www.helsenorge.no"
          className="text-accent hover:text-accent-hover"
          rel="noopener nofollow"
          target="_blank"
        >
          Helsenorge
        </a>
        .
      </p>
    </section>
  );
}
