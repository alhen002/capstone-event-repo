export function unique(array, key) {
  return [...new Set(array?.map((x) => x[key]))];
}

export function getURL(filter = {}) {
  const params = new URLSearchParams();
  filter.category && params.append("category", filter.category);
  filter.city && params.append("city", filter.city);
  return `/api/events${params.size ? `?${params}` : ""}`;
}
