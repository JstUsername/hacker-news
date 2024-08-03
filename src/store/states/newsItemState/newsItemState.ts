import { create } from 'zustand';
import { NewsItemType, UseNewsItemType, SetTypeItem } from './newsItemState.types';

const fetchNewsItem = async (set: SetTypeItem, id: number) => {
  let data: NewsItemType | null = null;
  const response = await fetch(`https://api.hnpwa.com/v0/item/${id}.json`);

  if (response.status === 500) {
    set({ itemServerDown: true });
    return null;
  }

  data = await response.json();
  return data;
};

const useNewsItemState = create<UseNewsItemType>((set) => ({
  newsItem: new Promise((resolve) => resolve(null)),
  itemLoading: false,
  commentsLoading: false,
  itemServerDown: false,

  getNewsItem: (id) => {
    set({ newsItem: fetchNewsItem(set, id) });
  },
}));

export const useSelectorNewsItem = () => useNewsItemState((state) => state.newsItem);
export const useSelectorItemServerDown = () => useNewsItemState((state) => state.itemServerDown);
export const useSelectorGetNewsItem = () => useNewsItemState((state) => state.getNewsItem);
