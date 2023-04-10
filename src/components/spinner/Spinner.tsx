/* eslint-disable no-promise-executor-return */
import { Hearts } from "react-loading-icons";
import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";

interface Props {
  isLoading?: boolean;
}

export const Spinner = ({ ...props }: Props) => {
  const [isLoading, toggleIsLoading] = useState(false);

  const delay = async (ms: number, ls: boolean) => {
    await new Promise(() => setTimeout(() => toggleIsLoading(() => ls), ms));
  };

  useEffect(() => {
    if (!props.isLoading) {
      delay(1000, props.isLoading).catch((e) => console.error(e));
    } else {
      toggleIsLoading(() => props.isLoading);
    }
  }, [props.isLoading]);

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        margin: "0 auto",
        transform: `translateY(${isLoading ? "0rem" : "-5rem"})`,
        transition: "transform 1s ease-out",
        zIndex: 11,
      }}
    >
      <Hearts width="3rem" fill={theme.colors.main.default} />
    </div>
  );
};
