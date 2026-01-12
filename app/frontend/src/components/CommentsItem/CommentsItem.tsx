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
import { useParams } from 'react-router-dom';
import { Text, Textarea } from '~/commons';
import { WENT_WRONG_ERROR } from '~/constants';
import { useSelectorGetNewsItem, useSelectorIsAuthenticated, useSelectorParsedAccessToken } from '~/store';
import { authenticatedApiRequest } from '~/utils';

const fetchAddComment = async (parentId: number, content: string): Promise<void> => {
  await authenticatedApiRequest(`/api/items/${parentId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
};

const fetchRemoveComment = async (commentId: number): Promise<void> => {
  await authenticatedApiRequest(`/api/items/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const CommentsItem = ({ comment }: CommentsListProps) => {
  const { id: newsId } = useParams();
  const parsedAccessToken = useSelectorParsedAccessToken();
  const isAuthenticated = useSelectorIsAuthenticated();
  const getNewsItem = useSelectorGetNewsItem();

  const [isExpand, setIsExpand] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReplyCancel = () => {
    setReplyText('');
    setIsReplyFormOpen(false);
  };

  const handleReplySubmit = useCallback(async () => {
    if (!replyText.trim() || isReplyLoading) return;
    setIsReplyLoading(true);

    try {
      await fetchAddComment(comment.id, replyText);
      setReplyText('');
      setIsReplyFormOpen(false);
      getNewsItem(+(newsId || 0));
    } catch {
      setError(WENT_WRONG_ERROR);
    } finally {
      setIsReplyLoading(false);
    }
  }, [comment.id, getNewsItem, isReplyLoading, newsId, replyText]);

  const handleRemoveComment = useCallback(async () => {
    setIsRemoveLoading(true);

    try {
      await fetchRemoveComment(comment.id);
      getNewsItem(+(newsId || 0));
    } catch (err) {
      console.error('Error when trying to delete a comment', err);
    } finally {
      setIsRemoveLoading(false);
    }
  }, [comment.id, getNewsItem, newsId]);

  const isCurrentUserAuthor = useMemo(() => {
    if (!parsedAccessToken?.username || !comment.user) return false;
    return parsedAccessToken.username === comment.user;
  }, [comment.user, parsedAccessToken?.username]);

  return (
    <CommentsItemWrapper>
      <div>
        <ExpandWrapper>
          <ExpandIcon
            $isVisibleIcon={comment.comments.length !== 0}
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
