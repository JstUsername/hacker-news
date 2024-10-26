import { useSelectorNewsList } from '../../store/states/newsListState/newsListState';
import NewsListItem from '../NewsListItem/NewsListItem';
import { NewsListWrapper } from './NewsList.styled';
import { use } from 'react';

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
