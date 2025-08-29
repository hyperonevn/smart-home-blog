import "prismjs/themes/prism.css";
import "react-notion-x/src/styles.css";
import "katex/dist/katex.min.css";
import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import "@/styles/globals.css";
import "@/styles/notion.css";
import dynamic from "next/dynamic";
import loadLocale from "@/assets/i18n";
import { ConfigProvider } from "@/lib/config";
import { LocaleProvider } from "@/lib/locale";
import { prepareDayjs } from "@/lib/dayjs";
import { ThemeProvider } from "@/lib/theme";
import { BlogConfig } from "@/types";

interface MyAppProps extends AppProps {
  config: BlogConfig;
  locale: any;
}

export default function MyApp({
  Component,
  pageProps,
  config,
  locale,
}: MyAppProps) {
  return (
    <ConfigProvider value={config}>
      <LocaleProvider value={locale}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </LocaleProvider>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const config =
    typeof window === "object"
      ? await fetch("/api/config").then((res) => res.json())
      : await import("@/lib/server/config").then(
          (module) => module.clientConfig
        );

  prepareDayjs(config.timezone);

  return {
    ...(await App.getInitialProps(ctx)),
    config,
    locale: await loadLocale("basic", config.lang),
  };
};
