import { ErrorHandlerProps } from './ErrorHandler.types';
import { useErrorBoundary } from 'react-error-boundary';
import { ErrorWrapper, ErrorText, ErrorEmoji, HomeLink } from './ErrorHandler.styled';
import { RefreshButton } from '../../commons/RefreshButton/RefreshButton';

export default function ErrorHandler({ error }: ErrorHandlerProps) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <ErrorWrapper>
      <ErrorEmoji>{error.message === 'Page not found' ? '(ó﹏ò｡)' : '(╥﹏╥)'}</ErrorEmoji>
      <ErrorText>{error.message}</ErrorText>
      {error.message === 'Page not found' ? (
        <HomeLink to="/" onClick={resetBoundary}>
          goHome()
        </HomeLink>
      ) : (
        <RefreshButton onClick={() => window.location.reload()}>reloadPage()</RefreshButton>
      )}
    </ErrorWrapper>
  );
}
