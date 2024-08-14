import { NewsListItemProps } from './NewsListItem.types';
import { timestampToAgo } from '../../utils/dateUtils';
import { Text } from '../../commons/Text/Text';
import { NewsListItemWrapper, NewsTitle, PointsWrapper, UserTimeAgoWrapper, CardBottom } from './NewsListItem.styled';

export default function NewsListItem({ id, title, points, user, time }: NewsListItemProps) {
  return (
    <NewsListItemWrapper to={`/news/${id}`}>
      <NewsTitle>{title}</NewsTitle>
      <CardBottom>
        <PointsWrapper>
          <Text $variant="body1" color="yellow">
            {points} points{' '}
          </Text>
        </PointsWrapper>
        <UserTimeAgoWrapper>
          <Text $variant="body1" color="green">
            {user}
          </Text>
          <Text $variant="body1" color="green">
            {timestampToAgo(time)}
          </Text>
        </UserTimeAgoWrapper>
      </CardBottom>
    </NewsListItemWrapper>
  );
}
