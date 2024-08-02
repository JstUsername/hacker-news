import { Suspense, useEffect, useRef, lazy } from 'react';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled.ts';
import {
  useSelectorGetNewsList,
  useSelectorNewsList,
  useSelectorNewsServerDown,
} from '../../store/states/newsListState/newsListState.ts';
const NewsList = lazy(() => import('../../components/NewsList/NewsList.tsx'));

export default function HomePage() {
  const newsList = useSelectorNewsList();
  const newsServerDown = useSelectorNewsServerDown();
  const getNewsList = useSelectorGetNewsList();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current && newsList.length === 0) {
      getNewsList();
      hasMounted.current = true;
    }
  }, [newsList, getNewsList]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsList(), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsList]);

  if (newsServerDown) {
    throw new Error('Internal server error');
  }

  return (
    <Suspense
      fallback={
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      }
    >
      <NewsList />
    </Suspense>
  );
}
