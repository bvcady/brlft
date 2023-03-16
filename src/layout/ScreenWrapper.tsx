import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* overflow: hidden; */
  padding: 4rem 2rem;
  width: 100%;
  position: relative;
  /* 
  display: grid;

  grid-template-columns: repeat(12, minmax(10px, 1fr));
  grid-template-rows: auto;
  grid-gap: 0.5rem;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
  } */
`;

interface IScreenWrapper {
  children?: ReactNode;
  style?: CSSProperties;
}

export const ScreenWrapper = ({ children, style }: IScreenWrapper) => (
  <Wrapper style={style}>{children}</Wrapper>
);
