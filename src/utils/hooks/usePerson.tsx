/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Person } from "../../types";

export const usePerson = () => {
  const [loading, setLoading] = useState(false);

  const add = async (input: Partial<Person>) => {
    setLoading(true);

    const response = await fetch("/api/guests/add", {
      method: "POST",
      body: JSON.stringify((({ open, ...rest }) => rest)(input)),
    });

    setLoading(false);
    return response;
  };

  const remove = async (input: Partial<Person>) => {
    setLoading(true);

    const response = await fetch("/api/guests/add", {
      method: "DELETE",
      body: JSON.stringify((({ open, ...rest }) => rest)(input)),
    });

    setLoading(false);
    return response;
  };

  return { add, loading, remove };
};
