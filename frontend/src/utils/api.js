const BASE_URL = "http://localhost:3000";

function getToken() {
  try {
    return localStorage.getItem("token") || "";
  } catch {
    return "";
  }
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    // Backend expects the raw token in Authorization
    headers.set("Authorization", token);
  }
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers
  });
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  signIn: (credentials) => apiFetch("/api/v1/signin", {
    method: "POST",
    body: JSON.stringify(credentials)
  }),
  signUp: (payload) => apiFetch("/api/v1/signup", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  getContent: () => apiFetch("/api/v1/content", { method: "GET" }),
  addContent: (payload) => apiFetch("/api/v1/content", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  deleteContent: (contentId) => apiFetch("/api/v1/content", {
    method: "DELETE",
    body: JSON.stringify({ contentId })
  }),
  shareBrain: () => apiFetch("/api/v1/sharebrain", { method: "POST" }),
  getSharedBrain: (shareLink) => apiFetch(`/api/v1/brain/${shareLink}`, { method: "GET" })
};

export { BASE_URL };

