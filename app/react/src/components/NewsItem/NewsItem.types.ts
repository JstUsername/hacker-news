import { Dispatch, SetStateAction } from 'react';

export interface NewsItemProps {
  setIsPageNotFound: Dispatch<SetStateAction<boolean>>;
}
