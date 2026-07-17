const TOKEN_KEY = "tripmitra_token";

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  // Set middleware-ready cookie (expires in 7 days)
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=604800; SameSite=Lax; Secure`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  const localToken = localStorage.getItem(TOKEN_KEY);
  if (localToken) return localToken;

  // Fallback to cookie search
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith(`${TOKEN_KEY}=`));
  if (tokenCookie) {
    return tokenCookie.split("=")[1] || null;
  }
  return null;
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  // Clear middleware cookie
  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure`;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
