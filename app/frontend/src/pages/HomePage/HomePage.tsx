import NewsList from '../../components/NewsList/NewsList';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled';
import { useSelectorGetNewsList } from '../../store/states/newsListState/newsListState';
import { Suspense, useEffect } from 'react';

export default function HomePage() {
  const getNewsList = useSelectorGetNewsList();

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsList(), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsList]);

  useEffect(() => {
    getNewsList();
  }, [getNewsList]);

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
