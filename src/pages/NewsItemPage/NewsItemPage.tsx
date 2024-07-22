import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNewsItemState, useNewsListState } from '../../store/store.ts';
import InternalServerError from '../../components/InternalServerError/InternalServerError.tsx';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled.ts';
import NotFoundPage from '../NotFoundPage/NotFoundPage.tsx';
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
  const { newsItem, itemServerDown, itemLoading, commentsLoading, getNewsContent, getNewsItem } = useNewsItemState();
  const { newsList } = useNewsListState();
  const { id } = useParams();

  const timestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear() - 2000;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  };

  useEffect(() => {
    getNewsItem(Number(id), newsList, false);
    getNewsContent(Number(id), newsList);
  }, [getNewsItem, getNewsContent, id, newsList]);

  useEffect(() => {
    const autoUpdateInterval = setInterval(() => getNewsItem(Number(id), newsList, true), 60000);
    return () => clearInterval(autoUpdateInterval);
  }, [getNewsItem, id, newsList]);

  if (itemServerDown) {
    return <InternalServerError />;
  }
  if (itemLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
  if (newsItem !== null) {
    return (
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
    );
  } else {
    return <NotFoundPage />;
  }
}
