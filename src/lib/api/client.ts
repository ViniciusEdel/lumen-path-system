import { API_CONFIG } from "./config";

// Minimal HTTP client prepared for JWT auth + multi-tenant headers.
// Replace fetch mocks by pointing API_CONFIG.useMocks = false.

export class ApiError extends Error {
  constructor(public status: number, message: string, public body?: unknown) {
    super(message);
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(API_CONFIG.tokenStorageKey);
}

function getTenantId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(API_CONFIG.tenantStorageKey);
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  tenantId?: string;
  skipAuth?: boolean;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, tenantId, skipAuth, headers, ...rest } = options;
  const token = getToken();
  const tenant = tenantId ?? getTenantId();

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };
  if (!skipAuth && token) finalHeaders["Authorization"] = `Bearer ${token}`;
  if (tenant) finalHeaders["X-Tenant-ID"] = tenant;

  const res = await fetch(`${API_CONFIG.baseURL}${path}`, {
    ...rest,
    headers: finalHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    let payload: unknown;
    try { payload = await res.json(); } catch { /* ignore */ }
    throw new ApiError(res.status, `Request failed: ${res.status}`, payload);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// Mock adapter helper — resolves with a small delay to simulate the network.
export function mockResponse<T>(data: T, delay = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}
