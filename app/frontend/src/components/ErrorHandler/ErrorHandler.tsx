import { RefreshButton } from '../../commons/RefreshButton/RefreshButton';
import { NOT_FOUND_ERROR } from '../../constants/errorMessages';
import { useSelectorResetNewsItem } from '../../store/states/newsItemState/newsItemState';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { ErrorEmoji, ErrorText, ErrorWrapper } from './ErrorHandler.styled';
import { ErrorHandlerProps } from './ErrorHandler.types';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

export default function ErrorHandler({ error, clearLayout }: ErrorHandlerProps) {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const resetNewsItem = useSelectorResetNewsItem();

  const resetError = () => {
    if (error.message === NOT_FOUND_ERROR) {
      resetBoundary();
      resetNewsItem();
      navigate('/');
    } else {
      window.location.reload();
    }
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
}
