//@ts-ignore
import { use } from 'react';
import { fromUnixTime, lightFormat } from 'date-fns';
import {
  By,
  ByTimeWrapper,
  ContentBottomWrapper,
  ContentHeaderWrapper,
  ContentWrapper,
  LinkToNews,
  Points,
  Time,
} from './NewsContentBlock.styled.ts';
import { NewsItemTitle } from '../../commons/NewsItemTitle/NewsItemTitle.ts';
import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState.ts';

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
    )
  );
}
