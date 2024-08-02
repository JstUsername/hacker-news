import { create } from 'zustand';
import { NewsItemType, UseNewsItemType } from './newsItemState.types.ts';

const useNewsItemState = create<UseNewsItemType>((set) => ({
  newsItem: null,
  itemLoading: false,
  commentsLoading: false,
  itemServerDown: false,
  itemPageNotFound: false,
  getNewsItem: async (id) => {
    let data: NewsItemType | null = null;
    const response = await fetch(`https://api.hnpwa.com/v0/item/${id}.json`);
    if (response.status === 500) {
      set({ itemServerDown: true });
      return;
    }
    data = await response.json();
    if (data === null) {
      set({ itemPageNotFound: true });
      return;
    }
    set({ newsItem: data });
  },
  resetNotFoundPage: () => {
    set({ itemPageNotFound: false });
  },
}));

export const useSelectorNewsItem = () => useNewsItemState((state) => state.newsItem);
export const useSelectorItemServerDown = () => useNewsItemState((state) => state.itemServerDown);
export const useSelectorItemPageNotFound = () => useNewsItemState((state) => state.itemPageNotFound);
export const useSelectorGetNewsItem = () => useNewsItemState((state) => state.getNewsItem);
export const useSelectorResetNotFoundPage = () => useNewsItemState((state) => state.resetNotFoundPage);
