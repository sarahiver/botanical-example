import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --sage: #8B9D83;
    --sage-dark: #6B7D63;
    --sage-light: #A8B8A0;
    --cream: #F5F1EB;
    --cream-dark: #E8E2D9;
    --terracotta: #C4A484;
    --forest: #2D3B2D;
    --forest-light: #3D4B3D;
    --blush: #E8D5D5;
    --text: #2D3B2D;
    --text-light: #5A6B5A;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Lato', -apple-system, sans-serif;
    font-size: 16px;
    line-height: 1.7;
    color: var(--text);
    background: var(--cream);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 400;
    line-height: 1.3;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  ul, ol {
    list-style: none;
  }

  /* Organic Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--cream-dark);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--sage);
    border-radius: 10px;
    
    &:hover {
      background: var(--sage-dark);
    }
  }

  ::selection {
    background: var(--sage-light);
    color: var(--forest);
  }

  [id] {
    scroll-margin-top: 100px;
  }
`;

export default GlobalStyles;
