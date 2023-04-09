import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Item } from "../../layout/Item";
import { theme } from "../../styles/theme";

interface IFormWrapper {
  children?: ReactNode;
}

const Wrapper = styled.div`
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: clamp(300px, 738px, 100vw);

  @media screen and (max-width: 738px) {
    border-radius: 0;
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

export const FormWrapper = ({ children }: IFormWrapper) => {
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
    <Wrapper
      ref={wrapperRef}
      style={{ position: "relative", marginTop: "2rem", overflow: "hidden" }}
    >
      {children}
      {bgShapes.map((s) => (
        <div
          style={{
            position: "absolute",
            top: s.y,
            left: s.x,
            filter: "blur(3px)",
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
