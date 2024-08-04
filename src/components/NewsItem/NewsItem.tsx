import { useEffect, use } from 'react';
import { NewsItemProps } from './NewsItem.types';
import NewsItemWrapper from './NewsItem.styled';
import NewsContentBlock from '../NewsContentBlock/NewsContentBlock';
import NewsCommentsBlock from '../NewsCommentsBlock/NewsCommentsBlock';
import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState';

export default function NewsItem({ setIsPageNotFound }: NewsItemProps) {
  const newsItem = use(useSelectorNewsItem());

  useEffect(() => {
    if (newsItem === null) {
      setIsPageNotFound(true);
    }
  }, [setIsPageNotFound, newsItem]);

  return (
    <NewsItemWrapper>
      <NewsContentBlock newsItem={newsItem} />
      <NewsCommentsBlock newsItem={newsItem} />
    </NewsItemWrapper>
  );
}
