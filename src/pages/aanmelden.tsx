import { useRouter } from "next/router";
import { useEffect } from "react";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { theme } from "../styles/theme";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

const CeremonyPage = () => {
  const router = useRouter();

  const [type] = useLocalStorage("brlft-type", "");

  useEffect(() => {
    if (type !== "avond" && type !== "dag") {
      router.push("/");
    }
  }, [type]);

  return (
    <PageLayout>
      {type ? (
        <ScreenWrapper>
          <div
            style={{
              position: "relative",
              marginTop: "2rem",
              padding: "2rem",
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              width: "clamp(250px, 450px, 90vw)",
              maxWidth: "80vw",
              overflow: "visible",
            }}
          >
            <img
              src="images/bob-en-lisa.png"
              alt="Illustratie van Lisa en Bob"
              style={{ padding: "1rem", width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                inset: "0 0 7.5rem 0",
                borderRadius: "20% 25% 35% 30%",
                filter: "url(#displacementFilter)",
                zIndex: "-1",
                transform: "rotate(-4deg)",
                backgroundColor: theme.colors.accent.default,
              }}
            />
          </div>
          <Item>
            <h1
              style={{
                filter: "url(#displacementFilter)",
                fontSize: "8rem",
                color: theme.colors.secondary.default,
              }}
            >
              Bob <i>&</i> Lis<i>a</i>
            </h1>
            <h2>4 Augustus 2023</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <p>
                Lieve vrienden en familie,
                <br />
                <br />
                We nodigen jullie uit om met ons te vieren op de mooiste dag van ons leven - onze
                trouwdag!
                <br />
                <br />
                Op deze website kun je alle informatie vinden die je nodig hebt om bij onze viering
                aanwezig te zijn. We hebben zorgvuldig elke detail gepland om ervoor te zorgen dat
                onze bruiloft een onvergetelijke ervaring wordt. Van de locatie tot de
                tijdsindeling, we hebben alles voor jullie samengesteld zodat jullie optimaal kunnen
                genieten van ons feest.
                <br />
                <br />
                We kunnen niet wachten om deze speciale dag met jullie te delen en onze liefde voor
                elkaar te vieren. Op deze website kun je je RSVP bevestigen en eventuele dieetwensen
                doorgeven, zodat we ons feestmaal perfect kunnen afstemmen op jullie behoeften.
                <br />
                <br />
                Als je nog vragen hebt over onze bruiloft of deze website, aarzel dan niet om
                contact met ons op te nemen. We kijken er naar uit om samen met jullie een
                onvergetelijke dag te creëren op onze trouwdag!
              </p>
            </div>
            <div
              style={{
                width: "100%",
                height: 350,
                zIndex: "-1",
                borderRadius: "1rem",
                backgroundImage:
                  "url(https://alinebouma.nl/assets/images/content/_gridRetina/StephanieFolkert500_2020-08-29-193839.JPG)",
                backgroundPosition: "0px 60%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
          </Item>
        </ScreenWrapper>
      ) : null}
    </PageLayout>
  );
};

export default CeremonyPage;
