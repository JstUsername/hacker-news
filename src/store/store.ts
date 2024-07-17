import { create } from 'zustand';
import { UseNewsListStateType, NewsListType } from './store.types.ts';

const newsListUrl = [
  `https://api.hnpwa.com/v0/newest/1.json?t=${new Date().getTime()}`,
  `https://api.hnpwa.com/v0/newest/2.json?t=${new Date().getTime()}`,
  `https://api.hnpwa.com/v0/newest/3.json?t=${new Date().getTime()}`,
  `https://api.hnpwa.com/v0/newest/4.json?t=${new Date().getTime()}`,
];

export const useNewsListState = create<UseNewsListStateType>((set) => ({
  newsList: [],
  isLoading: false,
  updateNewsList: async () => {
    set({ isLoading: true });
    let data: NewsListType[] | [] = [];
    for (let i = 0; i < newsListUrl.length; i++) {
      const response = await fetch(newsListUrl[i]);
      let fetchPromise = await response.json();
      i === 3 ? (fetchPromise = fetchPromise.slice(0, 10)) : null;
      data = data.concat(fetchPromise);
      set({ newsList: data });
      i === 0 ? set({ isLoading: false }) : null;
    }
  },
}));
