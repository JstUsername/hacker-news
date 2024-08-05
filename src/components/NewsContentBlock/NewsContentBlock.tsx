import { timestampToDate } from '../../utils/timestampToDate';
import { Text } from '../../commons/Text/Text';
import {
  ByTimeWrapper,
  ContentBottomWrapper,
  ContentHeaderWrapper,
  ContentWrapper,
  LinkToNews,
  LinkToNewsWrapper,
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
          <Text $variant="body2" color="yellow">
            {newsItem.points} points
          </Text>
          <ByTimeWrapper>
            <Text $variant="body2" color="green">
              By:{' '}
              <Text $variant="body2" color="purple">
                {newsItem.user}
              </Text>
            </Text>
            <Text $variant="body2" color="yellow">
              {timestampToDate(newsItem.time)}
            </Text>
          </ByTimeWrapper>
        </ContentBottomWrapper>
      </ContentWrapper>
    )
  );
}
