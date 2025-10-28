export type APIError = {
  status: number;
  message?: string;
  errors?: Record<string, string[]> | null;
  raw?: any;
};

export class ApiRequestHandler {
  baseUrl: string;
  token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async parseResponse(res: Response) {
    const contentType = res.headers.get('content-type') || '';
    let body: any = null;
    try {
      if (contentType.includes('application/json')) {
        body = await res.json();
      } else {
        body = await res.text();
      }
    } catch (e) {
      body = null;
    }

    if (!res.ok) {
      const error: APIError = {
        status: res.status,
        message: body?.message || body || 'Error en la petición',
        errors: body?.errors || null,
        raw: body,
      };
      throw error;
    }

    return body;
  }

  private headers(extra: Record<string,string> = {}) {
    const h: Record<string,string> = {
      Accept: 'application/json',
      ...extra,
    };
    if (this.token) {
      h['Authorization'] = `Bearer ${this.token}`;
    }
    return h;
  }

  async get(path: string, params?: Record<string,string>) {
    const url = new URL(this.baseUrl + path);
    if (params) {
      Object.entries(params).forEach(([k,v]) => url.searchParams.append(k, v));
    }
    const res = await fetch(url.toString(), { method: 'GET', headers: this.headers() });
    return this.parseResponse(res);
  }

  async post(path: string, body?: any) {
    const res = await fetch(this.baseUrl + path, {
      method: 'POST',
      headers: this.headers({ 'Content-Type': 'application/json' }),
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.parseResponse(res);
  }

  async patch(path: string, body?: any) {
    const res = await fetch(this.baseUrl + path, {
      method: 'PATCH',
      headers: this.headers({ 'Content-Type': 'application/json' }),
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.parseResponse(res);
  }

  async postForm(path: string, form: FormData) {
    const res = await fetch(this.baseUrl + path, {
      method: 'POST',
      headers: this.headers(), // do not set Content-Type for multipart
      body: form,
    });
    return this.parseResponse(res);
  }

  async patchForm(path: string, form: FormData) {
    const res = await fetch(this.baseUrl + path, {
      method: 'PATCH',
      headers: this.headers(),
      body: form,
    });
    return this.parseResponse(res);
  }
}

// default instance (update BASE_URL as needed)
export const Api = new ApiRequestHandler('http://192.168.0.27:30000');

export default Api;
