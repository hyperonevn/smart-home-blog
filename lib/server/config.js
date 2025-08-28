// Import du client Notion simplifié

// Configuration complète avec valeurs par défaut
const config = {
  // Config Notion depuis le .env
  
  // Valeurs par défaut
  title: process.env.BLOG_TITLE || 'Mon Blog',
  author: process.env.BLOG_AUTHOR || 'Auteur',
  email: process.env.BLOG_EMAIL || 'email@example.com',
  link: process.env.BLOG_LINK || 'https://monblog.com',
  description: process.env.BLOG_DESCRIPTION || 'Mon super blog',
  lang: process.env.BLOG_LANG || 'fr-FR',
  timezone: 'Europe/Paris',
  appearance: 'auto',
  font: 'sans-serif',
  lightBackground: '#ffffff',
  darkBackground: '#18181B',
  path: '',
  since: new Date().getFullYear(),
  postsPerPage: 7,
  sortByDate: false,
  showAbout: true,
  showArchive: true,
  autoCollapsedNavBar: false,
  socialLink: '',
  seo: { keywords: ['Blog', 'Website', 'Notion'], googleSiteVerification: '' },
  analytics: { provider: '', ackeeConfig: { tracker: '', dataAckeeServer: '', domainId: '' }, gaConfig: { measurementId: '' } },
  comment: { provider: '', gitalkConfig: { repo: '', owner: '', admin: [], clientID: '', clientSecret: '', distractionFreeMode: false }, utterancesConfig: { repo: '' }, cusdisConfig: { appId: '', host: 'https://cusdis.com', scriptSrc: 'https://cusdis.com/js/cusdis.es.js' } },
  isProd: process.env.VERCEL_ENV === 'production'
}

// Configuration client (sans le token)
const clientConfig = { ...config }
delete clientConfig.notionAccessToken

module.exports = {
  config,
  clientConfig
}
