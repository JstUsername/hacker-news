import { useEffect } from 'react';
import InternalServerError from '../InternalServerError/InternalServerError.tsx';
import { NewsListWrapper, LoaderWrapper, Loader } from './NewsList.styled.ts';
import NewsListItem from '../NewsListItem/NewsListItem.tsx';
import { useNewsListState } from '../../store/store.ts';

export default function NewsList() {
  const { newsList, isLoading, isServerDown, getNewsList, updateNewsList } = useNewsListState();

  useEffect(() => {
    getNewsList();
  }, [getNewsList]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => updateNewsList(true), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [updateNewsList]);

  return (
    <>
      {isServerDown ? (
        <InternalServerError />
      ) : (
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
      )}
    </>
  );
}
