import { CommentsItem } from '../CommentsItem';
import { AddCommentButton, CommentsWrapper, NewsTitleContainer, StyledPlusIcon } from './NewsCommentsBlock.styled';
import { NewsCommentsBlockProps } from './NewsCommentsBlock.types';
import { useState } from 'react';
import { NewsTitle, NewsTitleAdditional, Text, Textarea } from '~/commons';
import { WENT_WRONG_ERROR } from '~/constants';
import { useSelectorAddComment, useSelectorCommentsCount, useSelectorIsAuthenticated } from '~/store';
import { fetchAddComment } from '~/utils';

export const NewsCommentsBlock = ({ newsItem }: NewsCommentsBlockProps) => {
  const isAuthenticated = useSelectorIsAuthenticated();
  const commentsCount = useSelectorCommentsCount();
  const addComment = useSelectorAddComment();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddCommentClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || isLoading) return;
    setError('');
    setIsLoading(true);

    try {
      const addedComment = await fetchAddComment(newsItem.id, commentText);
      await addComment({ parentId: newsItem.id, comment: addedComment });
      setCommentText('');
      setShowCommentForm(false);
    } catch {
      setError(WENT_WRONG_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentCancel = () => {
    setCommentText('');
    setShowCommentForm(false);
  };

  return (
    <CommentsWrapper>
      <NewsTitleContainer>
        <NewsTitle>
          Comments
          <NewsTitleAdditional>{' ' + commentsCount}</NewsTitleAdditional>
        </NewsTitle>
        {isAuthenticated && !showCommentForm && (
          <AddCommentButton onClick={handleAddCommentClick}>
            <Text color="yellow" $variant="body2">
              Add Comment
            </Text>
            <StyledPlusIcon />
          </AddCommentButton>
        )}
      </NewsTitleContainer>
      {isAuthenticated && showCommentForm && (
        <Textarea
          value={commentText}
          onChange={setCommentText}
          onSubmit={handleCommentSubmit}
          onCancel={handleCommentCancel}
          placeholder="Write a comment..."
          submitLabel="Add Comment"
          isLoading={isLoading}
          error={error}
        />
      )}
      {newsItem.comments?.map((comment) => {
        if (comment.deleted || comment.dead) return null;
        return <CommentsItem key={comment.id} comment={comment} />;
      })}
    </CommentsWrapper>
  );
};
