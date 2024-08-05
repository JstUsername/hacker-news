import { ErrorHandlerProps } from './ErrorHandler.types';
import { notFoundError } from '../../constants';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { ErrorWrapper, ErrorText, ErrorEmoji } from './ErrorHandler.styled';
import { RefreshButton } from '../../commons/RefreshButton/RefreshButton';

export default function ErrorHandler({ error }: ErrorHandlerProps) {
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
    <ErrorWrapper>
      <ErrorEmoji>{error.message === notFoundError ? '(ó﹏ò｡)' : '(╥﹏╥)'}</ErrorEmoji>
      <ErrorText>{error.message}</ErrorText>
      <RefreshButton onClick={() => resetError()}>
        {error.message === notFoundError ? 'goHome()' : 'reloadPage()'}
      </RefreshButton>
    </ErrorWrapper>
  );
}
