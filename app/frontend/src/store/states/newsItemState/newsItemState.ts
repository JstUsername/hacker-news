import { UseNewsItemType } from './newsItemState.types';
import { create } from 'zustand';
import { NewsItemType } from '~/types';
import { fetchNewsItem } from '~/utils';

const useNewsItemState = create<UseNewsItemType>((set, getState) => ({
  newsItem: Promise.resolve(null),
  commentsCount: 0,

  initializeCommentsCount: async () => {
    const newsItem = await getState().newsItem;
    if (!newsItem) return;
    set({ commentsCount: newsItem.commentsCount });
  },

  getNewsItem: async (id) => {
    const newsItemPromise = fetchNewsItem(id);
    set({ newsItem: newsItemPromise });
    await getState().initializeCommentsCount();
  },

  addComment: async ({ parentId, comment }: { parentId: number; comment: NewsItemType }) => {
    const newsItem = await getState().newsItem;
    if (!newsItem) return;

    if (parentId === newsItem.id) {
      const updatedNewsItem = {
        ...newsItem,
        comments: [...(newsItem.comments || []), comment],
      };

      set((state) => ({
        newsItem: Promise.resolve(updatedNewsItem),
        commentsCount: state.commentsCount + 1,
      }));

      return;
    }

    const addCommentById = (
      comments: NewsItemType[],
      targetId: number,
      comment: NewsItemType,
    ): { comments: NewsItemType[]; added: boolean } => {
      const result: NewsItemType[] = [];
      let added = false;

      for (const item of comments) {
        if (item.id === targetId) {
          result.push({
            ...item,
            comments: [...(item.comments || []), comment],
          });

          added = true;
        } else if (!added && item.comments?.length) {
          const nested = addCommentById(item.comments, targetId, comment);

          result.push({
            ...item,
            comments: nested.comments,
          });

          if (nested.added) added = true;
        } else {
          result.push(item);
        }
      }

      return { comments: result, added };
    };

    const { comments: updatedComments } = addCommentById(newsItem.comments || [], parentId, comment);

    const updatedNewsItem = {
      ...newsItem,
      comments: updatedComments,
    };

    set((state) => ({
      newsItem: Promise.resolve(updatedNewsItem),
      commentsCount: state.commentsCount + 1,
    }));
  },

  removeComment: async (id: number) => {
    const newsItem = await getState().newsItem;
    if (!newsItem) return;
    const rootLevelComment = newsItem.comments?.find((c) => c.id === id);

    if (rootLevelComment) {
      const updatedNewsItem = {
        ...newsItem,
        comments: (newsItem.comments || []).filter((c) => c.id !== id),
      };

      set((state) => ({
        newsItem: Promise.resolve(updatedNewsItem),
        commentsCount: state.commentsCount - 1,
      }));

      return;
    }

    const removeCommentById = (
      comments: NewsItemType[],
      targetId: number,
    ): { comments: NewsItemType[]; found: boolean } => {
      const result: NewsItemType[] = [];
      let found = false;

      for (const comment of comments) {
        if (comment.id === targetId) {
          found = true;
          continue;
        }

        if (!found && comment.comments?.length) {
          const nested = removeCommentById(comment.comments, targetId);

          result.push({
            ...comment,
            comments: nested.comments,
          });

          if (nested.found) found = true;
        } else {
          result.push(comment);
        }
      }

      return { comments: result, found };
    };

    const { comments: updatedComments } = removeCommentById(newsItem.comments || [], id);

    const updatedNewsItem = {
      ...newsItem,
      comments: updatedComments,
    };

    set((state) => ({
      newsItem: Promise.resolve(updatedNewsItem),
      commentsCount: state.commentsCount - 1,
    }));
  },

  resetNewsItem: () => set({ newsItem: Promise.resolve(null) }),
}));

export const useSelectorNewsItem = () => useNewsItemState((state) => state.newsItem);
export const useSelectorCommentsCount = () => useNewsItemState((state) => state.commentsCount);
export const useSelectorGetNewsItem = () => useNewsItemState((state) => state.getNewsItem);
export const useSelectorAddComment = () => useNewsItemState((state) => state.addComment);
export const useSelectorRemoveComment = () => useNewsItemState((state) => state.removeComment);
export const useSelectorResetNewsItem = () => useNewsItemState((state) => state.resetNewsItem);
