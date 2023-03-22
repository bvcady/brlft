import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

interface IItem {
  children?: ReactNode;
  style?: CSSProperties;
}

const Wrapper = styled.section`
  width: 100%;
  padding: 1rem 2rem;
  min-height: 25vh;
`;

export const Item = ({ style, children }: IItem) => <Wrapper {...{ style }}>{children}</Wrapper>;
