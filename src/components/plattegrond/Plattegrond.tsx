import styled from "styled-components";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { theme } from "../../styles/theme";

const Wrapper = styled.div`
  position: relative;
  width: clamp(300px, 100%, 600px);
  aspect-ratio: 5/8;
  /* filter: url(#displacementFilter); */
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(16, 1fr);
  gap: 2px;
  padding: 0.5rem;
`;

const LabeledAreaWrapper = styled.p<{
  startX: number;
  spanX?: number;
  startY: number;
  spanY?: number;
  borderColor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ borderColor }) => borderColor || "white"};
  border-radius: 0.25rem;
  content-visibility: hidden;
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: default !important;
  user-select: none;

  background-color: rgba(255, 255, 255, 0.1);

  grid-column-start: ${({ startX }) => startX};
  grid-column-end: span ${({ spanX }) => spanX || 1};
  grid-row-start: ${({ startY }) => startY};
  grid-row-end: span ${({ spanY }) => spanY || 1};

  :hover {
    background-color: rgba(255, 255, 255, 0.4);
    content-visibility: visible;
  }

  transition: all 0.3s ease;
`;

const BG = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/images/sky-view.jpg");
  background-position: center;
  background-size: cover;
  z-index: -1;
  filter: url(#displacementFilter) brightness(1.4);

  mix-blend-mode: darken;
  opacity: 0.8;
`;

const CO = styled.div`
  position: absolute;
  inset: -0.5rem;
  background-color: ${theme.colors.accent.default};
  z-index: -2;
  border-radius: 0.25rem;
`;

const CurrentHighlight = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  text-align: right;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: ${theme.colors.secondary.default};
  border-radius: 0.25rem;
`;

interface IArea {
  area: string;
  setCurrentHighlight: Dispatch<SetStateAction<string>>;
  startX: number;
  spanX?: number;
  startY: number;
  spanY?: number;
  borderColor?: string;
  mobile?: boolean;
}

const LabeledArea = ({ setCurrentHighlight, area, mobile, ...props }: IArea) => {
  return (
    <LabeledAreaWrapper
      onMouseEnter={() => {
        setCurrentHighlight(area);
      }}
      {...{ ...props }}
    >
      {!mobile ? area : ""}
    </LabeledAreaWrapper>
  );
};

export const Plattegrond = () => {
  const [currentHighlight, setCurrentHighlight] = useState("");

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, []);

  return (
    <Wrapper>
      <BG />
      <CO />
      {mobile ? <CurrentHighlight>{currentHighlight || "Klik ergens"}</CurrentHighlight> : null}
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Schaapjes"
        startX={2}
        spanX={4}
        startY={2}
        spanY={6}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Jeu de Boules"
        startX={4}
        spanX={2}
        startY={11}
        spanY={1}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Ceremonie"
        borderColor={theme.colors.main.default}
        startX={7}
        spanX={3}
        startY={4}
        spanY={2}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Zwemvijver"
        startX={7}
        spanX={2}
        startY={6}
        spanY={1}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Party Area"
        borderColor={theme.colors.main.default}
        startX={7}
        spanX={2}
        startY={7}
        spanY={2}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="B&B"
        startX={7}
        spanX={2}
        startY={9}
        spanY={1}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Bar & WCs"
        borderColor={theme.colors.main.default}
        startX={6}
        spanX={3}
        startY={10}
        spanY={3}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="De Eikenhof"
        startX={5}
        spanX={3}
        startY={13}
        spanY={2}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="After"
        startX={9}
        spanX={1}
        startY={11}
        spanY={3}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Diner"
        borderColor={theme.colors.main.default}
        startX={2}
        spanX={4}
        startY={9}
        spanY={2}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Photobooth"
        startX={4}
        spanX={2}
        startY={12}
        spanY={1}
      />
      <LabeledArea
        {...{ mobile, setCurrentHighlight }}
        area="Entree"
        borderColor={theme.colors.main.default}
        startX={6}
        spanX={2}
        startY={15}
        spanY={1}
      />
    </Wrapper>
  );
};
