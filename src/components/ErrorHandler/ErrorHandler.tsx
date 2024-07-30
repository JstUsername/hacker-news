import { ErrorWrapper, ErrorText, ErrorEmoji, HomeLink } from './ErrorHandler.styled.ts';
import { RefreshButton } from '../../commons/RefreshButton/RefreshButton.ts';

interface ErrorHandlerProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorHandler({ error, resetErrorBoundary }: ErrorHandlerProps) {
  return (
    <ErrorWrapper>
      <ErrorEmoji>{error.message === 'Page not found' ? '(ó﹏ò｡)' : '(╥﹏╥)'}</ErrorEmoji>
      <ErrorText>{error.message}</ErrorText>
      {error.message === 'Page not found' ? (
        <HomeLink to="/" onClick={() => resetErrorBoundary()}>
          goHome()
        </HomeLink>
      ) : (
        <RefreshButton onClick={() => window.location.reload()}>reloadPage()</RefreshButton>
      )}
    </ErrorWrapper>
  );
}
