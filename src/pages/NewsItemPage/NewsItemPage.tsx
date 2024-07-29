import { useEffect, lazy, Suspense, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fromUnixTime, lightFormat } from 'date-fns';
import {
  useSelectorCommentsLoading,
  useSelectorGetNewsContent,
  useSelectorGetNewsItem,
  useSelectorItemServerDown,
  useSelectorNewsItem,
  useSelectorNewsList,
} from '../../store/store.ts';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled.ts';
import CommentsItem from '../../components/CommentsItem/CommentsItem.tsx';
import {
  NewsItemWrapper,
  CommentsLoaderWrapper,
  ContentHeaderWrapper,
  ContentBottomWrapper,
  NewsItemTitle,
  ContentWrapper,
  ByTimeWrapper,
  Time,
  CommentsWrapper,
  LinkToNews,
  Points,
  By,
} from './NewsItemPage.styled.ts';

export default function NewsItemPage() {
  const NotFoundPage = lazy(() => import('../NotFoundPage/NotFoundPage.tsx'));
  const newsList = useSelectorNewsList();
  const newsItem = useSelectorNewsItem();
  const itemServerDown = useSelectorItemServerDown();
  const commentsLoading = useSelectorCommentsLoading();
  const itemPageNotFound = useSelectorItemPageNotFound();
  const getNewsItem = useSelectorGetNewsItem();
  const getNewsContent = useSelectorGetNewsContent();
  const { id } = useParams();
  const hasMounted = useRef(false);

  const timestampToDate = (timestamp: number) => {
    const date = fromUnixTime(timestamp);
    return lightFormat(date, 'HH:mm dd.MM.yy').toString();
  };

  useEffect(() => {
    if (!hasMounted.current) {
      getNewsItem(Number(id), newsList, false);
      getNewsContent(Number(id), newsList);
      hasMounted.current = true;
    }
  }, [getNewsItem, getNewsContent, id, newsList]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsItem(Number(id), newsList, true), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsItem, id, newsList]);

  if (itemServerDown) {
    throw new Error('Internal Server Error');
  }

  if (itemPageNotFound) {
    throw new Error('Page Not Found');
  }
  return (
    <Suspense
      fallback={
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      }
    >
      {newsItem === null ? (
        <NotFoundPage />
      ) : (
        <NewsItemWrapper>
          <ContentWrapper>
            <ContentHeaderWrapper>
              <NewsItemTitle>{newsItem.title}</NewsItemTitle>
              <LinkToNews>
                Link: <a href={newsItem.url}>{newsItem.url}</a>
              </LinkToNews>
            </ContentHeaderWrapper>
            <ContentBottomWrapper>
              <Points>{newsItem.points} points</Points>
              <ByTimeWrapper>
                <By>
                  By: <span>{newsItem.user}</span>
                </By>
                <Time>{timestampToDate(newsItem.time)}</Time>
              </ByTimeWrapper>
            </ContentBottomWrapper>
          </ContentWrapper>
          <CommentsWrapper>
            <NewsItemTitle>
              Comments
              <span>{' ' + newsItem.comments_count}</span>
            </NewsItemTitle>
            {commentsLoading ? (
              <CommentsLoaderWrapper>
                <Loader />
              </CommentsLoaderWrapper>
            ) : (
              <>
                {newsItem.comments.map((comment) => (
                  <CommentsItem key={comment.id} comment={comment} />
                ))}
              </>
            )}
          </CommentsWrapper>
        </NewsItemWrapper>
      )}
    </Suspense>
  );
}
