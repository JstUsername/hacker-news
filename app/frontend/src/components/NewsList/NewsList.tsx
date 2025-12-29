import { NewsListItem } from '../NewsListItem';
import { NewsListWrapper } from './NewsList.styled';
import { use } from 'react';
import { useSelectorNewsList } from '~/store';

export const NewsList = () => {
  const newsList = use(useSelectorNewsList());

  return (
    <NewsListWrapper>
      {newsList.map((newsItem) => (
        <NewsListItem key={newsItem.id} {...newsItem} />
      ))}
    </NewsListWrapper>
  );
};
