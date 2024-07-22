import { CommentsListProps } from './CommentsItem.types.ts';
import { useNewsItemState } from '../../store/store.ts';
import {
  CommentsItemWrapper,
  CommentsItemContent,
  CommentsItemUser,
  CommentsChildItemWrapper,
  ExpandWrapper,
  ExpandIcon,
} from './CommentsItem.styled.ts';

export default function CommentsItem({ comment }: CommentsListProps) {
  const { newsItem, setExpandVisible } = useNewsItemState();

  const handleClickExpand = (id: number) => {
    setExpandVisible(id, newsItem);
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
      {comment.comments.length > 0 && (
        <>
          {comment.comments.map((childComment) => (
            <CommentsChildItemWrapper key={childComment.id} $isVisible={childComment.visible}>
              <CommentsItem comment={childComment} />
            </CommentsChildItemWrapper>
          ))}
        </>
      )}
    </CommentsItemWrapper>
  );
}
