import { CommentsItem } from '../CommentsItem';
import { CommentsWrapper } from './NewsCommentsBlock.styled';
import { NewsCommentsBlockProps } from './NewsCommentsBlock.types';
import { NewsItemTitle, NewsItemTitleAdditional } from '~/commons';

export const NewsCommentsBlock = ({ newsItem }: NewsCommentsBlockProps) => {
  return (
    newsItem !== null && (
      <CommentsWrapper>
        <NewsItemTitle>
          Comments
          <NewsItemTitleAdditional>{' ' + newsItem.commentsCount}</NewsItemTitleAdditional>
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
};
