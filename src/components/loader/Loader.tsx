import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { theme } from "../../styles/theme";

export const Loader = () => {
  const [percentage, setPercentage] = useState(0);

  const percentageInterval = useRef();

  const router = useRouter();

  const { query } = router;
  const { type } = query;

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
        router.push(`/${type}`);
      }
    }
  }, [percentage]);

  return (
    <div
      style={{
        margin: "30vh auto",
        width: "66%",
        overflow: "visible",
        filter: "url(#displacementFilter)",
        height: "3rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "0.66rem",
          borderRadius: "1rem",
          background: "rgba(200, 200, 200, 0.2)",
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
