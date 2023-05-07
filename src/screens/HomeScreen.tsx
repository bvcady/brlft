import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ScreenWrapper } from "../layout/ScreenWrapper";
import { RandomImage } from "../components/decoration/random-image/RandomImage";
import { AddUserForm } from "../components/forms/AddUserForm";

import { Item } from "../layout/Item";
import { Modal } from "../components/modal/Modal";

export const HomeScreen = () => {
  const router = useRouter();
  const authToken = getCookie("brlft-auth-token");

  const [modalActive, toggleModalActive] = useState(false);

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
          Klik hier onder om je registreren als gebruiker. Daarna kun je door de instructies te
          volgen aangeven of, en met wie, je komt.
        </p>
        <button type="button" onClick={() => toggleModalActive(true)}>
          Klik hier!
        </button>
      </Item>
      {modalActive ? (
        <Modal isActive={modalActive} toggleIsActive={toggleModalActive}>
          <AddUserForm />
        </Modal>
      ) : null}
    </ScreenWrapper>
  );
};
