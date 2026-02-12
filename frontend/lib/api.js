import { API_BASE } from "@/lib/apiBase";

export { API_BASE };

export const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("fk_token");
};

export const parseJwt = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload));
  } catch (err) {
    return null;
  }
};

export const apiFetch = async (path, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  console.log("=== API DEBUG ===");
  console.log("Token:", token);
  console.log("Headers:", headers);
  console.log("URL:", `${API_BASE}${path}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
};