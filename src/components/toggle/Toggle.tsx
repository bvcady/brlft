import styled from "styled-components";

const Wrapper = styled.div`
  width: clamp(300px, 600px, 90vw);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.secondary.default};
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;

  button {
    color: ${({ theme }) => theme.colors.secondary.default};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: 1rem;
    width: 100%;
    cursor: pointer;
    transform: none !important;
    :not(:first-of-type) {
      border-left: 2px solid ${({ theme }) => theme.colors.text.default};
    }

    :hover {
      background-color: ${({ theme }) => theme.colors.accent.default};
    }
  }
`;

interface IButtonGroup {
  options: { label: string; callback?: () => void }[];
}

export const Toggle = ({ options }: IButtonGroup) => {
  const test = "";
  return (
    <Wrapper>
      {options?.length ? (
        <Container>
          {options.map((opt) => (
            <button key={opt.label} type="button" onClick={opt.callback}>
              {opt.label}
            </button>
          ))}
        </Container>
      ) : null}
    </Wrapper>
  );
};
