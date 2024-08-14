import { create } from 'zustand';
import { NewsItemType, UseNewsItemType } from './newsItemState.types';
import { wentWrongError } from '../../../constants';

const fetchNewsItem = async (id: number) => {
  let data: NewsItemType | null = null;
  const response = await fetch(`https://api.hnpwa.com/v0/item/${id}.json`);

  if (response.status !== 200) {
    throw new Error(wentWrongError);
  }

  data = await response.json();
  return data;
};

const useNewsItemState = create<UseNewsItemType>((set) => ({
  newsItem: new Promise((resolve) => resolve(null)),

  getNewsItem: (id) => {
    set({ newsItem: fetchNewsItem(id) });
  },
}));

export const useSelectorNewsItem = () => useNewsItemState((state) => state.newsItem);
export const useSelectorGetNewsItem = () => useNewsItemState((state) => state.getNewsItem);
