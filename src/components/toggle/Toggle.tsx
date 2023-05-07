import styled, { css } from "styled-components";

const Wrapper = styled.div<{ disabled?: boolean }>`
  width: clamp(300px, 600px, 90vw);
  margin: 0 auto;
  padding: 1rem 0.5rem;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      button {
        pointer-events: none;
      }
    `}
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.secondary.default};
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
`;

const ToggleButton = styled.button<{ isActive?: boolean }>`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary.default};
  cursor: pointer;
  display: flex;
  font-size: 0.8rem;
  justify-content: center;
  padding: 1rem;
  text-decoration: none;
  width: 100%;

  transform: none !important;

  :not(:first-of-type) {
    border-left: 2px solid ${({ theme }) => theme.colors.text.default};
  }

  :hover {
    @media (width >= 500px) {
      background-color: ${({ theme }) => theme.colors.accent.default};
    }
  }

  :active {
    background-color: ${({ theme }) => theme.colors.accent.default};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.main.default};
      /* color: ${({ theme }) => theme.colors.accent.default}; */
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}
`;

interface IButtonGroup {
  disabled?: boolean;
  options: { label: string; callback?: () => void; isActive?: boolean }[];
}

export const Toggle = ({ options, disabled }: IButtonGroup) => {
  return (
    <Wrapper disabled={disabled}>
      {options?.length ? (
        <Container>
          {options.map((opt) => (
            <ToggleButton
              isActive={opt.isActive}
              key={opt.label}
              type="button"
              onClick={opt.callback}
            >
              {opt.label}
            </ToggleButton>
          ))}
        </Container>
      ) : null}
    </Wrapper>
  );
};
