import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Fant ikke siden
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Siden du lette etter finnes ikke, eller er flyttet. Prøv å gå til
        forsiden eller finne byen din.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Til forsiden
        </Link>
        <Link
          href="/byer"
          className="rounded-lg border border-border bg-surface px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent-hover"
        >
          Se byer
        </Link>
      </div>
    </Container>
  );
}
