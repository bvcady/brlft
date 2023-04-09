import { theme } from "../../../styles/theme";

export const JaWoord = () => {
  return (
    <div
      style={{
        position: "relative",
        marginTop: "2rem",
        padding: "2rem",
        display: "flex",
        gap: "2rem",
        alignItems: "center",
        width: "clamp(250px, 400px, 90vw)",
        maxWidth: "80vw",
        overflow: "visible",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "3.25rem",
          filter: "url(#displacementFilter) blur(0.5px)",
        }}
      >
        Ja!
      </span>
      <img
        src="images/bob-en-lisa.png"
        alt="Illustratie van Lisa en Bob"
        style={{ padding: "1rem", width: "100%", height: "100%", paddingBottom: "0" }}
      />
      <h1
        style={{
          position: "absolute",
          paddingLeft: "1rem",
          left: "15%",
          right: "15%",
          bottom: "20%",
          textAlign: "center",
          filter: "url(#displacementFilter) blur(0.5px)",
          color: theme.colors.secondary.default,
        }}
      >
        Lis<i>a</i> <i>&</i> Bob
      </h1>
      <div
        style={{
          position: "absolute",
          inset: "0 0 7.5rem 0",
          borderRadius: "20% 25% 35% 30%",
          filter: "url(#displacementFilter)",
          zIndex: "-1",
          transform: "rotate(-4deg)",
          backgroundColor: theme.colors.accent.default,
        }}
      />
    </div>
  );
};
