import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, LoaderWrapper } from '~/commons';
import { NewsItem } from '~/components/NewsItem';
import { useSelectorGetNewsItem } from '~/store';

export const NewsItemPage = () => {
  const { id } = useParams();
  const getNewsItem = useSelectorGetNewsItem();

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsItem(Number(id)), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsItem, id]);

  useEffect(() => {
    getNewsItem(Number(id));
  }, [getNewsItem, id]);

  return (
    <Suspense
      fallback={
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      }
    >
      <NewsItem />
    </Suspense>
  );
};
