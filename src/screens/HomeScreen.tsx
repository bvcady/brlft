/* eslint-disable @typescript-eslint/no-use-before-define */
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { RandomImage } from "../components/decoration/random-image/RandomImage";
import { AddUserForm } from "../components/forms/AddUserForm";

export const HomeScreen = () => {
  const router = useRouter();
  const authToken = getCookie("brlft-auth-token");

  useEffect(() => {
    if (authToken) {
      router.push("/aanmelden").catch((e) => console.log(e));
    }
  }, [authToken]);

  return (
    <ScreenWrapper center>
      <h1>Welkom!</h1>
      <RandomImage />
      <AddUserForm />
    </ScreenWrapper>
  );
};
