import { RefreshButton } from '../../commons/RefreshButton/RefreshButton';
import { notFoundError } from '../../constants';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { ErrorWrapper, ErrorText, ErrorEmoji } from './ErrorHandler.styled';
import { ErrorHandlerProps } from './ErrorHandler.types';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

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
