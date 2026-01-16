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
