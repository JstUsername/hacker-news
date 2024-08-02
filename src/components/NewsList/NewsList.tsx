import { NewsListWrapper } from './NewsList.styled.ts';
import NewsListItem from '../NewsListItem/NewsListItem.tsx';
import { useSelectorNewsList } from '../../store/store.ts';

export default function NewsList() {
  const newsList = useSelectorNewsList();

  return (
    <NewsListWrapper>
      {newsList.map((newsItem) => (
        <NewsListItem key={newsItem.id} {...newsItem} />
      ))}
    </NewsListWrapper>
  );
}
