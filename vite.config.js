import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { parsePath } from './src/route.js'

async function loadSite() {
  return import(pathToFileURL(resolve('src/content/site.js')).href)
}

function escapeAttr(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
}

function setMeta(html, attr, key, content) {
  const re = new RegExp(`(<meta[^>]*${attr}="${key}"[^>]*content=")([^"]*)(")`, 'i')
  if (re.test(html)) return html.replace(re, `$1${escapeAttr(content)}$3`)
  return html
}

function withPageSeo(html, meta, site) {
  const image = `${site.url}${site.ogImage}`
  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(meta.title)}</title>`)
  out = setMeta(out, 'name', 'description', meta.description)
  out = setMeta(out, 'property', 'og:title', meta.title)
  out = setMeta(out, 'property', 'og:description', meta.description)
  out = setMeta(out, 'property', 'og:url', meta.url)
  out = setMeta(out, 'property', 'og:type', meta.type)
  out = setMeta(out, 'property', 'og:image', image)
  out = setMeta(out, 'name', 'twitter:title', meta.title)
  out = setMeta(out, 'name', 'twitter:description', meta.description)
  out = setMeta(out, 'name', 'twitter:image', image)
  out = out.replace(/(<link[^>]*rel="canonical"[^>]*href=")([^"]*)(")/i, `$1${escapeAttr(meta.url)}$3`)
  return out
}

function siteSeo() {
  let cached
  const get = async () => {
    cached ??= await loadSite()
    return cached
  }

  return {
    name: 'site-seo',
    async transformIndexHtml(html) {
      const { site, bootLines, seoFor, jsonLd, crawlerHtml } = await get()
      const home = seoFor({ page: 'home' })
      const image = `${site.url}${site.ogImage}`
      const ld = JSON.stringify(jsonLd()).replaceAll('<', '\\u003c')
      const tags = `
    <title>${escapeAttr(home.title)}</title>
    <meta name="description" content="${escapeAttr(home.description)}" />
    <meta name="author" content="${escapeAttr(site.name)}" />
    <meta name="keywords" content="${escapeAttr(site.keywords.join(', '))}" />
    <meta name="theme-color" content="${escapeAttr(site.themeColor.light)}" />
    <link rel="canonical" href="${escapeAttr(home.url)}" />
    <meta property="og:title" content="${escapeAttr(home.title)}" />
    <meta property="og:description" content="${escapeAttr(home.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeAttr(home.url)}" />
    <meta property="og:image" content="${escapeAttr(image)}" />
    <meta property="og:locale" content="${escapeAttr(site.locale)}" />
    <meta property="og:site_name" content="${escapeAttr(site.name)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(home.title)}" />
    <meta name="twitter:description" content="${escapeAttr(home.description)}" />
    <meta name="twitter:image" content="${escapeAttr(image)}" />
    <script type="application/ld+json">${ld}</script>`

      return html
        .replace('<html lang="en">', `<html lang="${escapeAttr(site.lang)}">`)
        .replace('<!--site-seo-->', tags)
        .replace('__BOOT_LINES__', JSON.stringify(bootLines))
        .replace('<!--site-crawler-->', `<noscript>${crawlerHtml()}</noscript>`)
    },
    async closeBundle() {
      const { site, seoFor, sitemapPaths, robotsTxt, sitemapXml } = await get()
      const homeHtml = readFileSync('dist/index.html', 'utf8')
      copyFileSync('dist/index.html', 'dist/404.html')
      writeFileSync('dist/.nojekyll', '')
      writeFileSync('dist/CNAME', `${site.domain}\n`)
      writeFileSync('dist/robots.txt', robotsTxt())
      writeFileSync('dist/sitemap.xml', sitemapXml())

      // Real files per route so GitHub Pages returns 200 (not soft-404) with page meta.
      for (const path of sitemapPaths()) {
        if (path === '/') continue
        const meta = seoFor(parsePath(path))
        const html = withPageSeo(homeHtml, meta, site)
        const file = `dist${path}.html`
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, html)
        const pretty = `dist${path}/index.html`
        mkdirSync(dirname(pretty), { recursive: true })
        writeFileSync(pretty, html)
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), react(), siteSeo()],
  build: {
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) {
            return 'react'
          }
          if (id.includes('node_modules/simple-icons') || id.includes('node_modules/lucide-react')) {
            return 'icons'
          }
        },
      },
    },
  },
})
