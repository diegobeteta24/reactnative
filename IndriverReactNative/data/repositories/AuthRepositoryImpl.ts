import { AuthRepository, AuthResponse } from '../../domain/repositories/AuthRepository';
import Api from '../../presentation/services/api';

export class AuthRepositoryImpl implements AuthRepository {
  async login(email: string, password: string): Promise<AuthResponse> {
    // delegate to the HTTP api helper
    return Api.login(email, password);
  }
}
