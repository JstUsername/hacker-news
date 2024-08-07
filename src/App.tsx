import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NewsItemPage from './pages/NewsItemPage/NewsItemPage';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/news/:id" element={<NewsItemPage />} />
              <Route path="*" element={<ErrorHandler error={new Error('Page not found')} clearLayout={true} />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
