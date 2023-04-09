import { CSSProperties, ReactNode } from "react";
import styled, { css } from "styled-components";

interface IItem {
  children?: ReactNode;
  style?: CSSProperties;
  full?: boolean;
}

const Wrapper = styled.section<{ full?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  min-height: 25vh;
  ${({ full }) =>
    full &&
    css`
      padding: 1rem 0;
    `}
`;

export const Item = ({ style, children, full }: IItem) => (
  <Wrapper {...{ style, full }}>{children}</Wrapper>
);
