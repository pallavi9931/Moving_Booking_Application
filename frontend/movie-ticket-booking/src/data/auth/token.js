const TOKEN_KEY = "token";

export function setToken(token) {
  if (token == null || token === "") {
    return;
  }
  localStorage.setItem(TOKEN_KEY, String(token));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export { TOKEN_KEY };
