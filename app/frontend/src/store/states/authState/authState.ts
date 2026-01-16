import { UseAuthStateType } from './authState.types';
import { create } from 'zustand';
import { fetchLogin, fetchLogout, fetchMe, fetchRefresh, fetchRegister } from '~/utils/fetchers';

export const useAuthState = create<UseAuthStateType>((set) => ({
  accessToken: null,
  parsedAccessToken: null,
  isAuthenticated: false,

  initialize: async () => {
    try {
      const meResponse = await fetchMe();

      set({
        parsedAccessToken: meResponse,
        isAuthenticated: !!meResponse?.userId,
      });
    } catch {
      set({
        parsedAccessToken: null,
        isAuthenticated: false,
      });
    }
  },

  login: async (username, password) => {
    const { accessToken } = await fetchLogin(username, password);
    const meResponse = await fetchMe();
    set({ accessToken, parsedAccessToken: meResponse, isAuthenticated: !!meResponse?.userId });
  },

  register: async (username, password) => {
    const { accessToken } = await fetchRegister(username, password);
    const meResponse = await fetchMe();
    set({ accessToken, parsedAccessToken: meResponse, isAuthenticated: !!meResponse?.userId });
  },

  logout: async () => {
    await fetchLogout();
    set({ accessToken: null, parsedAccessToken: null, isAuthenticated: false });
  },

  refresh: async () => {
    try {
      const { accessToken } = await fetchRefresh();
      const meResponse = await fetchMe();
      set({ accessToken, parsedAccessToken: meResponse, isAuthenticated: !!meResponse?.userId });
    } catch {
      set({ accessToken: null, parsedAccessToken: null, isAuthenticated: false });
      throw new Error('Unauthorized');
    }
  },
}));

export const useSelectorAccessToken = () => useAuthState((state) => state.accessToken);
export const useSelectorParsedAccessToken = () => useAuthState((state) => state.parsedAccessToken);
export const useSelectorIsAuthenticated = () => useAuthState((state) => state.isAuthenticated);
export const useSelectorInitialize = () => useAuthState((state) => state.initialize);
export const useSelectorLogin = () => useAuthState((state) => state.login);
export const useSelectorRegister = () => useAuthState((state) => state.register);
export const useSelectorLogout = () => useAuthState((state) => state.logout);
export const useSelectorRefresh = () => useAuthState((state) => state.refresh);
