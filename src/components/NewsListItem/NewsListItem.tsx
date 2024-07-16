import { NewsListItemProps } from './NewsListItem.types.ts';
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
} from './NewsListItem.styled.ts';

export default function NewsListItem({ id, title, points, user, time_ago }: NewsListItemProps) {
  return (
    <NewsListItemWrapper id={`${id}`} tabIndex={0}>
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
          <TimeAgo>{time_ago}</TimeAgo>
        </UserTimeAgoWrapper>
      </CardBottom>
    </NewsListItemWrapper>
  );
}
