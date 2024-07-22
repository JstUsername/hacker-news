export interface UseNewsListStateType {
  newsList: NewsListType[] | [];
  newsLoading: boolean;
  newsServerDown: boolean;
  getNewsList: () => Promise<void>;
  updateNewsList: (auto: boolean) => Promise<void>;
}

export interface NewsListType {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url?: string;
  domain?: string;
}

export interface UseNewsItemType {
  newsItem: NewsItemType | null;
  itemLoading: boolean;
  commentsLoading: boolean;
  itemServerDown: boolean;
  getNewsItem: (id: number, newsList: NewsListType[], auto: boolean) => Promise<void>;
  getNewsContent: (id: number, newsList: NewsListType[]) => void;
  setExpandVisible: (id: number, newsItem: NewsItemType | null) => void;
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
