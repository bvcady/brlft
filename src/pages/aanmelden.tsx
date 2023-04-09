import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { JaWoord } from "../components/decoration/ja-woord/JaWoord";
import { RSVPForm } from "../components/forms/rsvp/RSVPForm";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";

type Guest = {
  name: string;
  email: string;
  type: "borrel" | "dag";
};

const CeremonyPage = () => {
  const router = useRouter();
  const authToken = getCookie("brlft-auth-token");

  const [guest, setGuest] = useState<Guest | undefined>(undefined);

  useEffect(() => {
    if (!authToken) {
      router.push("/").catch((e) => console.log(e));
    }
  }, [authToken]);

  const handleSendGridTest = async () => {
    await fetch("/api/mail", { method: "POST" });
  };

  return (
    <PageLayout>
      <ScreenWrapper>
        <JaWoord />
        <Item>
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
              onze bruiloft een onvergetelijke ervaring wordt. Van de locatie tot de tijdsindeling,
              we hebben alles voor jullie samengesteld zodat jullie optimaal kunnen genieten van ons
              feest.
              <br />
              <br />
              We kunnen niet wachten om deze speciale dag met jullie te delen en onze liefde voor
              elkaar te vieren. Op deze website kun je je RSVP bevestigen en eventuele dieetwensen
              doorgeven, zodat we ons feestmaal perfect kunnen afstemmen op jullie behoeften.
              <br />
              <br />
              Als je nog vragen hebt over onze bruiloft of deze website, aarzel dan niet om contact
              met ons op te nemen. We kijken er naar uit om samen met jullie een onvergetelijke dag
              te creëren op onze trouwdag!
            </p>
          </div>
          {/* <div
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
            /> */}
        </Item>
        <Item full>
          <RSVPForm type={guest?.type || "borrel"} />
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default CeremonyPage;
