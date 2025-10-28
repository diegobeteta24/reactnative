import Api from '../sources/remote/api/ApiRequestHandler';
import type { AuthResponse } from '../../domain/repositories/AuthRepository';

const STORAGE_KEY = 'AUTH_TOKEN_V1';

export class AuthService {
  private token: string | null = null;

  constructor() {}

  setToken(token: string | null) {
    this.token = token;
    Api.setToken(token);
    // persist token asynchronously if AsyncStorage is available
    (async () => {
      try {
        const AsyncStorage = await import('@react-native-async-storage/async-storage');
        if (token) {
          await AsyncStorage.default.setItem(STORAGE_KEY, token);
        } else {
          await AsyncStorage.default.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        // AsyncStorage not installed or failed — ignore
      }
    })();
  }

  getToken() {
    return this.token;
  }

  async init() {
    // attempt to load persisted token
    try {
      const AsyncStorage = await import('@react-native-async-storage/async-storage');
      const t = await AsyncStorage.default.getItem(STORAGE_KEY);
      if (t) {
        this.setToken(t);
      }
    } catch (e) {
      // ignore if AsyncStorage not present
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await Api.post('/api/login', { email, password });
    const token = res?.token ?? res?.user?.token ?? null;
    if (token) {
      this.setToken(token);
    }
    return res as AuthResponse;
  }

  async register(payload: Record<string, any>): Promise<AuthResponse> {
    const res = await Api.post('/api/register', payload);
    const token = res?.token ?? res?.user?.token ?? null;
    if (token) this.setToken(token);
    return res as AuthResponse;
  }

  async logout(): Promise<void> {
    try {
      await Api.post('/api/logout');
    } catch (e) {
      // ignore logout errors
    }
    this.setToken(null);
  }
}

const authService = new AuthService();
export default authService;
