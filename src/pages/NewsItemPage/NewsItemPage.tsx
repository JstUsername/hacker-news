import { useEffect, useRef, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import {
  useSelectorGetNewsItem,
  useSelectorItemServerDown,
  useSelectorItemPageNotFound,
} from '../../store/states/newsItemState/newsItemState.ts';
import NewsItemWrapper from './NewsItemPage.styled.ts';
import NewsContentBlock from '../../components/NewsContentBlock/NewsContentBlock.tsx';
import NewsCommentsBlock from '../../components/NewsCommentsBlock/NewsCommentsBlock.tsx';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled.ts';

export default function NewsItemPage() {
  const itemServerDown = useSelectorItemServerDown();
  const itemPageNotFound = useSelectorItemPageNotFound();
  const getNewsItem = useSelectorGetNewsItem();
  const { id } = useParams();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      getNewsItem(Number(id));
      hasMounted.current = true;
    }
  }, [getNewsItem, id]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsItem(Number(id)), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsItem, id]);

  if (itemServerDown) {
    throw new Error('Internal server error');
  }

  if (itemPageNotFound) {
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
        <NewsContentBlock />
        <NewsCommentsBlock />
      </NewsItemWrapper>
    </Suspense>
  );
}
