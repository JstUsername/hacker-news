import { timestampToDate } from '../../utils/timestampToDate';
import {
  By,
  ByTimeWrapper,
  ContentBottomWrapper,
  ContentHeaderWrapper,
  ContentWrapper,
  LinkToNews,
  LinkToNewsWrapper,
  Points,
  Time,
  User,
} from './NewsContentBlock.styled';
import { NewsItemTitle } from '../../commons/NewsItemTitle/NewsItemTitle';
import { NewsContentBlockProps } from './NewsContentBlock.types';

export default function NewsContentBlock({ newsItem }: NewsContentBlockProps) {
  return (
    !!newsItem && (
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
