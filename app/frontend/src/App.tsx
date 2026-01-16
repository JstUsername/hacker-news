import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'styled-components';
import { ErrorHandler } from '~/components/ErrorHandler';
import { Layout } from '~/components/Layout';
import { HomePage, NewsItemPage, SignInPage, SignUpPage } from '~/pages';
import { useSelectorIsAuthenticated } from '~/store';
import { GlobalStyle } from '~/styles';
import { theme } from '~/theme';

export const App = () => {
  const isAuthenticated = useSelectorIsAuthenticated();

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/news/:id" element={<NewsItemPage />} />
              {!isAuthenticated && (
                <>
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </>
              )}
              <Route path="*" element={<ErrorHandler error={new Error('Page not found')} clearLayout />} />
            </Route>
          </Routes>
          <Toaster
            richColors
            toastOptions={{
              style: {
                borderRadius: 0,
                color: theme.color.error,
                backgroundColor: theme.color.errorLight,
                border: 0,
                backdropFilter: 'blur(6px)',
              },
            }}
          />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
};
