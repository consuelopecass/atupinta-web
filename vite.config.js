import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { business, services } from './src/siteContent.js'

function normalizeSiteUrl(value) {
  if (!value) return ''
  const url = new URL(value)
  return `${url.origin}${url.pathname.replace(/\/*$/, '/')}`
}

function xmlEscape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

function siteSeoPlugin(siteUrl, command) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: business.name,
    email: business.email,
    telephone: `+${business.phone}`,
    sameAs: [business.instagramUrl],
    areaServed: [
      { '@type': 'City', name: 'Macul, Santiago de Chile' },
      { '@type': 'City', name: 'Santiago de Chile' },
      { '@type': 'Country', name: 'Chile' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Manicure, Nail Art y Press On Nails',
      itemListElement: services.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.text,
          areaServed: service.title.startsWith('Press On')
            ? { '@type': 'Country', name: 'Chile' }
            : ['Macul', 'Santiago de Chile'],
        },
      })),
    },
  }

  if (siteUrl) {
    schema.url = siteUrl
    schema['@id'] = `${siteUrl}#business`
  }

  return {
    name: 'a-tu-pinta-seo-assets',
    transformIndexHtml(html) {
      const tags = []
      if (siteUrl) {
        tags.push(`<link rel="canonical" href="${siteUrl}">`)
        tags.push(`<meta property="og:url" content="${siteUrl}">`)
      }
      tags.push(`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`)
      return html.replace('<!-- SEO_TAGS -->', tags.join('\n    '))
    },
    closeBundle() {
      if (command !== 'build') return
      const outputDir = resolve(process.cwd(), 'dist')
      mkdirSync(outputDir, { recursive: true })
      const sitemapDirective = siteUrl ? `Sitemap: ${siteUrl}sitemap.xml\n` : ''
      writeFileSync(resolve(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\n${sitemapDirective}`)
      if (siteUrl) {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${xmlEscape(siteUrl)}</loc></url>\n</urlset>\n`
        writeFileSync(resolve(outputDir, 'sitemap.xml'), sitemap)
      }
    },
  }
}

export default defineConfig(({ command }) => {
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || '')
  return {
    base: './',
    plugins: [vue(), tailwindcss(), siteSeoPlugin(siteUrl, command)],
  }
})
