// Proxies WordPress media through our own origin so <img> tags aren't
// cross-origin hotlinks — uman.crl.net.ua serves images without the CORS/ORB
// headers Chrome wants for foreign origins, so direct hotlinking gets
// silently blocked (net::ERR_BLOCKED_BY_ORB). Restricted to that host's
// uploads folder only, to avoid turning this into an open image proxy.

const ALLOWED_PREFIX = 'https://uman.crl.net.ua/wp-content/uploads/';

export async function GET(request) {
  const src = new URL(request.url).searchParams.get('src');

  if (!src || !src.startsWith(ALLOWED_PREFIX)) {
    return new Response('Invalid or disallowed src', { status: 400 });
  }

  let upstream;
  try {
    upstream = await fetch(src);
  } catch {
    return new Response('Upstream fetch failed', { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response('Image not found', { status: 404 });
  }

  const contentType = upstream.headers.get('content-type') || 'image/jpeg';

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      // Cache at the edge/browser — images at a given WP URL don't change,
      // so this doesn't conflict with fetching post text live on every visit.
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
