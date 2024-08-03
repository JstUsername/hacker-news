import { use } from 'react';
import { NewsListWrapper } from './NewsList.styled';
import NewsListItem from '../NewsListItem/NewsListItem';
import { useSelectorNewsList } from '../../store/states/newsListState/newsListState';

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
