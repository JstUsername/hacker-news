import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './theme.ts';
import Header from './components/Header/Header.tsx';
import NewsList from './components/NewsList/NewsList.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <NewsList />
    </ThemeProvider>
  );
}

export default App;
