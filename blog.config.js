const BLOG = {
  // ====== Thông tin cơ bản ======
  title: 'Hyper One Blog',
  author: 'Hyper One Team',
  email: 'contact@hyperone.vn',
  link: 'https://blog.hyperonevn.com',
  description: 'Chia sẻ kiến thức về Smart Home, AI và công nghệ từ Hyper One.',
  lang: 'vi-VN',
  timezone: 'Asia/Ho_Chi_Minh',

  // ====== Giao diện ======
  appearance: 'auto', // ['light', 'dark', 'auto']
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

  // ====== SEO & mạng xã hội ======
  ogImageGenerateURL: 'https://og-image-craigary.vercel.app',
  socialLink: 'https://www.facebook.com/hyperonevn',
  seo: {
    keywords: ['Smart Home', 'Hyper One', 'Công nghệ', 'AI'],
    googleSiteVerification: '' // thêm mã nếu có Google Search Console
  },

  // ====== Notion CMS ======
  notionPageId: process.env.NOTION_PAGE_ID || '2855ab6a973e8028b90dc6bd84d99ecf',
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN || '',

  // ====== Analytics (tùy chọn) ======
  analytics: {
    provider: '', // 'ga' hoặc 'ackee' nếu cần
    gaConfig: { measurementId: '' }
  },

  // ====== Comment (tùy chọn) ======
  comment: {
    provider: '',
    cusdisConfig: {
      appId: '',
      host: 'https://cusdis.com',
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js'
    }
  },

  isProd: process.env.VERCEL_ENV === 'production'
}

module.exports = BLOG
