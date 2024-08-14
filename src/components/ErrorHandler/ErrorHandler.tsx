import { ErrorHandlerProps } from './ErrorHandler.types';
import { notFoundError } from '../../constants';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ErrorWrapper, ErrorText, ErrorEmoji } from './ErrorHandler.styled';
import { RefreshButton } from '../../commons/RefreshButton/RefreshButton';

export default function ErrorHandler({ error, clearLayout }: ErrorHandlerProps) {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const resetError = () => {
    if (error.message === notFoundError) {
      resetBoundary();
      navigate('/');
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {!clearLayout && <Header resetBoundary={resetBoundary} />}
      <ErrorWrapper>
        <ErrorEmoji>{error.message === notFoundError ? '(ó﹏ò｡)' : '(╥﹏╥)'}</ErrorEmoji>
        <ErrorText>{error.message}</ErrorText>
        <RefreshButton onClick={() => resetError()}>
          {error.message === notFoundError ? 'goHome()' : 'reloadPage()'}
        </RefreshButton>
      </ErrorWrapper>
      {!clearLayout && <Footer />}
    </>
  );
}
