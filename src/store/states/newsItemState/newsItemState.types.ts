import { NewsListType } from '../newsListState/newsListState.types.ts';

export interface UseNewsItemType {
  newsItem: NewsItemType | null;
  itemLoading: boolean;
  commentsLoading: boolean;
  itemServerDown: boolean;
  itemPageNotFound: boolean;
  getNewsItem: (id: number, newsList: NewsListType[], auto: boolean) => Promise<void>;
  getNewsContent: (id: number, newsList: NewsListType[]) => void;
  setExpandVisible: (id: number, newsItem: NewsItemType | null) => void;
  resetNotFoundPage: () => void;
}

export interface NewsItemType {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain?: string;
  comments: NewsItemType[];
  level: number;
  comments_count: number;
  visible?: boolean;
  expand?: boolean;
}
