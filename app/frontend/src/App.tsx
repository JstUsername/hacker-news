import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorHandler } from '~/components/ErrorHandler';
import { Layout } from '~/components/Layout';
import { HomePage, NewsItemPage } from '~/pages';
import { GlobalStyle } from '~/styles';
import { theme } from '~/theme';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/news/:id" element={<NewsItemPage />} />
              <Route path="*" element={<ErrorHandler error={new Error('Page not found')} clearLayout />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
};
