import { NewsItemType } from '~/types';

export interface UseNewsItemType {
  newsItem: Promise<NewsItemType | null>;
  commentsCount: number;
  initializeCommentsCount: () => Promise<void>;
  getNewsItem: (id: number) => void;
  addComment: ({ parentId, comment }: { parentId: number; comment: NewsItemType }) => Promise<void>;
  removeComment: (id: number) => Promise<void>;
  resetNewsItem: () => void;
}
