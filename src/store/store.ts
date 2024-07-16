import { create } from 'zustand';
import { UseNewsListStateType } from './store.types.ts';

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
    try {
      const fetchPromises = newsListUrl.map((url) => fetch(url).then((response) => response.json()));
      const fetchResult = await Promise.all(fetchPromises);
      const data = [].concat(...fetchResult);
      const dataSliced = data.slice(0, 100);
      set({ newsList: dataSliced });
    } finally {
      set({ isLoading: false });
    }
  },
}));
