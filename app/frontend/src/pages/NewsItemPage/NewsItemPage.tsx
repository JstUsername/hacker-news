import NewsItem from '../../components/NewsItem/NewsItem';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled';
import { useSelectorGetNewsItem } from '../../store/states/newsItemState/newsItemState';
import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function NewsItemPage() {
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
}
