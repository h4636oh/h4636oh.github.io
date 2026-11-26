import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

async function loadSite() {
  return import(pathToFileURL(resolve('src/content/site.js')).href)
}

function escapeAttr(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
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
      const { site, robotsTxt, sitemapXml } = await get()
      copyFileSync('dist/index.html', 'dist/404.html')
      writeFileSync('dist/.nojekyll', '')
      writeFileSync('dist/CNAME', `${site.domain}\n`)
      writeFileSync('dist/robots.txt', robotsTxt())
      writeFileSync('dist/sitemap.xml', sitemapXml())
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
