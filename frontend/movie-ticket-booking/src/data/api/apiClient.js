import { getToken, setToken, clearToken, TOKEN_KEY } from "../auth/token";

/**
 * Dev: empty string + Vite proxy (vite.config.js) → same origin, avoids CORS / "Failed to fetch".
 * Prod: call gateway directly unless VITE_API_BASE_URL is set.
 */
const BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : typeof import.meta !== "undefined" && import.meta.env?.DEV
      ? ""
      : "http://localhost:8080";

const REQUEST_TIMEOUT_MS = 15000;

function trimUrl(url) {
  return typeof url === "string" ? url.trim() : url;
}

/** Never send Bearer on login/register so a stale token cannot trip the gateway JWT filter. */
function isPublicAuthUrl(url) {
  const u = trimUrl(url);
  return u === "/auth/login" || u === "/auth/register";
}

function buildHeaders(extra = {}, options = {}, url = "") {
  const headers = { ...extra };
  const skipAuth = options.public || isPublicAuthUrl(url);
  if (!skipAuth) {
    const t = getToken();
    if (t) {
      headers.Authorization = `Bearer ${t}`;
    }
  }
  return headers;
}

function isLoginPath() {
  const p = (window.location.pathname || "/").replace(/\/+$/, "") || "/";
  return p === "/login" || p.endsWith("/login");
}

function handleUnauthorizedIfNeeded(res, options) {
  if (res.status !== 401) return;
  const hadToken = !!getToken();
  clearToken();
  if (hadToken && !options.public && !isLoginPath()) {
    window.location.assign("/login");
  }
}

/** Parse error responses: Spring often uses `message`, HTML errors are non-JSON. */
async function throwIfNotOk(res) {
  if (res.ok) return;
  const text = await res.text();
  let parsed = {};
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        error:
          text.length > 240
            ? `${text.slice(0, 240)}… (${res.status})`
            : `${text || "Bad response"} (${res.status})`
      };
    }
  }
  const base =
    parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  const message =
    (typeof base.error === "string" && base.error) ||
    (typeof base.message === "string" && base.message) ||
    (typeof base.detail === "string" && base.detail) ||
    `Request failed (${res.status})`;
  throw { ...base, error: message, status: res.status };
}

async function fetchWithTimeout(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function toNetworkError(err) {
  const name = err && err.name;
  if (name === "AbortError") {
    return {
      error: "Request timed out",
      status: 0,
      reason: "timeout",
      timeout: true
    };
  }
  return { error: "Something went wrong", status: 0, reason: "network" };
}

const apiClient = {
  async get(url, params, options = {}) {
    const path = trimUrl(url);
    const queryString =
      params && Object.keys(params).length > 0
        ? "?" + new URLSearchParams(params).toString()
        : "";
    let res;
    try {
      res = await fetchWithTimeout(`${BASE_URL}${path}${queryString}`, {
        method: "GET",
        headers: buildHeaders({}, options, path)
      });
    } catch (e) {
      throw toNetworkError(e);
    }
    handleUnauthorizedIfNeeded(res, options);
    await throwIfNotOk(res);
    return res.json();
  },
  async post(url, body, options = {}) {
    const path = trimUrl(url);
    let res;
    try {
      res = await fetchWithTimeout(`${BASE_URL}${path}`, {
        method: "POST",
        headers: buildHeaders(
          { "Content-Type": "application/json" },
          options,
          path
        ),
        body: JSON.stringify(body ?? {})
      });
    } catch (e) {
      // Only seat lock: resolve so callers can re-verify via GET (backend may still apply).
      if (e && e.name === "AbortError" && path === "/booking") {
        return { timeout: true };
      }
      if (e && e.name === "AbortError") {
        throw toNetworkError(e);
      }
      throw toNetworkError(e);
    }
    handleUnauthorizedIfNeeded(res, options);
    await throwIfNotOk(res);
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  },
  async delete(url, options = {}) {
    const path = trimUrl(url);
    let res;
    try {
      res = await fetchWithTimeout(`${BASE_URL}${path}`, {
        method: "DELETE",
        headers: buildHeaders({}, options, path)
      });
    } catch (e) {
      throw toNetworkError(e);
    }
    handleUnauthorizedIfNeeded(res, options);
    await throwIfNotOk(res);
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  }
};

export { apiClient, getToken, setToken, clearToken, TOKEN_KEY };
