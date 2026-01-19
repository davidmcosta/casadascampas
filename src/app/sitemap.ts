import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://casadascampas.pt'

  const languages = ['pt', 'en']

  const pages = [
    '',
    '/about',
    '/products',
    '/blog',
    '/contact',
  ]

  const urls: MetadataRoute.Sitemap = []

  languages.forEach(lang => {
    pages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })

  return urls
}