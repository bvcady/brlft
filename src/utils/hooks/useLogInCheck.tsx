import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Guest = {
  name: string;
  email: string;
  type: "borrel" | "dag";
};

export const useLogInCheck = () => {
  const router = useRouter();
  const authToken = getCookie("brlft-auth-token");

  const [guest, setGuest] = useState<Guest | undefined>(undefined);

  useEffect(() => {
    if (!authToken) {
      router.replace("/");
    }
  }, [authToken]);
};
