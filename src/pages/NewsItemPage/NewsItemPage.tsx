import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  useSelectorGetNewsContent,
  useSelectorGetNewsItem,
  useSelectorItemPageNotFound,
  useSelectorItemServerDown,
  useSelectorNewsList,
} from '../../store/store.ts';
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
    throw new Error('Internal Server Error');
  }

  if (itemPageNotFound) {
    throw new Error('Page Not Found');
  }

  return (
    <NewsItemWrapper>
      <NewsContentBlock />
      <NewsCommentsBlock />
    </NewsItemWrapper>
  );
}
