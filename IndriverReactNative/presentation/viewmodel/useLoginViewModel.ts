import { useState } from 'react';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';

export function useLoginViewModel(repo: AuthRepository) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usecase = new LoginUseCase(repo);

  const login = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await usecase.execute(email, password);
      setLoading(false);
      return res;
    } catch (e: any) {
      setLoading(false);
      // Normalize error into string for UI
      if (e?.errors) {
        const msgs = Object.values(e.errors).flat().join('\n');
        setError(msgs);
      } else if (e?.message) {
        setError(String(e.message));
      } else if (typeof e === 'string') {
        setError(e);
      } else {
        setError('Error desconocido');
      }
      throw e;
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    login,
  } as const;
}
