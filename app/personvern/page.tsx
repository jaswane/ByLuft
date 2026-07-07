import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { ConsentSettingsButton } from "@/components/ConsentSettingsButton";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Personvern",
  description:
    "Personvernerklæring for ByLuft.no. Vi krever ingen innlogging og selger ikke data. Google Analytics brukes til statistikk kun etter samtykke.",
  path: "/personvern",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Personvern", path: "/personvern" },
];

export default function PersonvernPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Personvern"
        lead="Kort og enkelt: ByLuft.no er laget for å være lett å bruke uten at du gir fra deg personopplysninger."
      />

      <Container className="py-10">
        <Prose>
          <h2>Kort oppsummert</h2>
          <ul>
            <li>Du trenger ikke å logge inn eller registrere deg.</li>
            <li>Vi ber deg ikke om personopplysninger som navn eller e-post.</li>
            <li>
              Vi bruker Google Analytics til statistikk på aggregert nivå – men
              bare hvis du har sagt ja i samtykkebanneret. Sier du nei, lastes
              det ikke.
            </li>
            <li>Vi selger ikke data, og vi bruker ikke annonsenettverk.</li>
            <li>Bysøket kjører i nettleseren din og sender ikke søket ditt til oss.</li>
          </ul>

          <h2>Data vi henter</h2>
          <p>
            For å vise luftkvalitet henter nettstedet data fra offentlige API-er,
            blant annet MET Norway. Denne hentingen skjer på serveren vår, ikke i
            nettleseren din, og innebærer ikke at det sendes personopplysninger om
            deg til disse tjenestene.
          </p>

          <h2>«Min lokasjon»</h2>
          <p>
            Hvis du selv trykker på «Min lokasjon», spør nettleseren om lov til å
            dele posisjonen din. Sier du ja, brukes koordinatene til ett oppslag:
            å hente et beregnet luftkvalitetsvarsel for området ditt fra MET.
            Koordinatene rundes av før oppslaget, lagres ikke, kobles ikke til
            deg, og deles ikke videre. Sier du nei, fungerer resten av siden som
            normalt.
          </p>

          <h2>Trafikkmåling med Google Analytics</h2>
          <p>
            For å forstå hvordan siden brukes, og for å gjøre den bedre, kan
            ByLuft.no bruke Google Analytics (GA4). Verktøyet samler inn
            statistikk på aggregert nivå – for eksempel hvilke sider som åpnes,
            omtrentlig geografisk område, nettlesertype og hvor besøket kommer
            fra. Det er ikke ment for å identifisere deg som person, og vi kobler
            det ikke til navn eller kontaktinfo.
          </p>
          <p>
            <strong>
              Google Analytics lastes bare hvis du har gitt samtykke.
            </strong>{" "}
            Første gang du besøker siden, spør vi i et banner nederst om du vil
            godta statistikk. Velger du «Avvis», lastes ikke Google Analytics i
            det hele tatt. Velger du «Godta statistikk», lastes det på alle
            sider til du eventuelt endrer valget.
          </p>
          <p>
            Selve valget ditt lagres lokalt i nettleseren din (i{" "}
            <em>localStorage</em>), slik at vi husker det til neste gang. Dette
            er den eneste opplysningen vi lagrer om deg, og den forlater ikke
            nettleseren.
          </p>
          <p>
            Google Analytics settes opp av Google LLC, som behandler dataene på
            våre vegne. Du kan lese mer om hvordan Google behandler data i{" "}
            <a
              href="https://policies.google.com/privacy"
              rel="noopener nofollow"
              target="_blank"
            >
              Googles personvernerklæring
            </a>
            . Du kan også bruke{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              rel="noopener nofollow"
              target="_blank"
            >
              Googles avmeldingstillegg
            </a>
            .
          </p>

          <h2>Endre samtykke</h2>
          <p>
            Du kan når som helst ombestemme deg. Trykk på knappen under for å
            nullstille valget – da dukker samtykkebanneret opp igjen, og du kan
            velge på nytt.
          </p>
          <p className="not-prose">
            <ConsentSettingsButton />
          </p>

          <h2>Informasjonskapsler (cookies)</h2>
          <p>
            Hvis du godtar statistikk, setter Google Analytics
            informasjonskapsler i nettleseren din for å skille besøk fra
            hverandre og telle dem statistisk. Godtar du ikke, settes ingen slike
            informasjonskapsler. Uansett bruker ByLuft.no ikke
            informasjonskapsler for markedsføring, og vi deler ikke data med
            annonsenettverk.
          </p>

          <h2>Dine rettigheter</h2>
          <p>
            Vi ber deg ikke om personopplysninger, og den statistiske
            trafikkmålingen er ikke knyttet til deg som person. Har du spørsmål
            om personvern, kan du kontakte oss på{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
