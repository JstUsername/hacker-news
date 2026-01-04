import { Footer } from '../Footer';
import { Header } from '../Header';
import { ErrorEmoji, ErrorText, ErrorWrapper } from './ErrorHandler.styled';
import { ErrorHandlerProps } from './ErrorHandler.types';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { RefreshButton } from '~/commons';
import { NOT_FOUND_ERROR } from '~/constants';
import { useSelectorResetNewsItem } from '~/store';

export const ErrorHandler = ({ error, clearLayout }: ErrorHandlerProps) => {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const resetNewsItem = useSelectorResetNewsItem();

  const resetError = () => {
    if (error.message !== NOT_FOUND_ERROR) {
      window.location.reload();
      return;
    }

    resetBoundary();
    resetNewsItem();
    navigate('/');
  };

  return (
    <>
      {!clearLayout && <Header resetBoundary={resetBoundary} />}
      <ErrorWrapper>
        <ErrorEmoji>{error.message === NOT_FOUND_ERROR ? '(ó﹏ò｡)' : '(╥﹏╥)'}</ErrorEmoji>
        <ErrorText>{error.message}</ErrorText>
        <RefreshButton onClick={resetError}>
          {error.message === NOT_FOUND_ERROR ? 'goHome()' : 'reloadPage()'}
        </RefreshButton>
      </ErrorWrapper>
      {!clearLayout && <Footer />}
    </>
  );
};
