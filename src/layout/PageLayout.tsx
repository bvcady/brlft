import { ReactNode } from "react";
import styled from "styled-components";

interface IPageLayout {
  children?: ReactNode;
}

const Wrapper = styled.div`
  width: 100vw;
  max-width: 1024px;
  position: relative;
`;

export const PageLayout = ({ children }: IPageLayout) => <Wrapper>{children}</Wrapper>;
