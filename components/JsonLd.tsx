/** Rendrer strukturert data (JSON-LD) som et script-tag i HTML. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD er statisk generert på server – trygt å sette inn.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
