import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState';
import NewsCommentsBlock from '../NewsCommentsBlock/NewsCommentsBlock';
import NewsContentBlock from '../NewsContentBlock/NewsContentBlock';
import NewsItemWrapper from './NewsItem.styled';
import { NewsItemProps } from './NewsItem.types';
import { useEffect, use } from 'react';

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
