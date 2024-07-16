import { useEffect } from 'react';
import { NewsListWrapper, LoaderWrapper, Loader } from './NewsList.styled.ts';
import NewsListItem from '../NewsListItem/NewsListItem.tsx';
import { useNewsListState } from '../../store/store.ts';

export default function NewsList() {
  const { newsList, isLoading, updateNewsList } = useNewsListState();

  useEffect(() => {
    updateNewsList();
  }, [updateNewsList]);

  return (
    <>
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <NewsListWrapper>
          {newsList.map((newsItem) => (
            <NewsListItem
              key={newsItem.id}
              id={newsItem.id}
              title={newsItem.title}
              points={newsItem.points}
              user={newsItem.user}
              time_ago={newsItem.time_ago}
            />
          ))}
        </NewsListWrapper>
      )}
    </>
  );
}
