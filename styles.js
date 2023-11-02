import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --black: #000000;
  --dark-grey: #1D1D1D;
  --mid-grey: #3F3F3F;
  --bright-green: #63F287;
  --white: #ffffff;
  --rose: #F2C9C9;
  --light-grey: #E4E4E4;

  --primary: #6636E4;
  --primary-pressed: #4D23C4;
  --transparent-pressed: #6636E470;
  --text-on-primary: #FCFAFF;
  --subtle-text-on-primary: #FCFAFF70;
  --background: #FCFAFF;

// Dark Mode Buttons
  --selected: #6636E4;
  --deselected: #332649;
  --button-bg: #FCFAFF;
}

/* [data-theme='light'] {
  --primary: #6636E4;
  --text-accent: #2F2F2F;
  --primary-pressed: #4D23C4;
  --transparent-pressed: #6636E470;
  --text-on-primary: #FCFAFF;
  --subtle-text-on-primary: #FCFAFF70;
  --background: #FCFAFF;

// Dark Mode Buttons
  --selected: #6636E4;
  --deselected: #332649;
  --button-bg: #FCFAFF;
} */
[data-theme='dark'] {
  --primary: #D7C3FA;
  --text-accent: #FCFAFF;
  --primary-pressed: #AD92EF;
  --transparent-pressed: #D7C3FA06;
  --text-on-primary: #332649;
  --subtle-text-on-primary: #33264970;
  --background: #2F2F2F;

// Dark Mode Buttons
  --selected: #D4C5F6;
  --deselected: #F2F2F2;
  --button-bg: #2B2B2B; }

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
