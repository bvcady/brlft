import { Loader } from "../components/loader/Loader";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { theme } from "../styles/theme";

export const HomeScreen = () => {
  const displace = "url(#displacementFilter)";
  return (
    <ScreenWrapper>
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "2rem",
          backgroundColor: theme.colors.secondary.default,
        }}
      />
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "2rem",
          backgroundColor: theme.colors.accent.default,
        }}
      />
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "2rem",
          backgroundColor: theme.colors.text.default,
        }}
      />
      <Loader />
    </ScreenWrapper>
  );
};
