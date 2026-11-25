const PAGES = new Set(['about', 'skills', 'career', 'projects', 'achievements', 'blogs', 'contact'])

export const ORDER = ['home', 'about', 'skills', 'career', 'projects', 'achievements', 'blogs', 'contact']

export function parsePath(pathname = window.location.pathname) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/') return { page: 'home' }
  const [page, id, extra] = path.split('/').filter(Boolean)
  if (!PAGES.has(page) || extra) return { page: 'missing' }
  if (page === 'projects') return { page, id: id || null }
  if (page === 'blogs' && id) return { page: 'blog', id }
  if (id) return { page: 'missing' }
  return { page }
}

export function sameRoute(a, b) {
  return a?.page === b?.page && a?.id === b?.id
}

export function hrefFor(route) {
  if (route.page === 'projects') return route.id ? `/projects/${route.id}` : '/projects'
  if (route.page === 'blog') return `/blogs/${route.id}`
  if (route.page === 'home' || route.page === 'missing') return '/'
  return `/${route.page}`
}

export function sectionOf(route) {
  if (route.page === 'blog') return 'blogs'
  if (route.page === 'missing') return 'home'
  return route.page
}
