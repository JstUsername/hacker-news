import { useEffect, useRef, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useSelectorGetNewsItem, useSelectorItemServerDown } from '../../store/states/newsItemState/newsItemState';
import NewsItemWrapper from './NewsItemPage.styled';
import NewsContentBlock from '../../components/NewsContentBlock/NewsContentBlock';
import NewsCommentsBlock from '../../components/NewsCommentsBlock/NewsCommentsBlock';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled';

export default function NewsItemPage() {
  const itemServerDown = useSelectorItemServerDown();
  const getNewsItem = useSelectorGetNewsItem();
  const { id } = useParams();
  const hasMounted = useRef(false);
  const [isPageNotFound, setIsPageNotFound] = useState(false);

  useEffect(() => {
    if (!hasMounted.current) {
      getNewsItem(Number(id));
      hasMounted.current = true;
    }
    setIsPageNotFound((prev) => !prev && true);
  }, [getNewsItem, id]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsItem(Number(id)), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsItem, id]);

  if (itemServerDown) {
    throw new Error('Internal server error');
  }

  if (isPageNotFound) {
    throw new Error('Page not found');
  }

  return (
    <Suspense
      fallback={
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      }
    >
      <NewsItemWrapper>
        <NewsContentBlock setIsPageNotFound={setIsPageNotFound} />
        <NewsCommentsBlock />
      </NewsItemWrapper>
    </Suspense>
  );
}
