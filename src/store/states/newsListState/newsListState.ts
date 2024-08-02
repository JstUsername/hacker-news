import { create } from 'zustand';
import { UseNewsListStateType, NewsListType } from './newsListState.types.ts';

const newsListUrl = [
  'https://api.hnpwa.com/v0/newest/1.json',
  'https://api.hnpwa.com/v0/newest/2.json',
  'https://api.hnpwa.com/v0/newest/3.json',
  'https://api.hnpwa.com/v0/newest/4.json',
];

const useNewsListState = create<UseNewsListStateType>((set) => ({
  newsList: [],
  newsLoading: false,
  newsServerDown: false,
  getNewsList: async () => {
    let data: NewsListType[] | [] = [];
    const fetchPromises = newsListUrl.map(async (url) => {
      const response = await fetch(`${url}?t=${new Date().getTime()}`);
      if (response.status === 500) {
        set({ newsServerDown: true });
        return;
      }
      return response.json();
    });
    const promisesResults = await Promise.all(fetchPromises);
    data = data.concat(...promisesResults);
    set({ newsList: data });
  },
}));

export const useSelectorNewsList = () => useNewsListState((state) => state.newsList);
export const useSelectorNewsServerDown = () => useNewsListState((state) => state.newsServerDown);
export const useSelectorGetNewsList = () => useNewsListState((state) => state.getNewsList);
