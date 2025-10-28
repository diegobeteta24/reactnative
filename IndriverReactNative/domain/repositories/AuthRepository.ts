export interface AuthResponse {
  token?: string;
  user?: any;
}

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthResponse>;
}
