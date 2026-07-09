// Minimal client for the public WordPress REST API of uman.crl.net.ua.
// No auth needed — only published content is exposed by this endpoint.
// Used directly by the app's Server Components (live, per-request fetch)
// and by scripts/sync-wp-news.mjs (offline snapshot tooling).

const WP_BASE = 'https://uman.crl.net.ua/wp-json/wp/v2';
const PER_PAGE = 100;
const TIMEOUT_MS = 8000;

// A slow/unresponsive upstream shouldn't hang the page indefinitely — fail
// fast so the caller can render a "couldn't reach the site" state instead.
function wpFetch(url, fetchInit = {}) {
  return fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), ...fetchInit });
}

// Fetches one page of published posts for the given category ids (OR'd
// together), with optional search + sort. Returns { posts, total, totalPages }
// so callers can render real pagination instead of pulling everything.
export async function fetchPosts({ categoryIds, page = 1, perPage = PER_PAGE, search = '', order = 'desc' }, fetchInit = {}) {
  const params = new URLSearchParams({
    categories: categoryIds.join(','),
    per_page: String(perPage),
    page: String(page),
    orderby: 'date',
    order,
    _embed: '1',
  });
  if (search) params.set('search', search);

  const res = await wpFetch(`${WP_BASE}/posts?${params.toString()}`, fetchInit);
  if (!res.ok) {
    // WP returns 400 rest_post_invalid_page_number once you're past the last page.
    if (res.status === 400) return { posts: [], total: 0, totalPages: 0 };
    throw new Error(`WP API request failed: /posts -> ${res.status}`);
  }

  const posts = await res.json();
  return {
    posts,
    total: Number(res.headers.get('x-wp-total') || '0'),
    totalPages: Number(res.headers.get('x-wp-totalpages') || '0'),
  };
}

// Fetches a single post by slug, scoped to the given category ids. Returns
// null if no matching published post exists.
export async function fetchPostBySlug(slug, categoryIds, fetchInit = {}) {
  const categories = categoryIds.join(',');
  const res = await wpFetch(
    `${WP_BASE}/posts?slug=${encodeURIComponent(slug)}&categories=${categories}&_embed=1`,
    fetchInit
  );
  if (!res.ok) throw new Error(`WP API request failed: /posts?slug=${slug} -> ${res.status}`);
  const posts = await res.json();
  return posts[0] ?? null;
}

export async function fetchCategories(fetchInit = {}) {
  const res = await wpFetch(`${WP_BASE}/categories?per_page=100`, fetchInit);
  if (!res.ok) throw new Error(`WP API request failed: /categories -> ${res.status}`);
  return res.json();
}
