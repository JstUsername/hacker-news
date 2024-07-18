import { useEffect } from 'react';
import { useNewsItemState } from '../../store/store.ts';
import { useParams } from 'react-router-dom';
import InternalServerError from '../../components/InternalServerError/InternalServerError.tsx';
import { Loader, LoaderWrapper } from '../../components/NewsList/NewsList.styled.ts';
import styled from 'styled-components';
import NotFoundPage from '../NotFoundPage/NotFoundPage.tsx';

export default function NewsItemPage() {
  const { newsItem, itemServerDown, itemLoading, getNewsItem } = useNewsItemState();
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
    getNewsItem(Number(id));
  }, [getNewsItem, id]);

  return (
    <>
      {itemServerDown ? (
        <InternalServerError />
      ) : (
        <>
          {itemLoading ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            <>
              {newsItem !== null ? (
                <NewsItemWrapper>
                  <ContentWrapper>
                    <NewsItemTitle>{newsItem.title}</NewsItemTitle>
                    <ContentBottomWrapper>
                      <LinkToNews>
                        Link: <a href={newsItem.url}>{newsItem.url}</a>
                      </LinkToNews>
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
                  </CommentsWrapper>
                </NewsItemWrapper>
              ) : (
                <NotFoundPage />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

const NewsItemWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, 1fr);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 24px;
  gap: 18px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - (88px + 64px));
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - (72px + 48px));
    padding: 16px;
  }
`;

const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  width: 100%;
  overflow: hidden;
  gap: 48px;
  padding: 24px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.backgroundLightTransparent};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

const ContentBottomWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
`;

const CommentsWrapper = styled('div')`
  align-self: stretch;
  gap: 24px;
  padding: 24px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.backgroundLightTransparent};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

const NewsItemTitle = styled('h1')`
  ${({ theme }) => theme.typography.h1};
  margin: 0;
  word-break: break-word;
  color: ${({ theme }) => theme.color.purple};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
  }
  span {
    color: ${({ theme }) => theme.color.green};
  }
`;

const LinkToNews = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.green};
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  a {
    color: ${({ theme }) => theme.color.green};
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Points = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.yellow};
`;

const By = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.green};
  span {
    color: ${({ theme }) => theme.color.purple};
  }
`;

const Time = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.yellow};
`;

const ByTimeWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
