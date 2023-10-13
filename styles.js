import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
  --black: #000000;
  --dark-grey: #1D1D1D;
  --mid-grey: #3F3F3F;
  --bright-green: #63F287;
  --white: #ffffff;

}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: system-ui;
  }
`;
