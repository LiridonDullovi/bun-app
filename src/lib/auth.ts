import { getToken } from "@/lib/token";

export function requireAuth() {
  if (!getToken()) {
    window.location.href = "/login";
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export async function authFetch(url: string | URL, options: RequestInit = {}) {
  const token = getToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

export function isAuthorized(resourceOwnerId: string) {
  const token = getToken();
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1] as string));
  return payload.sub === resourceOwnerId;
}