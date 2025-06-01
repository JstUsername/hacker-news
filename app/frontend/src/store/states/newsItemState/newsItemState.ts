import { wentWrongError } from '../../../constants';
import { NewsItemType, UseNewsItemType } from './newsItemState.types';
import { create } from 'zustand';

const EXPRESS_HOST = import.meta.env.VITE_EXPRESS_HOST || 'localhost';
const EXPRESS_PORT = parseInt(import.meta.env.VITE_EXPRESS_PORT || '3001');

const fetchNewsItem = async (id: number) => {
  let data: NewsItemType | null = null;
  const response = await fetch(`http://${EXPRESS_HOST}:${EXPRESS_PORT}/api/item/${id}`);

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
