import { ReactNode } from "react";
import styled from "styled-components";
import { RainWithUmbrella } from "./RainWithUmbrella";

interface IPageLayout {
  children?: ReactNode;
}

const Wrapper = styled.div`
  width: 100vw;
  max-width: 1240px;
  position: relative;
`;

export const PageLayout = ({ children }: IPageLayout) => (
  <Wrapper>
    {children}
    {/* <RainWithUmbrella /> */}
  </Wrapper>
);
