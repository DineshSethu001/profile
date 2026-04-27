function normalizeBaseUrl(value) {
  const normalized = String(value ?? "").trim();

  if (!normalized) {
    return "/api";
  }

  const lowerCased = normalized.toLowerCase();

  if (lowerCased === "undefined" || lowerCased === "null") {
    return "/api";
  }

  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_URL);

export function getApiUrl(path = "") {
  const normalizedPath = String(path ?? "").trim();

  if (!normalizedPath) {
    return API_BASE_URL;
  }

  return normalizedPath.startsWith("/")
    ? `${API_BASE_URL}${normalizedPath}`
    : `${API_BASE_URL}/${normalizedPath}`;
}
