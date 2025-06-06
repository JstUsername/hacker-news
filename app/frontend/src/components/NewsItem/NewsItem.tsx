import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState';
import NewsCommentsBlock from '../NewsCommentsBlock/NewsCommentsBlock';
import NewsContentBlock from '../NewsContentBlock/NewsContentBlock';
import NewsItemWrapper from './NewsItem.styled';
import { use } from 'react';

export default function NewsItem() {
  const newsItem = use(useSelectorNewsItem());

  return (
    <NewsItemWrapper>
      <NewsContentBlock newsItem={newsItem} />
      <NewsCommentsBlock newsItem={newsItem} />
    </NewsItemWrapper>
  );
}
