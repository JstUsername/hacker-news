import { NewsCommentsBlock } from '../NewsCommentsBlock';
import { NewsContentBlock } from '../NewsContentBlock';
import { NewsItemWrapper } from './NewsItem.styled';
import { use } from 'react';
import { useSelectorNewsItem } from '~/store';

export const NewsItem = () => {
  const newsItem = use(useSelectorNewsItem());

  return (
    <NewsItemWrapper>
      {newsItem && (
        <>
          <NewsContentBlock newsItem={newsItem} />
          <NewsCommentsBlock newsItem={newsItem} />
        </>
      )}
    </NewsItemWrapper>
  );
};
