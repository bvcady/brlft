import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: Kocha Clean;
  src: url("fonts/Kocha-Clean.otf") format("opentype");
}

h1 {
  font-family: Kocha Clean;
  font-size: 8rem;
  filter: blur(0.5px);
  margin: 0;
  transform: translateY(0.25em);
}

a {
  font-weight: 900;
  color: black;
  font-family: Kocha Clean;
  margin: 0;  

  :hover {
    transform: translateY(-0.125rem);
  }

  transition: all 0.3s ease;
}

p {
  font-family: 'Courier New', Courier, monospace;
}

i {
  font-style: normal;
  font-feature-settings: "aalt";
}

* {
  /* font-family: Arial, Helvetica, sans-serif; */
  box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background.default}
}

`;
