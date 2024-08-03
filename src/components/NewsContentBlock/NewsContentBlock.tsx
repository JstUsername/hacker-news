import { use, useEffect } from 'react';
import { fromUnixTime, lightFormat } from 'date-fns';
import {
  By,
  ByTimeWrapper,
  ContentBottomWrapper,
  ContentHeaderWrapper,
  ContentWrapper,
  LinkToNewsWrapper,
  LinkToNews,
  Points,
  Time,
  User,
} from './NewsContentBlock.styled';
import { NewsItemTitle } from '../../commons/NewsItemTitle/NewsItemTitle';
import { NewsContentBlockProps } from './NewsContentBlock.types';
import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState';

export default function NewsContentBlock({ setIsPageNotFound }: NewsContentBlockProps) {
  const newsItem = use(useSelectorNewsItem());

  const timestampToDate = (timestamp: number) => {
    const date = fromUnixTime(timestamp);
    return lightFormat(date, 'HH:mm dd.MM.yy').toString();
  };

  useEffect(() => {
    if (newsItem === null) {
      setIsPageNotFound(true);
    }
  }, [setIsPageNotFound, newsItem]);

  return (
    newsItem !== null && (
      <ContentWrapper>
        <ContentHeaderWrapper>
          <NewsItemTitle>{newsItem.title}</NewsItemTitle>
          <LinkToNewsWrapper>
            Link: <LinkToNews href={newsItem.url}>{newsItem.url}</LinkToNews>
          </LinkToNewsWrapper>
        </ContentHeaderWrapper>
        <ContentBottomWrapper>
          <Points>{newsItem.points} points</Points>
          <ByTimeWrapper>
            <By>
              By: <User>{newsItem.user}</User>
            </By>
            <Time>{timestampToDate(newsItem.time)}</Time>
          </ByTimeWrapper>
        </ContentBottomWrapper>
      </ContentWrapper>
    )
  );
}
