import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: clamp(300px, 600px, 90vw);
  margin: 0 auto;
  height: fit-content;
  font-family: "Courier New", Courier, monospace;

  fieldset {
    border-color: ${theme.colors.secondary.default};
    border-radius: 0.25rem;
    background-color: rgba(255, 255, 255, 0.8);
    margin: 0;
    width: 100%;
  }

  legend {
    font-size: 1rem;
    font-weight: 500;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: ${theme.colors.secondary.default};
  }

  label {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    width: 100%;
    font-size: 1rem;
  }

  input {
    color: ${theme.colors.secondary.default};
    outline: none;
    font-size: 1rem;
    font-family: "Courier New", Courier, monospace;
    padding: 0.25rem 0.5rem;
  }

  input[type="text"],
  input[type="email"] {
    border: 2px solid ${theme.colors.secondary.default};
    border-radius: 0.25rem;
    :focus,
    :active {
      border: 2px solid ${theme.colors.main.default};
    }
  }
`;
