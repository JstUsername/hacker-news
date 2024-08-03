import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelectorResetNotFoundPage } from './store/states/newsItemState/newsItemState';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NewsItemPage from './pages/NewsItemPage/NewsItemPage';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

function App() {
  const resetNotFoundPage = useSelectorResetNotFoundPage();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ErrorBoundary FallbackComponent={ErrorHandler}>
                  <HomePage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/news/:id"
              element={
                <ErrorBoundary FallbackComponent={ErrorHandler} onReset={resetNotFoundPage}>
                  <NewsItemPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="*"
              element={<ErrorHandler error={new Error('Page not found')} resetErrorBoundary={() => undefined} />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
