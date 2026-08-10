export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// Отличаем «сервер ответил ошибкой» (например 401 — неверный пароль) от
// «до сервера не достучались» (сеть, CORS, Render ещё не проснулся и т.п.) —
// чтобы UI мог показать разумное сообщение, а не одно и то же на всё подряд.
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function authHeaders(token?: string): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseErrorDetail(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return typeof data?.detail === "string" ? data.detail : `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

export async function fetchJson<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { headers: authHeaders(token) });
  if (!res.ok) throw new ApiError(res.status, await parseErrorDetail(res));
  return res.json() as Promise<T>;
}

export async function postJson<T>(path: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new ApiError(res.status, await parseErrorDetail(res));
  return res.json() as Promise<T>;
}

export async function patchJson<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new ApiError(res.status, await parseErrorDetail(res));
  return res.json() as Promise<T>;
}
