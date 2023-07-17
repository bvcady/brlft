/* eslint-disable react/no-array-index-key */
import { ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Guest, GuestType } from "../../types";
import { theme } from "../../styles/theme";

interface TimeTableProps {
  children: ReactElement | ReactElement[];
}

const Wrapper = styled.div`
  display: grid;
  position: relative;
  overflow: hidden;
  grid-template-columns: auto minmax(100px, 3fr);
  padding: 2rem 1rem;
  margin: 2rem 0;
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 0.5rem;
  grid-column-gap: 1.5rem;
  width: clamp(300px, 100dvw, calc(738px - 4rem));
  border-radius: 0.5rem;
  background-color: ${theme.colors.background.default};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  * {
    z-index: 2;
  }
`;

type Shape = {
  x: number;
  y: number;
  borders: number[];
  rotation: number;
};

export const TimeTable = ({ children }: TimeTableProps) => {
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
    <Wrapper ref={wrapperRef}>
      {new Array(26).fill("").map((_, index) => (
        <p
          key={index}
          style={{
            gridRowEnd: "span 1",
            gridColumn: 1,
            textAlign: "right",
            padding: "0 0.5rem",
            transform: "translateY(-0.5rem)",
          }}
        >{`${(14 + Math.floor(index / 2)) % 24}:${index % 2 !== 0 ? `30` : `00`}`}</p>
      ))}
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
            zIndex: 1,
          }}
        />
      ))}
    </Wrapper>
  );
};

const Item = styled.div<{ from: number; to: number; allowed?: boolean }>`
  grid-row: ${({ from }) => from} / ${({ to }) => to};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  grid-column-start: 2;
  /* box-shadow: inset 0 0 0 2px ${theme.colors.main.default}; */
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  min-height: fit-content;
  p {
    text-align: right;
  }

  opacity: ${({ allowed }) => (allowed ? "1" : "0.2")};
`;

interface ItemProps {
  title: string;
  type: GuestType;
  details?: string;
  guest: Guest;
  duration: [string, string];
}

export const TimeTableItem = ({ title, type, details, guest, duration }: ItemProps) => {
  const transformTime = (time: string) => {
    const start = 15;
    const h = Number(time.split(":")?.[0]);
    const m = Number(time.split(":")?.[1]);

    const normalized = (h < 15 ? h + 24 - start : h - start) * 2 + (m && 1) + 3;
    return normalized;
  };
  const startGrid = transformTime(duration?.[0]);
  const endGrid = transformTime(duration?.[1]);

  console.log(guest);

  return (
    <Item from={startGrid} to={endGrid} allowed={guest?.type === "dag" || guest?.type === type}>
      <p>
        <strong>{title}</strong>
        <br />
        {details}
      </p>
    </Item>
  );
};
