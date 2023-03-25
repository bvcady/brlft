/* eslint-disable @typescript-eslint/no-use-before-define */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Loader } from "../components/loader/Loader";
import { Toggle } from "../components/toggle/Toggle";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

export const HomeScreen = () => {
  const router = useRouter();
  const [isLoading, toggleIsLoading] = useState(false);
  const [showOptions, toggleShowOptions] = useState(false);

  const [storedType, setStoredType] = useLocalStorage("brlft-type", "");
  const { type: queryType = "" } = router.query;

  useEffect(() => {
    if (storedType || queryType) {
      toggleIsLoading(true);
    } else {
      toggleIsLoading(false);
    }

    if (!storedType && !queryType) {
      toggleShowOptions(true);
    } else {
      toggleShowOptions(false);
    }
  }, [storedType, queryType]);

  const images = [
    "bob-en-lisa.png",
    "champagne.png",
    "glazen.png",
    "platenspeler.png",
    // "trippy-bob-en-lisa.jpg",
  ];
  const [image, setImage] = useState("");

  const handleNavigate = () => {
    router.push({
      pathname: "/aanmelden",
    });
  };

  const handleLoaderFinished = (input: string) => {
    if (input !== "avond" && input !== "dag") return;
    setStoredType(input);
    handleNavigate();
  };

  useEffect(() => {
    setImage(() => {
      const rand = Math.floor(Math.random() * images.length);
      return images[rand];
    });
  }, []);

  return (
    <ScreenWrapper center>
      <h1>Welkom!</h1>
      {image && (
        <img
          src={`images/${image}`}
          alt=""
          style={{
            objectFit: "contain",
            width: "clamp(150px, 250px, 50%)",
            height: 250,
          }}
        />
      )}
      <WaitingArea>
        {isLoading ? (
          <Loader
            type={(queryType as string) || storedType}
            onFinished={(input: string) => {
              if (queryType) {
                return handleLoaderFinished(input);
              }
              if (storedType) {
                return handleNavigate();
              }
              return null;
            }}
          />
        ) : null}
        {showOptions ? (
          <Toggle
            options={[
              {
                label: "Dag Gasten",
                callback: () => setStoredType("dag"),
              },
              {
                label: "Avond Gasten",
                callback: () => setStoredType("avond"),
              },
            ]}
          />
        ) : null}
      </WaitingArea>
    </ScreenWrapper>
  );
};

const WaitingArea = ({ children }) => {
  return (
    <div
      style={{
        height: "4rem",
        width: "clamp(300px, 400px, 90vw)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};
