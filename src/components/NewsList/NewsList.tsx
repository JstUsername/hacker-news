import { useEffect } from 'react';
import InternalServerError from '../InternalServerError/InternalServerError.tsx';
import { NewsListWrapper, LoaderWrapper, Loader } from './NewsList.styled.ts';
import NewsListItem from '../NewsListItem/NewsListItem.tsx';
import {
  useSelectorGetNewsList,
  useSelectorNewsList,
  useSelectorNewsLoading,
  useSelectorNewsServerDown,
  useSelectorUpdateNewsList,
} from '../../store/store.ts';

export default function NewsList() {
  const newsList = useSelectorNewsList();
  const getNewsList = useSelectorGetNewsList();
  const updateNewsList = useSelectorUpdateNewsList();
  const newsLoading = useSelectorNewsLoading();
  const newsServerDown = useSelectorNewsServerDown();

  useEffect(() => {
    newsList.length === 0 ? getNewsList() : null;
  }, [newsList, getNewsList]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => updateNewsList(true), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [updateNewsList]);

  if (newsServerDown) {
    return <InternalServerError />;
  }
  if (newsLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
  return (
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
  );
}
