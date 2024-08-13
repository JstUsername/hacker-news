import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { ErrorBoundary } from 'react-error-boundary';
import { AppWrapper } from './App.styled';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import NewsItemPage from '../../pages/NewsItemPage/NewsItemPage';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppWrapper>
          <ErrorBoundary FallbackComponent={ErrorHandler}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/news/:id" element={<NewsItemPage />} />
                <Route path="*" element={<ErrorHandler error={new Error('Page not found')} clearLayout={true} />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </AppWrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
