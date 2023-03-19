import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import { Navigation } from "../components/navigation/Navigation";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* overflow: hidden; */
  padding: 7.5rem 2rem;
  width: 100%;
  position: relative;
`;

interface IScreenWrapper {
  children?: ReactNode;
  style?: CSSProperties;
}

export const ScreenWrapper = ({ children, style }: IScreenWrapper) => (
  <Wrapper style={style}>
    <Navigation />
    {children}
  </Wrapper>
);
