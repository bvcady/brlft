import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

interface IItem {
  center?: boolean;
  children?: ReactNode;
  height?: number;
  name?: string;
  width?: number;
  x?: number;
  y?: number;
  style?: CSSProperties;
}

const Wrapper = styled.div<{ x?: number; y?: number; width?: number; height?: number }>`
  grid-column-start: ${({ x }) => x || "auto"};
  grid-column-end: ${({ width }) => (width ? `span ${width}` : "auto")};
  grid-row-start: ${({ y }) => y || "auto"};
  grid-row-end: ${({ height }) => (height ? `span ${height}` : "auto")};

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  /* height: fit-content; */
`;

export const Item = ({ x, y, width, height, children, style }: IItem) => (
  <Wrapper {...{ x, y, width, height, style }}>{children}</Wrapper>
);
