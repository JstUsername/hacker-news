import { Suspense, useEffect } from 'react';
import { Loader, LoaderWrapper } from '~/commons';
import { NewsList } from '~/components/NewsList';
import { useSelectorGetNewsList } from '~/store';

export const HomePage = () => {
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
};
