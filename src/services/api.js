const BASE_URL = 'https://api.imdbapi.dev';

export async function getTitles({ types = [], pageToken = '', sortBy = 'SORT_BY_POPULARITY', sortOrder = 'DESC' } = {}) {
  const url = new URL(`${BASE_URL}/titles`);
  types.forEach(type => url.searchParams.append('types', type));
  if (pageToken) url.searchParams.append('pageToken', pageToken);
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('sortOrder', sortOrder);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Failed to fetch titles');
  }
  return res.json(); // Returns { results: [...], nextPageToken: '...' } typically
}

export async function searchTitles(query, limit = 50) {
  if (!query) return { results: [] };
  const url = new URL(`${BASE_URL}/search/titles`);
  url.searchParams.append('query', query);
  url.searchParams.append('limit', limit);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Failed to search titles');
  }
  return res.json();
}
