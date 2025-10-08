const BLOG = {
  title: 'Hyper One Blog',
  author: 'Hyper One Team',
  email: 'contact@hyperone.vn',
  link: 'https://blog.hyperonevn.com',
  description: 'Chia sẻ kiến thức về Smart Home, AI và công nghệ từ Hyper One.',
  lang: 'vi-VN',
  timezone: 'Asia/Ho_Chi_Minh',
  appearance: 'auto',
  font: 'sans-serif',
  lightBackground: '#ffffff',
  darkBackground: '#18181B',
  path: '',
  since: 2025,
  postsPerPage: 7,
  sortByDate: true,
  showAbout: true,
  showArchive: true,
  autoCollapsedNavBar: true,
  ogImageGenerateURL: 'https://og-image-craigary.vercel.app',
  socialLink: 'https://www.facebook.com/hyperonevn',
  seo: { keywords: ['Smart Home','Hyper One','Công nghệ','AI'], googleSiteVerification: '' },

  // ✳️ 2 dòng quan trọng:
  notionPageId: process.env.NOTION_PAGE_ID,
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN,

  analytics: { provider: '', gaConfig: { measurementId: '' } },
  comment: { provider: '', cusdisConfig: { appId: '', host: 'https://cusdis.com', scriptSrc: 'https://cusdis.com/js/cusdis.es.js' } },
  isProd: process.env.VERCEL_ENV === 'production'
}
module.exports = BLOG
