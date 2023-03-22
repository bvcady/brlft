import { CSSProperties, ReactNode } from "react";
import styled, { css } from "styled-components";
import { Navigation } from "../components/navigation/Navigation";

const Wrapper = styled.main<{ center?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  /* overflow: hidden; */
  padding: 5rem 0rem;
  padding-bottom: 7.5rem;
  min-height: 100vh;
  ${({ center }) =>
    center &&
    css`
      justify-content: center;
    `}
  width: 100%;
  position: relative;
`;

interface IScreenWrapper {
  children?: ReactNode;
  style?: CSSProperties;
  center?: boolean;
}

export const ScreenWrapper = ({ children, style, center }: IScreenWrapper) => (
  <Wrapper style={style} center={center}>
    <Navigation />
    {children}
  </Wrapper>
);
