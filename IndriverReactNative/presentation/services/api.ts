import Api from '../../data/sources/remote/api/ApiRequestHandler';

export async function login(email: string, password: string) {
  return Api.post('/api/login', { email, password });
}

export async function register(payload: Record<string, any>) {
  return Api.post('/api/register', payload);
}

export async function updateUserJson(token: string, data: Record<string, any>) {
  Api.setToken(token);
  return Api.patch('/api/user', data);
}

export async function updateUserFile(token: string, form: FormData) {
  Api.setToken(token);
  return Api.patchForm('/api/user', form);
}

export default { login, register, updateUserJson, updateUserFile };
