import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

interface IFormWrapper {
  children?: ReactNode;
  style?: CSSProperties;
  notInModal?: boolean;
}

const Wrapper = styled.div<{ notInModal?: boolean }>`
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255);
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* height: fit-content; */
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  width: clamp(300px, 738px, 100vw);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);

  @media (width <= 738px) {
    border-radius: 0;
  }

  @media (width <= 500px) {
    ${({ notInModal }) =>
      notInModal
        ? css`
            border-radius: 0;
          `
        : css`
            border-top-right-radius: 1rem;
            border-top-left-radius: 1rem;
          `}
    padding-bottom: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }
  * {
    z-index: 1;
  }
`;

type Shape = {
  x: number;
  y: number;
  borders: number[];
  rotation: number;
};

export const FormWrapper = ({ notInModal, children, style }: IFormWrapper) => {
  const [bgShapes, setBGShapes] = useState<Shape[]>([]);

  const wrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (wrapperRef.current) {
      const dims = wrapperRef.current.getBoundingClientRect();

      const shapes = new Array(24).fill("").map(() => {
        return {
          x: Math.random() * (dims.width + 100) - 100,
          y: Math.random() * (dims.height + 25) - 50,
          borders: [
            20 + Math.random() * 80,
            20 + Math.random() * 80,
            20 + Math.random() * 80,
            20 + Math.random() * 80,
          ],
          rotation: Math.random() * 90,
        };
      });
      setBGShapes(shapes);
    }
  }, [wrapperRef]);

  return (
    <Wrapper notInModal={notInModal} ref={wrapperRef} style={{ position: "relative", ...style }}>
      {children}
      {bgShapes.map((s) => (
        <div
          key={`${s.x}-${s.y}`}
          style={{
            position: "absolute",
            top: s.y,
            left: s.x,
            filter: "url(#displacementFilter) blur(2px)",
            borderRadius: `${s.borders[0]}% ${s.borders[1]}% ${s.borders[2]}% ${s.borders[3]}%`,
            transform: `rotate(${s.rotation}deg)`,
            width: 100,
            height: 100,
            opacity: 0.75,
            backgroundColor: theme.colors.accent.default,
            zIndex: -1,
          }}
        />
      ))}
    </Wrapper>
  );
};
