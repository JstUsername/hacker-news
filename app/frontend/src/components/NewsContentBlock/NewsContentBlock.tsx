import {
  ByTimeWrapper,
  ContentBottomWrapper,
  ContentHeaderWrapper,
  ContentWrapper,
  LinkToNews,
  LinkToNewsWrapper,
} from './NewsContentBlock.styled';
import { NewsContentBlockProps } from './NewsContentBlock.types';
import { NewsItemTitle, Text } from '~/commons';
import { timestampToDate } from '~/utils';

export const NewsContentBlock = ({ newsItem }: NewsContentBlockProps) => {
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
};
