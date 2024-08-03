import { NewsListItemProps } from './NewsListItem.types';
import { fromUnixTime, formatDistanceToNow } from 'date-fns';
import {
  NewsListItemWrapper,
  NewsTitle,
  TimeAgo,
  PointsWrapper,
  UserTimeAgoWrapper,
  Points,
  By,
  User,
  CardBottom,
} from './NewsListItem.styled';

export default function NewsListItem({ id, title, points, user, time }: NewsListItemProps) {
  const timestampToAgo = (timestamp: number) => {
    const date = fromUnixTime(timestamp);
    return formatDistanceToNow(date, { addSuffix: true }).toString();
  };

  return (
    <NewsListItemWrapper to={`/news/${id}`}>
      <NewsTitle>{title}</NewsTitle>
      <CardBottom>
        <PointsWrapper>
          <Points>{points} points </Points>
        </PointsWrapper>
        <UserTimeAgoWrapper>
          <span>
            <By>by </By>
            <User>{user}</User>
          </span>
          <TimeAgo>{timestampToAgo(time)}</TimeAgo>
        </UserTimeAgoWrapper>
      </CardBottom>
    </NewsListItemWrapper>
  );
}
