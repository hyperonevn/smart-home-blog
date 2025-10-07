const { config } = require('./lib/server/config')

module.exports = {
  siteUrl: config.link || 'https://blog.hyperonevn.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', disallow: ['/'] }
    ]
  }
}
