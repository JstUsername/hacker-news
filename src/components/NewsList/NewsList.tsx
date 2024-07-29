import { useEffect, useRef, lazy, Suspense } from 'react';
import { LoaderWrapper, Loader } from './NewsList.styled.ts';
import NewsListItem from '../NewsListItem/NewsListItem.tsx';
import { useSelectorGetNewsList, useSelectorNewsList, useSelectorNewsServerDown } from '../../store/store.ts';

export default function NewsList() {
  const NewsListWrapper = lazy(() =>
    import('./NewsList.styled.ts').then((module) => ({ default: module.NewsListWrapper })),
  );
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
    throw new Error('Internal Server Error');
  }

  return (
    <Suspense
      fallback={
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      }
    >
      <NewsListWrapper>
        {newsList.map((newsItem) => (
          <NewsListItem key={newsItem.id} {...newsItem} />
        ))}
      </NewsListWrapper>
    </Suspense>
  );
}
