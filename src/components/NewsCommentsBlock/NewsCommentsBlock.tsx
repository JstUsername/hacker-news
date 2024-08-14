import { CommentsWrapper } from './NewsCommentsBlock.styled';
import CommentsItem from '../CommentsItem/CommentsItem';
import { NewsItemTitle, NewsItemTitleAdditional } from '../../commons/NewsItemTitle/NewsItemTitle';
import { NewsCommentsBlockProps } from './NewsCommentsBlock.types';

export default function NewsCommentsBlock({ newsItem }: NewsCommentsBlockProps) {
  return (
    newsItem !== null && (
      <CommentsWrapper>
        <NewsItemTitle>
          Comments
          <NewsItemTitleAdditional>{' ' + newsItem.comments_count}</NewsItemTitleAdditional>
        </NewsItemTitle>
        {newsItem.comments?.map((comment) => {
          if (comment.deleted || comment.dead) {
            return null;
          }
          return <CommentsItem key={comment.id} comment={comment} />;
        })}
      </CommentsWrapper>
    )
  );
}
