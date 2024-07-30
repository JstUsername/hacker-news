import { lazy, Suspense } from 'react';
import { useSelectorNewsItem } from '../../store/store.ts';
import { Loader } from '../NewsList/NewsList.styled.ts';
import { CommentsWrapper, CommentsLoaderWrapper } from './NewsCommentsBlock.styled.ts';
import { NewsItemTitle, NewsItemTitleAdditional } from '../../commons/NewsItemTitle.ts';

export default function NewsCommentsBlock() {
  const CommentsItem = lazy(() => import('../CommentsItem/CommentsItem.tsx'));
  const newsItem = useSelectorNewsItem();

  return (
    newsItem !== null && (
      <CommentsWrapper>
        <NewsItemTitle>
          Comments
          <NewsItemTitleAdditional>{' ' + newsItem.comments_count}</NewsItemTitleAdditional>
        </NewsItemTitle>
        <Suspense
          fallback={
            <CommentsLoaderWrapper>
              <Loader />
            </CommentsLoaderWrapper>
          }
        >
          {newsItem.comments.map((comment) => (
            <CommentsItem key={comment.id} comment={comment} />
          ))}
        </Suspense>
      </CommentsWrapper>
    )
  );
}
