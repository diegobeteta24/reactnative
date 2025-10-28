import { AuthRepository, AuthResponse } from '../../domain/repositories/AuthRepository';
import Api from '../sources/remote/api/ApiRequestHandler';

export class AuthRepositoryImpl implements AuthRepository {
  async login(email: string, password: string): Promise<AuthResponse> {
    // delegate to the HTTP api helper
    return Api.post('/api/login', { email, password });
  }
}
