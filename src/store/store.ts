import { create } from 'zustand';
import { NewsItem, NewsListType, UseNewsItemType, UseNewsListStateType } from './store.types.ts';

const newsListUrl = [
  'https://api.hnpwa.com/v0/newest/1.json',
  'https://api.hnpwa.com/v0/newest/2.json',
  'https://api.hnpwa.com/v0/newest/3.json',
  'https://api.hnpwa.com/v0/newest/4.json',
];

export const useNewsListState = create<UseNewsListStateType>((set, get) => ({
  newsList: [],
  newsLoading: false,
  newsServerDown: false,
  getNewsList: async () => {
    set({ newsLoading: true });
    let data: NewsListType[] | [] = [];
    for (let i = 0; i < newsListUrl.length; i++) {
      const response = await fetch(`${newsListUrl[i]}?t=${new Date().getTime()}`);
      if (response.status === 500) {
        set({ newsLoading: false, newsServerDown: true });
        return;
      }
      let fetchPromise = await response.json();
      i === 3 ? (fetchPromise = fetchPromise.slice(0, 10)) : null;
      data = data.concat(fetchPromise);
      set({ newsList: data });
      i === 0 ? set({ newsLoading: false }) : null;
    }
  },
  updateNewsList: async (auto) => {
    !auto ? set({ newsLoading: true }) : null;
    const response = await fetch(`${newsListUrl[0]}?t=${new Date().getTime()}`);
    if (response.status === 500) {
      !auto ? set({ newsLoading: false }) : null;
      set({ newsServerDown: true });
      return;
    }
    let fetchPromise = await response.json();
    const newData = fetchPromise.filter((newNewsItem: NewsListType) =>
      get().newsList.every((oldNewsItem) => newNewsItem.id !== oldNewsItem.id),
    );
    if (newData.length === 0) {
      !auto ? set({ newsLoading: false }) : null;
      return;
    }
    set({ newsList: newData.concat(get().newsList).slice(0, 100) });
    !auto ? set({ newsLoading: false }) : null;
  },
}));

export const useNewsItemState = create<UseNewsItemType>((set) => ({
  newsItem: null,
  itemLoading: false,
  itemServerDown: false,
  getNewsItem: async (id) => {
    set({ itemLoading: true });
    let data: NewsItem | null = null;
    const response = await fetch(`https://api.hnpwa.com/v0/item/${id}.json`);
    if (response.status === 500) {
      set({ itemLoading: false, itemServerDown: true });
      return;
    }
    data = await response.json();
    set({ itemLoading: false, newsItem: data });
  },
}));
