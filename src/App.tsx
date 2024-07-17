import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './theme.ts';
import Header from './components/Header/Header.tsx';
import NewsList from './components/NewsList/NewsList.tsx';
import Footer from './components/Footer/Footer.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <NewsList />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
