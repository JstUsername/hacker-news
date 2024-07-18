import { create } from 'zustand';
import { UseNewsListStateType, NewsListType } from './store.types.ts';

const newsListUrl = [
  'https://api.hnpwa.com/v0/newest/1.json',
  'https://api.hnpwa.com/v0/newest/2.json',
  'https://api.hnpwa.com/v0/newest/3.json',
  'https://api.hnpwa.com/v0/newest/4.json',
];

export const useNewsListState = create<UseNewsListStateType>((set, get) => ({
  newsList: [],
  isLoading: false,
  isServerDown: false,
  getNewsList: async () => {
    set({ isLoading: true });
    let data: NewsListType[] | [] = [];
    for (let i = 0; i < newsListUrl.length; i++) {
      const response = await fetch(`${newsListUrl[i]}?t=${new Date().getTime()}`);
      if (response.status === 500) {
        set({ isLoading: false });
        set({ isServerDown: true });
        return;
      }
      let fetchPromise = await response.json();
      i === 3 ? (fetchPromise = fetchPromise.slice(0, 10)) : null;
      data = data.concat(fetchPromise);
      set({ newsList: data });
      i === 0 ? set({ isLoading: false }) : null;
    }
  },
  updateNewsList: async (auto) => {
    !auto ? set({ isLoading: true }) : null;
    const response = await fetch(`${newsListUrl[0]}?t=${new Date().getTime()}`);
    if (response.status === 500) {
      !auto ? set({ isLoading: false }) : null;
      set({ isServerDown: true });
      return;
    }
    let fetchPromise = await response.json();
    const newData = fetchPromise.filter((newNewsItem: NewsListType) =>
      get().newsList.every((oldNewsItem) => newNewsItem.id !== oldNewsItem.id),
    );
    if (newData.length === 0) {
      !auto ? set({ isLoading: false }) : null;
      return;
    }
    set({ newsList: newData.concat(get().newsList).slice(0, 100) });
    !auto ? set({ isLoading: false }) : null;
  },
}));
