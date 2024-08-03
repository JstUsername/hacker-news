import { create } from 'zustand';
import { UseNewsListStateType, NewsListType, SetTypeList } from './newsListState.types.ts';

const newsListUrl = [
  'https://api.hnpwa.com/v0/newest/1.json',
  'https://api.hnpwa.com/v0/newest/2.json',
  'https://api.hnpwa.com/v0/newest/3.json',
  'https://api.hnpwa.com/v0/newest/4.json',
];

const fetchNewsList = async (set: SetTypeList) => {
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
  return data.concat(...promisesResults);
};

const useNewsListState = create<UseNewsListStateType>((set) => ({
  newsList: new Promise((resolve) => resolve([])),
  newsServerDown: false,
  getNewsList: () => set({ newsList: fetchNewsList(set) }),
}));

export const useSelectorNewsList = () => useNewsListState((state) => state.newsList);
export const useSelectorNewsServerDown = () => useNewsListState((state) => state.newsServerDown);
export const useSelectorGetNewsList = () => useNewsListState((state) => state.getNewsList);
