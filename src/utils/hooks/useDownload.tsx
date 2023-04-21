/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { saveAs } from "file-saver";
import { Person } from "../../types";

export const useDownload = () => {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    setLoading(true);
    console.log("download triggered");

    await fetch("/api/guests/download", {
      method: "GET",
      headers: {
        Accept: "text/csv",
      },
    })
      .then((response) => response.blob())
      .then((blob) => saveAs(blob, "alle-gasten.csv"));

    setLoading(false);
  };

  return { download, loading };
};
