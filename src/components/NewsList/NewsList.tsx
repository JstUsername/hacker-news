import { use } from 'react';
import { NewsListWrapper } from './NewsList.styled.ts';
import NewsListItem from '../NewsListItem/NewsListItem.tsx';
import { useSelectorNewsList } from '../../store/states/newsListState/newsListState.ts';

export default function NewsList() {
  const newsList = use(useSelectorNewsList());

  return (
    <NewsListWrapper>
      {newsList.map((newsItem) => (
        <NewsListItem key={newsItem.id} {...newsItem} />
      ))}
    </NewsListWrapper>
  );
}
