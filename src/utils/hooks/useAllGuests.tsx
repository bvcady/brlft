import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Guest } from "../../types";

export const useAllGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, toggleIsLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const authToken = getCookie("brlft-auth-token");

  const router = useRouter();

  const fetchGuest = async () => {
    toggleIsLoading(true);

    const response = await fetch(`/api/guests/all`, {
      method: "GET",
    });

    if (response.ok) {
      const guestResponse = await response.json();

      console.log(guestResponse);
      toggleIsLoading(false);
      if (guestResponse) return setGuests(guestResponse.data);
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
    return () => setGuests([]);
  }, [authToken]);

  return {
    guests,
    refetch: fetchGuest,
    isLoading,
    errors,
  } as {
    guests: Guest[];
    isLoading: boolean;
    errors: string;
    refetch: () => Promise<void>;
  };
};
