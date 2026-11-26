import { seoFor, site } from './content/site'

function ensureMeta(selector, attr, key, content) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function ensureLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Keep document title + social meta in sync with the current route. */
export function applySeo(route) {
  const meta = seoFor(route)
  document.title = meta.title
  ensureMeta('meta[name="description"]', 'name', 'description', meta.description)
  ensureMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
  ensureMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
  ensureMeta('meta[property="og:url"]', 'property', 'og:url', meta.url)
  ensureMeta('meta[property="og:type"]', 'property', 'og:type', meta.type)
  ensureMeta('meta[property="og:image"]', 'property', 'og:image', `${site.url}${site.ogImage}`)
  ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title)
  ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)
  ensureMeta('meta[name="twitter:image"]', 'name', 'twitter:image', `${site.url}${site.ogImage}`)
  ensureLink('canonical', meta.url)
}
