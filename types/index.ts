// Types pour le projet Nobelium

export interface NotionBlock {
  id: string;
  properties?: {
    title?: any;
  };
  type?: string;
  [key: string]: any;
}

export interface BlogConfig {
  title: string;
  link: string;
  path: string;
  lang: string;
  author: string;
  font: "serif" | "sans";
  ogImageGenerateURL: string;
  seo: {
    googleSiteVerification?: string;
    keywords?: string[];
  };
  analytics?: {
    provider?: string;
    ackeeConfig?: {
      dataAckeeServer: string;
      domainId: string;
    };
  };
  timezone?: string;
  [key: string]: any;
}

export interface LocaleData {
  POST: {
    BACK: string;
    TOP: string;
  };
  [key: string]: any;
}

export interface ContainerMeta {
  title?: string;
  description?: string;
  type?: string;
  date?: string;
  slug?: string;
  [key: string]: any;
}

export interface PostMeta {
  id: string;
  title: string;
  slug: string;
  summary: string;
  createdTime: string;
  lastEditedTime: string;
  tags?: string[];
  status: string[];
  [key: string]: any;
}
