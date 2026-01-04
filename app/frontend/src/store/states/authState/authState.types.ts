export interface MeResponse {
  userId: number;
  username: string;
  typ: string;
  iss: string;
  sid: string;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
}

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
