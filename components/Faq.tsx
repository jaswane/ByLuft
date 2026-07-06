import type { FaqItem } from "@/lib/seo";

/**
 * FAQ-seksjon i ren HTML (details/summary) slik at svarene er synlige for
 * søkemotorer uten JavaScript. Bruk sammen med faqJsonLd for strukturert data.
 */
export function Faq({
  items,
  heading = "Vanlige spørsmål",
  id = "faq",
}: {
  items: FaqItem[];
  heading?: string;
  id?: string;
}) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="text-2xl font-bold tracking-tight">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
        {items.map((item, i) => (
          <details key={i} className="group px-5 py-4" open={i === 0}>
            <summary className="cursor-pointer list-none font-semibold marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-muted leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
