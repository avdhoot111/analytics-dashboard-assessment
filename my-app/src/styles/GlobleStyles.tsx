import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f9;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  .container {
    width: 90%;
    margin: 0 auto;
  }
`;

export default GlobalStyles;
