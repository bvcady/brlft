import "styled-components";

// and extend them!
type colorOptions = {
  default: string;
  [key: number]: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: colorOptions;
      main: colorOptions;
      secondary: colorOptions;
      text: colorOptions;
      accent: colorOptions;
    };
  }
}
