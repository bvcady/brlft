import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
  /* font-family: Arial, Helvetica, sans-serif; */
  box-sizing: border-box;
}

@font-face {
  font-family: Kocha Clean;
  src: url("fonts/Kocha-Clean.otf") format("opentype");
}

h1, h2, h3, h4, h5, span{
	font-family: Kocha Clean;
	margin: 0;
  color: ${({ theme }) => theme.colors.secondary.default};
}

h1 {
  font-size: 4rem;
}

span {
  color: ${({ theme }) => theme.colors.background.default};
}


a, button {
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text.default};
  font-family: Kocha Clean;
  margin: 0;  
	padding: 0;
  text-decoration: underline;
	text-transform: uppercase;
	border: none;
	background-color: transparent;
	outline: none;


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


body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background.default}
}

`;
