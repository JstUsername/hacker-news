import {
  CommentsItemContent,
  CommentsItemUser,
  CommentsItemWrapper,
  ExpandIcon,
  ExpandWrapper,
} from './CommentsItem.styled';
import { CommentsListProps } from './CommentsItem.types';
import { useState } from 'react';

export const CommentsItem = ({ comment }: CommentsListProps) => {
  const [isExpand, setIsExpand] = useState(false);

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
        </ExpandWrapper>
        <CommentsItemContent>{comment.content}</CommentsItemContent>
      </div>
      {isExpand &&
        comment.comments?.map((childComment) => {
          if (childComment.deleted || childComment.dead) return null;
          return <CommentsItem key={childComment.id} comment={childComment} />;
        })}
    </CommentsItemWrapper>
  );
};
