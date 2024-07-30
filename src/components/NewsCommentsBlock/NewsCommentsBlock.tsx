import { useSelectorCommentsLoading, useSelectorNewsItem } from '../../store/store.ts';
import { Loader } from '../NewsList/NewsList.styled.ts';
import { CommentsWrapper, CommentsLoaderWrapper } from './NewsCommentsBlock.styled.ts';
import CommentsItem from '../CommentsItem/CommentsItem.tsx';
import { NewsItemTitle, NewsItemTitleAdditional } from '../../commons/NewsItemTitle.ts';

export default function NewsCommentsBlock() {
  const newsItem = useSelectorNewsItem();
  const commentsLoading = useSelectorCommentsLoading();

  return (
    newsItem !== null && (
      <CommentsWrapper>
        <NewsItemTitle>
          Comments
          <NewsItemTitleAdditional>{' ' + newsItem.comments_count}</NewsItemTitleAdditional>
        </NewsItemTitle>
        {!commentsLoading ? (
          newsItem.comments.map((comment) => <CommentsItem key={comment.id} comment={comment} />)
        ) : (
          <CommentsLoaderWrapper>
            <Loader />
          </CommentsLoaderWrapper>
        )}
      </CommentsWrapper>
    )
  );
}
