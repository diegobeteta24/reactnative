import { AuthRepository, AuthResponse } from '../repositories/AuthRepository';

export class LoginUseCase {
  private repo: AuthRepository;

  constructor(repo: AuthRepository) {
    this.repo = repo;
  }

  async execute(email: string, password: string): Promise<AuthResponse> {
    if (!email || !password) {
      throw { status: 422, message: 'Email and password are required', errors: { email: ['required'], password: ['required'] } };
    }

    return this.repo.login(email, password);
  }
}
