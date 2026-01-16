import { AuthResponse, ErrorResponse, MeResponse, UseAuthStateType } from './authState.types';
import { create } from 'zustand';
import { WENT_WRONG_ERROR } from '~/constants';

const parseErrorResponse = async (response: Response): Promise<string> => {
  try {
    const errorData: ErrorResponse = await response.json();
    return errorData.message || WENT_WRONG_ERROR;
  } catch {
    return WENT_WRONG_ERROR;
  }
};

const fetchMe = async (): Promise<MeResponse> => {
  const response = await fetch('/api/me', {
    method: 'GET',
    credentials: 'include',
  });

  if (response.status !== 200) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

const fetchLogin = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (response.status !== 200) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

const fetchRegister = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (response.status !== 200) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

const fetchLogout = async (): Promise<void> => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.status !== 204) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
};

const fetchRefresh = async (): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.status !== 200) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

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
