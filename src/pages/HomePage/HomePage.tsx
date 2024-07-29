import { ErrorBoundary } from 'react-error-boundary';
import NewsList from '../../components/NewsList/NewsList.tsx';
import InternalServerError from '../../components/InternalServerError/InternalServerError.tsx';

export default function HomePage() {
  return (
    <ErrorBoundary fallback={<InternalServerError />}>
      <NewsList />
    </ErrorBoundary>
  );
}
