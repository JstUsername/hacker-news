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
  points?: number | null;
  user?: string | null;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url?: string;
  domain?: string;
}

export interface UseNewsItemType {
  newsItem: NewsItem | null;
  itemLoading: boolean;
  itemServerDown: boolean;
  getNewsItem: (id: number) => Promise<void>;
}

export interface NewsItem {
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
  comments: NewsItem[];
  level: number;
  comments_count: number;
}
