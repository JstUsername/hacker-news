import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.color.backgroundDark};
    border-radius: 4px;
  }
  
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.green};
    border-radius: 4px;
  }
  
  @supports not selector(::-webkit-scrollbar) {
    * {
      scrollbar-width: thin;
      scrollbar-color: ${({ theme }) => theme.color.green} transparent;
    }
  }
`;
