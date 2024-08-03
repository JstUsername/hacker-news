import { use } from 'react';
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
import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState';

export default function NewsContentBlock() {
  const newsItem = use(useSelectorNewsItem());

  const timestampToDate = (timestamp: number) => {
    const date = fromUnixTime(timestamp);
    return lightFormat(date, 'HH:mm dd.MM.yy').toString();
  };

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
