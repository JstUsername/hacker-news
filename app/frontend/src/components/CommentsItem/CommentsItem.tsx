import {
  CommentActionsBlock,
  CommentsItemContent,
  CommentsItemUser,
  CommentsItemWrapper,
  ExpandIcon,
  ExpandWrapper,
  RemoveButton,
  ReplyButton,
  StyledReplyIcon,
  StyledTrashIcon,
} from './CommentsItem.styled';
import { CommentsListProps } from './CommentsItem.types';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Text, Textarea } from '~/commons';
import { WENT_WRONG_ERROR } from '~/constants';
import {
  useSelectorAddComment,
  useSelectorIsAuthenticated,
  useSelectorParsedAccessToken,
  useSelectorRemoveComment,
} from '~/store';
import { fetchAddComment, fetchRemoveComment } from '~/utils';

export const CommentsItem = ({ comment }: CommentsListProps) => {
  const parsedAccessToken = useSelectorParsedAccessToken();
  const isAuthenticated = useSelectorIsAuthenticated();
  const addComment = useSelectorAddComment();
  const removeComment = useSelectorRemoveComment();

  const [isExpand, setIsExpand] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReplyCancel = () => {
    setReplyText('');
    setError('');
    setIsReplyFormOpen(false);
  };

  const handleReplySubmit = useCallback(async () => {
    if (!replyText.trim() || isReplyLoading) return;
    setIsReplyLoading(true);

    try {
      const addedComment = await fetchAddComment(comment.id, replyText);
      await addComment({ parentId: comment.id, comment: addedComment });
      setReplyText('');
      setIsReplyFormOpen(false);
    } catch {
      setError(WENT_WRONG_ERROR);
    } finally {
      setIsReplyLoading(false);
    }
  }, [addComment, comment.id, isReplyLoading, replyText]);

  const handleRemoveComment = useCallback(async () => {
    setIsRemoveLoading(true);

    try {
      await fetchRemoveComment(comment.id);
      await removeComment(comment.id);
    } catch (err) {
      console.error('Error when trying to delete a comment', err);
      toast.error(WENT_WRONG_ERROR);
    } finally {
      setIsRemoveLoading(false);
    }
  }, [comment.id, removeComment]);

  const isCurrentUserAuthor = useMemo(() => {
    if (!parsedAccessToken?.username || !comment.user) return false;
    return parsedAccessToken.username === comment.user;
  }, [comment.user, parsedAccessToken?.username]);

  return (
    <CommentsItemWrapper>
      <div>
        <ExpandWrapper>
          <ExpandIcon
            $isVisibleIcon={!!comment.comments?.length}
            $isExpand={isExpand}
            onClick={() => setIsExpand(!isExpand)}
          />
          <CommentsItemUser>{comment.user}</CommentsItemUser>
          <CommentActionsBlock>
            {isAuthenticated && !isReplyFormOpen && (
              <ReplyButton onClick={() => setIsReplyFormOpen(true)} disabled={isReplyLoading}>
                <Text $variant="body2" color="yellow">
                  Reply
                </Text>
                <StyledReplyIcon />
              </ReplyButton>
            )}
            {isCurrentUserAuthor && (
              <RemoveButton onClick={handleRemoveComment} disabled={isRemoveLoading}>
                <StyledTrashIcon />
              </RemoveButton>
            )}
          </CommentActionsBlock>
        </ExpandWrapper>
        <CommentsItemContent>{comment.content}</CommentsItemContent>
        {isAuthenticated && isReplyFormOpen && (
          <Textarea
            value={replyText}
            onChange={setReplyText}
            onSubmit={handleReplySubmit}
            onCancel={handleReplyCancel}
            placeholder="Write a reply..."
            submitLabel="Reply"
            isLoading={isReplyLoading}
            error={error}
          />
        )}
      </div>
      {isExpand &&
        comment.comments?.map((childComment) => {
          if (childComment.deleted || childComment.dead) return null;
          return <CommentsItem key={childComment.id} comment={childComment} />;
        })}
    </CommentsItemWrapper>
  );
};
