const BASE_URL = "/api/v1";
const apiClient = {
  async get(url, params) {
    const queryString = params && Object.keys(params).length > 0 ? "?" + new URLSearchParams(params).toString() : "";
    const res = await fetch(`${BASE_URL}${url}${queryString}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw errorData;
    }
    return res.json();
  },
  async post(url, body) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw errorData;
    }
    return res.json();
  },
  async delete(url) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw errorData;
    }
    return res.json();
  }
};
export {
  apiClient
};
