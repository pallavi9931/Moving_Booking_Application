const USERNAME_KEY = "username";

export function decodeJwtUsername(token) {
  if (!token || typeof token !== "string") return "";
  try {
    const part = token.split(".")[1];
    if (!part) return "";
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(b64));
    return json.sub || json.username || "";
  } catch {
    return "";
  }
}

export function persistSessionUsername(token) {
  const u = decodeJwtUsername(token);
  if (u) {
    localStorage.setItem(USERNAME_KEY, u);
  }
}

export function clearSessionUsername() {
  localStorage.removeItem(USERNAME_KEY);
}

export function getSessionUsername() {
  return localStorage.getItem(USERNAME_KEY) || "";
}

export { USERNAME_KEY };
