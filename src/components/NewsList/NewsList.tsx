// @ts-ignore
import { use } from 'react';
import { NewsListWrapper } from './NewsList.styled.ts';
import NewsListItem from '../NewsListItem/NewsListItem.tsx';
import { useSelectorNewsList } from '../../store/states/newsListState/newsListState.ts';
import { NewsItemType } from '../../store/states/newsItemState/newsItemState.types.ts';

export default function NewsList() {
  const newsList = use(useSelectorNewsList());

  return (
    <NewsListWrapper>
      {newsList.map((newsItem: NewsItemType) => (
        <NewsListItem key={newsItem.id} {...newsItem} />
      ))}
    </NewsListWrapper>
  );
}
