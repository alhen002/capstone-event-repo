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
    padding: 0;
    margin: 0;
  }

  body {
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-family: sans-serif;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }


  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline-offset: -1px;
  }

  button:has(svg) {
    line-height: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img {
    max-width: 100%;
  }
`;
