import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useLogInCheck = () => {
  const router = useRouter();
  const authToken = getCookie("brlft-auth-token");

  useEffect(() => {
    if (!authToken) {
      router.replace("/");
    }
  }, [authToken]);
};
