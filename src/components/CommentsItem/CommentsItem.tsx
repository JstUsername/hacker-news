import { useState } from 'react';
import { CommentsListProps } from './CommentsItem.types.ts';
import { useSelectorNewsItem } from '../../store/states/newsItemState/newsItemState.ts';
import {
  CommentsItemWrapper,
  CommentsItemContent,
  CommentsItemUser,
  CommentsChildItemWrapper,
  ExpandWrapper,
  ExpandIcon,
} from './CommentsItem.styled.ts';
import { NewsItemType } from '../../store/states/newsItemState/newsItemState.types.ts';

export default function CommentsItem({ comment }: CommentsListProps) {
  const newsItem = useSelectorNewsItem();
  const [expandVisible, setExpandVisible] = useState(newsItem);

  const toggleExpandVisible = (id: number) => {
    if (expandVisible === null) return;
    const newData = { ...expandVisible };
    const toggleExpandVisible = (obj: NewsItemType) => {
      if (obj.id === id) {
        obj.expand = !obj.expand;
        obj.comments.map((childComments) => {
          childComments.visible = !childComments.visible;
        });
        setExpandVisible({ ...newData });
      }
      if (obj.comments && obj.comments.length > 0) {
        obj.comments.forEach(toggleExpandVisible);
      }
    };
    toggleExpandVisible(newData);
  };

  const handleClickExpand = (id: number) => {
    toggleExpandVisible(id);
  };

  return (
    <CommentsItemWrapper>
      <div>
        <ExpandWrapper>
          <ExpandIcon
            $isVisibleIcon={comment.comments.length !== 0}
            $isExpand={comment.expand}
            onClick={() => {
              handleClickExpand(comment.id);
            }}
          />
          <CommentsItemUser>{comment.user}</CommentsItemUser>
        </ExpandWrapper>
        <CommentsItemContent dangerouslySetInnerHTML={{ __html: comment.content }} />
      </div>
      {comment.comments.length > 0 &&
        comment.comments.map((childComment: NewsItemType) => (
          <CommentsChildItemWrapper key={childComment.id} $isVisible={childComment.visible}>
            <CommentsItem comment={childComment} />
          </CommentsChildItemWrapper>
        ))}
    </CommentsItemWrapper>
  );
}
