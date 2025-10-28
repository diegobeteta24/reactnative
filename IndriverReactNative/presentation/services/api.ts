const BASE_URL = 'http://192.168.0.27:30000'; // update to your machine IP/port if needed

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(payload: Record<string, any>) {
  const res = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Update user using JSON body (image as URL)
export async function updateUserJson(token: string, data: Record<string, any>) {
  const res = await fetch(`${BASE_URL}/api/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Update user using multipart/form-data (for file upload). `fileFieldName` should be 'profile_image_file' to match backend.
export async function updateUserFile(token: string, form: FormData) {
  const res = await fetch(`${BASE_URL}/api/user`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      // Do NOT set Content-Type; fetch will set the correct boundary for multipart
    },
    body: form,
  });
  return res.json();
}

export default { login, register, updateUserJson, updateUserFile };
