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
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      getNewsList();
      hasMounted.current = true;
    }
  }, [getNewsList]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsList(), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsList]);

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
        <NewsListItem key={newsItem.id} {...newsItem} />
      ))}
    </NewsListWrapper>
  );
}
