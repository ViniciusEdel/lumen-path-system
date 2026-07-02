// API configuration. Point VITE_API_BASE_URL to the FastAPI deployment.
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  // When true, services return mocked data instead of hitting the network.
  // Set to false once the FastAPI backend is available.
  useMocks: true,
  tokenStorageKey: "ecclesia.token",
  tenantStorageKey: "ecclesia.tenant",
} as const;
