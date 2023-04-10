import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useGuest = () => {
  const [guest, setGuest] = useState(undefined);
  const [isLoading, toggleIsLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const authToken = getCookie("brlft-auth-token");

  const router = useRouter();

  const fetchGuest = async () => {
    toggleIsLoading(true);

    const response = await fetch(`/api/guests`, {
      method: "GET",
    });

    if (response.ok) {
      const guestResponse = await response.json();
      toggleIsLoading(false);
      if (guestResponse) return setGuest(guestResponse.data);
    }
    return null;
  };

  useEffect(() => {
    if (authToken) {
      fetchGuest().catch((e) => {
        setErrors(e.message);
        console.error(e);
      });
    } else {
      router.replace("/");
    }
    return () => setGuest(undefined);
  }, [authToken]);

  return {
    guest,
    refetch: fetchGuest,
    isLoading,
    errors,
  };
};
