import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { ScreenWrapper } from "../layout/ScreenWrapper";
import { RandomImage } from "../components/decoration/random-image/RandomImage";
import { AddUserForm } from "../components/forms/AddUserForm";

import { Item } from "../layout/Item";

export const HomeScreen = () => {
  const router = useRouter();
  const authToken = getCookie("brlft-auth-token");

  useEffect(() => {
    if (authToken) {
      router.replace("/info").catch((e) => console.log(e));
    }
  }, [authToken]);

  const { type = "" } = router.query;

  return (
    <ScreenWrapper center>
      <Item>
        <h1>Welkom!</h1>
        <RandomImage />
        <p style={{ maxWidth: "738px", textAlign: "center", padding: "1rem 0" }}>
          Wij zijn op Vrijdag 4 Augustus 2023 10 jaar samen en gaan trouwen!{" "}
          {!type
            ? "Wij horen graag of jij hier bij kunt zijn."
            : `Wij horen graag of jij
          bij ${type === "dag" ? `deze dag` : `de borrel`} aanwezig kan zijn.`}{" "}
          Vul hieronder je gegevens om aan te geven of je komt.
        </p>
      </Item>
      <Item>
        <AddUserForm />
      </Item>
    </ScreenWrapper>
  );
};
