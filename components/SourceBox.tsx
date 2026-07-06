/**
 * Kildeblokk som forklarer hvor data og innhold kommer fra.
 * Kan ta en valgfri liste med ekstra kilder.
 */
export interface SourceItem {
  label: string;
  href: string;
  note?: string;
}

const defaultSources: SourceItem[] = [
  {
    label: "MET Norway – Luftkvalitetsvarsel",
    href: "https://api.met.no/weatherapi/airqualityforecast/0.1/documentation",
    note: "Beregnet luftkvalitetsvarsel for norske steder.",
  },
  {
    label: "Miljødirektoratet – Luftkvalitet i Norge",
    href: "https://luftkvalitet.miljodirektoratet.no",
    note: "Offisiell tjeneste med målinger og forklaringer.",
  },
];

export function SourceBox({
  sources = defaultSources,
  updated,
  title = "Kilder",
}: {
  sources?: SourceItem[];
  updated?: string | null;
  title?: string;
}) {
  return (
    <section
      aria-labelledby="kilder-heading"
      className="rounded-xl border border-border bg-surface p-5 text-sm"
    >
      <h2 id="kilder-heading" className="font-semibold text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-muted">
        ByLuft.no bygger på offentlige kilder og forklarer dataene i et enklere
        språk. Vi er ikke en offentlig tjeneste.
      </p>
      <ul className="mt-3 space-y-2">
        {sources.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              className="font-medium text-accent hover:text-accent-hover"
              rel="noopener nofollow"
              target="_blank"
            >
              {s.label}
            </a>
            {s.note && <span className="text-muted"> – {s.note}</span>}
          </li>
        ))}
      </ul>
      {updated && (
        <p className="mt-3 text-xs text-muted">Sist oppdatert fra MET: {updated}</p>
      )}
    </section>
  );
}
