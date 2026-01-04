import { CardBottom, NewsListItemWrapper, NewsTitle, PointsWrapper, UserTimeAgoWrapper } from './NewsListItem.styled';
import { NewsListItemProps } from './NewsListItem.types';
import { Text } from '~/commons';
import { timestampToAgo } from '~/utils';

export const NewsListItem = ({ id, title, points, user, time }: NewsListItemProps) => {
  return (
    <NewsListItemWrapper to={`/news/${id}`}>
      <NewsTitle>{title}</NewsTitle>
      <CardBottom>
        <PointsWrapper>
          <Text $variant="body2" color="yellow">
            {points} points{' '}
          </Text>
        </PointsWrapper>
        <UserTimeAgoWrapper>
          <Text $variant="body2" color="green">
            {user}
          </Text>
          <Text $variant="body2" color="green">
            {timestampToAgo(time)}
          </Text>
        </UserTimeAgoWrapper>
      </CardBottom>
    </NewsListItemWrapper>
  );
};
