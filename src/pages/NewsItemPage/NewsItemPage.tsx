import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelectorNewsList } from '../../store/states/newsListState/newsListState.ts';
import {
  useSelectorGetNewsContent,
  useSelectorGetNewsItem,
  useSelectorItemPageNotFound,
  useSelectorItemServerDown,
} from '../../store/states/newsItemState/newsItemState.ts';
import NewsContentBlock from '../../components/NewsContentBlock/NewsContentBlock.tsx';
import NewsCommentsBlock from '../../components/NewsCommentsBlock/NewsCommentsBlock.tsx';
import { NewsItemWrapper } from './NewsItemPage.styled.ts';

export default function NewsItemPage() {
  const newsList = useSelectorNewsList();
  const itemServerDown = useSelectorItemServerDown();
  const itemPageNotFound = useSelectorItemPageNotFound();
  const getNewsItem = useSelectorGetNewsItem();
  const getNewsContent = useSelectorGetNewsContent();
  const { id } = useParams();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      getNewsItem(Number(id), newsList, false);
      getNewsContent(Number(id), newsList);
      hasMounted.current = true;
    }
  }, [getNewsItem, getNewsContent, id, newsList]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsItem(Number(id), newsList, true), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsItem, id, newsList]);

  if (itemServerDown) {
    throw new Error('Internal server error');
  }

  if (itemPageNotFound) {
    throw new Error('Page not found');
  }

  return (
    <NewsItemWrapper>
      <NewsContentBlock />
      <NewsCommentsBlock />
    </NewsItemWrapper>
  );
}
