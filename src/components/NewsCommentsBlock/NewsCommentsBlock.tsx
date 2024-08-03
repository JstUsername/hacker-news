import { useCallback, useEffect, useState } from 'react';
import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState.ts';
import { CommentsWrapper } from './NewsCommentsBlock.styled.ts';
import CommentsItem from '../CommentsItem/CommentsItem.tsx';
import { NewsItemTitle, NewsItemTitleAdditional } from '../../commons/NewsItemTitle/NewsItemTitle.ts';
import { NewsItemType } from '../../store/states/newsItemState/newsItemState.types.ts';

export default function NewsCommentsBlock() {
  const newsItem = useSelectorNewsItem();
  const [commentItems, setCommentItems] = useState<NewsItemType[] | null>(null);

  const addFieldsToComments = useCallback((comments: NewsItemType[]) => {
    return comments.map((comment) => {
      comment.visible = false;
      comment.expand = false;
      if (comment.comments && comment.comments.length > 0) {
        comment.comments = addFieldsToComments(comment.comments);
      }
      return comment;
    });
  }, []);

  const toggleExpandVisible = (id: number, comments = commentItems as NewsItemType[]) => {
    const updateComments = (comments: NewsItemType[]): NewsItemType[] => {
      return comments.map((comment) => {
        if (comment.id === id) {
          const newExpand = !comment.expand;
          return {
            ...comment,
            expand: newExpand,
            comments: comment.comments.map((childComment) => ({
              ...childComment,
              visible: newExpand,
            })),
          };
        } else if (comment.comments.length > 0) {
          return {
            ...comment,
            comments: updateComments(comment.comments),
          };
        }
        return comment;
      });
    };
    setCommentItems(updateComments(comments));
  };

  useEffect(() => {
    if (newsItem?.comments) {
      setCommentItems(addFieldsToComments(newsItem?.comments));
    }
  }, [addFieldsToComments, newsItem]);

  return (
    newsItem !== null && (
      <CommentsWrapper>
        <NewsItemTitle>
          Comments
          <NewsItemTitleAdditional>{' ' + newsItem.comments_count}</NewsItemTitleAdditional>
        </NewsItemTitle>
        {commentItems?.map((comment) => {
          if (comment.deleted || comment.dead) {
            return null;
          }
          return <CommentsItem key={comment.id} comment={comment} toggleExpandVisible={toggleExpandVisible} />;
        })}
      </CommentsWrapper>
    )
  );
}
