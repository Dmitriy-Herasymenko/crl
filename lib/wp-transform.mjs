// Shared transforms for turning a raw WordPress REST API post object into
// the shape the site renders. Used both at request time (live pages) and
// by any offline/static tooling that wants the same output.

export const CATEGORY_NOVYNY = 11;
export const CATEGORY_PORADY = 6;
export const CATEGORY_TY_YAK = 15;
export const CATEGORY_VAKTSYNATSIYA = 13;
export const FALLBACK_IMAGE = '/images/gallery/photo-1.jpg';

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  hellip: '…', mdash: '—', ndash: '–', laquo: '«', raquo: '»',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
};

export function decodeEntities(str) {
  return str
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

export function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
}

export function formatDate(isoDate) {
  const d = new Date(isoDate);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

// WP page content that's just a flat list of "<a href=...>Document title</a>"
// paragraphs (e.g. tariff/document listing pages) — pull out {href, title} so
// the app can render them as styled document cards instead of raw prose links.
export function extractDocumentLinks(html) {
  const links = [];
  const re = /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const title = decodeEntities(stripTags(m[2]));
    if (title) links.push({ href: m[1], title });
  }
  return links;
}

// WP page content built from "Shortcodes Ultimate" spoiler/accordion blocks,
// one per year, each containing a list of document links (e.g. the
// "Фінансова діяльність" page: "2026 рік" -> [financial plan PDF, ...]).
// Pull out {year, documents: [{href, title}]} groups, newest year first.
export function extractYearGroupedDocuments(html) {
  const groups = [];
  const spoilerRe = /<div class="su-spoiler-title"[^>]*>[\s\S]*?<\/span>([\s\S]*?)<\/div><div class="su-spoiler-content[^"]*"[^>]*>([\s\S]*?)<\/div><\/div>/gi;
  let m;
  while ((m = spoilerRe.exec(html))) {
    const year = decodeEntities(stripTags(m[1]));
    const documents = extractDocumentLinks(m[2]);
    if (year && documents.length) groups.push({ year, documents });
  }
  return groups;
}

export function extractImageUrls(html) {
  const urls = [];
  const re = /src="(https:\/\/uman\.crl\.net\.ua\/wp-content\/uploads\/[^"]+)"/g;
  let m;
  while ((m = re.exec(html))) urls.push(m[1]);
  return urls;
}

// WP editors often paste a bare URL as both the href and the visible link
// text (e.g. <a href="https://x">https://x</a>) — rendered plainly that's a
// long underlined wall of text. Turn those into a compact pill with an icon
// instead; links with real descriptive text are left as normal prose links.
function formatRawLinks(html) {
  return html.replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (full, href, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const isBareUrl = /^https?:\/\//i.test(text) && text.replace(/\/+$/, '') === href.replace(/\/+$/, '');
    if (!isBareUrl) return full;
    return `<a href="${href}" target="_blank" rel="noopener" class="raw-link"><svg class="raw-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg><span class="raw-link-text">${text}</span></a>`;
  });
}

// WP's "Shortcodes Ultimate" gallery block (su-custom-gallery) renders each
// photo as its own fixed-size <div> with an inline width/height style (which
// we strip) plus a filename shown as a caption/link — flattened, that's a
// vertical stack of oversized photos with raw filenames as blue link text.
// Rebuild it as a clean responsive grid instead.
function formatGalleries(html) {
  return html.replace(
    /<div class="su-custom-gallery[^"]*"[^>]*>([\s\S]*?)<div class="su-clear"><\/div>\s*<\/div>/gi,
    (full, inner) => {
      const items = [];
      const slideRe = /<a\s+href="([^"]+)"[^>]*>\s*<img[^>]*\ssrc="([^"]+)"[^>]*>/gi;
      let m;
      while ((m = slideRe.exec(inner))) items.push({ href: m[1], src: m[2] });
      if (!items.length) return '';
      const cells = items
        .map(({ href, src }) => `<a href="${href}" target="_blank" rel="noopener" class="wp-gallery-item"><img src="${src}" alt="" loading="lazy" /></a>`)
        .join('');
      return `<div class="wp-gallery not-prose">${cells}</div>`;
    }
  );
}

// mapImageUrl: (originalWpUrl) => rewritten src to use in the app
// (either a local /images/... path or our /api/media proxy URL).
export function sanitizeContentHtml(html, mapImageUrl) {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\slang="[^"]*"/gi, '')
    .replace(/\ssrcset="[^"]*"/gi, '')
    .replace(/\ssizes="[^"]*"/gi, '')
    .replace(/<p[^>]*>(?:&nbsp;|\s)*<\/p>/gi, '')
    .replace(/src="(https:\/\/uman\.crl\.net\.ua\/wp-content\/uploads\/[^"]+)"/g, (m, url) => `src="${mapImageUrl(url)}"`)
    .trim();
  return formatRawLinks(formatGalleries(cleaned));
}

export function transformPost(post, mapImageUrl) {
  const featuredUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const inlineUrls = extractImageUrls(post.content.rendered);
  const image = (featuredUrl && mapImageUrl(featuredUrl))
    || (inlineUrls[0] && mapImageUrl(inlineUrls[0]))
    || FALLBACK_IMAGE;

  const isAdvice = post.categories.includes(CATEGORY_PORADY);

  return {
    slug: post.slug,
    title: decodeEntities(stripTags(post.title.rendered)),
    date: formatDate(post.date),
    category: isAdvice ? 'Поради лікаря' : 'Новини',
    image,
    excerpt: stripTags(post.excerpt.rendered),
    contentHtml: sanitizeContentHtml(post.content.rendered, mapImageUrl),
  };
}
