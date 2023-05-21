import styled from "styled-components";
import { CloseButton } from "../buttons/Buttons.styled";

export const Backdrop = styled.div<{ innerHeight?: number }>`
  --innerHeight: ${({ innerHeight }) => innerHeight || "100vh"};
  position: fixed;
  inset: 0 0 0 0;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  padding-top: 10rem;
  align-items: center;
  backdrop-filter: blur(4px) grayscale(1);
  gap: 1rem;
  height: var(--innerHeight);

  cursor: pointer;

  @media (width > 500px) {
  }

  @media (width <= 500px) {
    margin: 0;
    padding: 0;
    margin-top: auto;
    inset: 0 0 0 0;

    ${CloseButton} {
      display: none;
    }
  }
`;

export const Content = styled.div`
  cursor: default;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 2rem;

  @media (width <= 500px) {
    margin-top: auto;
    animation: moveIn ease-out 0.5s;
    max-height: 66vh;
  }

  @keyframes moveIn {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;
