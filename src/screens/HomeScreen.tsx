import { Loader } from "../components/loader/Loader";
import { Navigation } from "../components/navigation/Navigation";
import { ScreenWrapper } from "../layout/ScreenWrapper";

export const HomeScreen = () => {
  const displace = "url(#displacementFilter) blur(0.5px)";
  return (
    <ScreenWrapper>
      <Loader />
    </ScreenWrapper>
  );
};
