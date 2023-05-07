import styled from "styled-components";
import { theme } from "../../styles/theme";

export const CloseButton = styled.button`
  margin-inline: auto;
  margin-top: 1rem;
  padding: 1rem;
  border: 2px solid ${theme.colors.secondary.default};
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255);
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
`;
