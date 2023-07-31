import { Plattegrond } from "../components/plattegrond/Plattegrond";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";

import { useLogInCheck } from "../utils/hooks/useLogInCheck";

const LocatiePage = () => {
  useLogInCheck();

  return (
    <PageLayout>
      <ScreenWrapper>
        <Item>
          <h1>Locatie</h1>
          <div
            style={{
              position: "relative",
              maxWidth: "100%",
              width: "600px",
              minWidth: "300px",
              aspectRatio: "1.66",
              display: "flex",
              overflow: "hidden",
              borderRadius: "0.25rem",
              justifyContent: "center",
              alignItems: "flex-end",
              backgroundImage:
                'url("https://media.indebuurt.nl/dordrecht/2020/06/08125910/de-eikenhof-scaled.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Item>
        <Item style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
          <p>
            Als trouwlocatie hebben we gekozen voor de Eikenhof. De Eikenhof is een mooie rustige
            stads-oase, waar veel aandacht voor natuur is. Tijdens onze hardloop rondjes kwamen we
            hier al vaak langs, en zijn we ook al bij verschillende buurt marktjes aanwezig geweest.
            Vanwege de prachtige omgeving, de warme gastvrijheid en de veelzijdige mogelijkheden die
            deze locatie biedt, vieren wij hier onze bruiloft. We willen onze liefde vieren in een
            plek die zowel rustgevend als inspirerend is. We kijken ernaar uit om deze
            onvergetelijke dag met u te delen, omringd door de weelderige natuur en de liefdevolle
            ambiance van de Eikenhof.
            <br />
            <br />
            Ook veel dank aan Corrie en Freek.
            <br />
            <br />
            <em>
              Hieronder is te zien hoe wij van plan zijn de locatie aan te kleden en in te richten.
            </em>
          </p>
          <Plattegrond />
        </Item>
        <Item>
          <p>
            Parkeren kan gemakkelijk bij Parkeerplaats Sportpark FC Dordrecht. Parkeer vooral{" "}
            <strong>niet</strong> in de straten rondom de locatie om overlast te verkomen. Wanneer
            je via de N3 aankomt kun het gemakkelijkst via de Krommedijk aanrijden.
            <br />
            <br />
            <em>Verder kun je hier zien hoe je van de parkeerplaats kunt lopen naar de locatie:</em>
          </p>
          <div
            style={{
              position: "relative",
              maxWidth: "100%",
              width: "600px",
              minWidth: "300px",
              marginTop: "2rem",
              aspectRatio: "1.66",
              display: "flex",
              overflow: "hidden",
              borderRadius: "0.25rem",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: "1rem",
              backgroundImage: 'url("images/plattegrond.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <a href="https://goo.gl/maps/kBwWVNoc4VyTZ3ib7">Google Maps</a>
          </div>
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default LocatiePage;
