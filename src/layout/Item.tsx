import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

interface IItem {
  children?: ReactNode;
  style?: CSSProperties;
}

const Wrapper = styled.section`
  width: 100%;
  /* height: fit-content; */
`;

export const Item = ({ style = {}, children }) => <Wrapper {...{ style }}>{children}</Wrapper>;
