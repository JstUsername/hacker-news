import { MeResponse } from '~/types';

export interface UseAuthStateType {
  accessToken: string | null;
  parsedAccessToken: MeResponse | null;
  isAuthenticated: boolean;
  initialize: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}
