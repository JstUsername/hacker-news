import { Suspense, useEffect, useRef } from 'react';
import NewsList from '../../components/NewsList/NewsList';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled';
import { useSelectorGetNewsList, useSelectorNewsServerDown } from '../../store/states/newsListState/newsListState';

export default function HomePage() {
  const newsServerDown = useSelectorNewsServerDown();
  const getNewsList = useSelectorGetNewsList();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      getNewsList();
      hasMounted.current = true;
    }
  }, [getNewsList]);

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
