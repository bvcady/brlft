import { useEffect, useRef, useState } from "react";
import { theme } from "../../styles/theme";

interface ILoader {
  onFinished?: (input: string) => void;
  type?: string;
}

export const Loader = ({ onFinished, type }: ILoader) => {
  const [percentage, setPercentage] = useState(0);

  const percentageInterval = useRef();

  useEffect(() => {
    // @ts-ignore
    percentageInterval.current = setInterval(() => {
      if (percentage < 100) {
        setPercentage((prev) => (prev + 33 < 100 ? prev + Math.random() * 33 : 100));
      }
    }, 500);

    return () => clearInterval(percentageInterval.current);
  }, []);

  useEffect(() => {
    if (percentage >= 100) {
      clearInterval(percentageInterval.current);
      if (type) {
        onFinished?.(type);
      }
    }
  }, [percentage]);

  return (
    <div
      style={{
        pointerEvents: "none",
        margin: "3rem auto",
        width: "clamp(200px, 350px, 66%)",
        overflow: "visible",
        filter: "url(#displacementFilter)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "0.5rem",
          borderRadius: "1rem",
          background: theme.colors.main.default,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.floor(percentage)}%`,
            backgroundColor: theme.colors.secondary.default,
            transition: "all 0.5s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};
