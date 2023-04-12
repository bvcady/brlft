import styled from "styled-components";
import { theme } from "../../../styles/theme";

interface Props {
  name?: string;
}

const InitialsWrapper = styled.h5`
  border: 2px solid ${theme.colors.main.default};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 0.125rem;
  width: 2rem;
  max-width: 2rem;
  height: 2rem;
  max-height: 2rem;
  border-radius: 1rem;
  background-color: ${theme.colors.accent.default};
`;

export const MiniPerson = ({ name = "a a" }: Props) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((s: string) => s.charAt(0))
    .join("")
    .toUpperCase();

  return <InitialsWrapper>{initials}</InitialsWrapper>;
};
