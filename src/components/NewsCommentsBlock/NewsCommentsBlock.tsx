import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState.ts';
import { CommentsWrapper } from './NewsCommentsBlock.styled.ts';
import CommentsItem from '../CommentsItem/CommentsItem.tsx';
import { NewsItemTitle, NewsItemTitleAdditional } from '../../commons/NewsItemTitle/NewsItemTitle.ts';

export default function NewsCommentsBlock() {
  const newsItem = useSelectorNewsItem();

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
