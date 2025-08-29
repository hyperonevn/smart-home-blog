"use client";

import { createElement as h } from "react";
import dynamic from "next/dynamic";
import { NotionRenderer as Renderer } from "react-notion-x";
import type { ComponentProps, ReactNode } from "react";
import { getTextContent } from "notion-utils";
import { FONTS_SANS, FONTS_SERIF } from "@/consts";
import { useConfig } from "@/lib/config";
import Toggle from "@/components/notion-blocks/Toggle";
import type { CodeBlock, ExtendedRecordMap, ToggleBlock } from "notion-types";

type RendererProps = ComponentProps<typeof Renderer>;
type NotionXComponents = RendererProps["components"];

interface CodeSwitchProps {
  block: CodeBlock;
  defaultLanguage?: string;
  className?: string;
}

// Lazy-load & overrides
const baseComponents: NotionXComponents = {
  Code: dynamic(
    async () => {
      return function CodeSwitch(props: CodeSwitchProps) {
        const lang = props?.block?.properties?.language
          ? getTextContent(props.block.properties.language)
          : "";

        switch (lang) {
          case "Mermaid":
            return h(
              dynamic(
                () =>
                  import("@/components/notion-blocks/Mermaid").then(
                    (m) => m.default
                  ),
                { ssr: false }
              ),
              props
            );

          default:
            return h(
              dynamic(
                () =>
                  import("react-notion-x/build/third-party/code").then(
                    async (m) => {
                      await Promise.all([
                        // @ts-expect-error prism types not installed
                        import("prismjs/components/prism-markup-templating"),
                        // @ts-expect-error
                        import("prismjs/components/prism-markup"),
                        // @ts-expect-error
                        import("prismjs/components/prism-bash"),
                        // @ts-expect-error
                        import("prismjs/components/prism-c"),
                        // @ts-expect-error
                        import("prismjs/components/prism-cpp"),
                        // @ts-expect-error
                        import("prismjs/components/prism-csharp"),
                        // @ts-expect-error
                        import("prismjs/components/prism-docker"),
                        // @ts-expect-error
                        import("prismjs/components/prism-java"),
                        // @ts-expect-error
                        import("prismjs/components/prism-js-templates"),
                        // @ts-expect-error
                        import("prismjs/components/prism-coffeescript"),
                        // @ts-expect-error
                        import("prismjs/components/prism-diff"),
                        // @ts-expect-error
                        import("prismjs/components/prism-git"),
                        // @ts-expect-error
                        import("prismjs/components/prism-go"),
                        // @ts-expect-error
                        import("prismjs/components/prism-graphql"),
                        // @ts-expect-error
                        import("prismjs/components/prism-handlebars"),
                        // @ts-expect-error
                        import("prismjs/components/prism-less"),
                        // @ts-expect-error
                        import("prismjs/components/prism-makefile"),
                        // @ts-expect-error
                        import("prismjs/components/prism-markdown"),
                        // @ts-expect-error
                        import("prismjs/components/prism-objectivec"),
                        // @ts-expect-error
                        import("prismjs/components/prism-ocaml"),
                        // @ts-expect-error
                        import("prismjs/components/prism-python"),
                        // @ts-expect-error
                        import("prismjs/components/prism-reason"),
                        // @ts-expect-error
                        import("prismjs/components/prism-rust"),
                        // @ts-expect-error
                        import("prismjs/components/prism-sass"),
                        // @ts-expect-error
                        import("prismjs/components/prism-scss"),
                        // @ts-expect-error
                        import("prismjs/components/prism-solidity"),
                        // @ts-expect-error
                        import("prismjs/components/prism-sql"),
                        // @ts-expect-error
                        import("prismjs/components/prism-stylus"),
                        // @ts-expect-error
                        import("prismjs/components/prism-swift"),
                        // @ts-expect-error
                        import("prismjs/components/prism-wasm"),
                        // @ts-expect-error
                        import("prismjs/components/prism-yaml"),
                      ]);
                      return m.Code;
                    }
                  ),
                { ssr: false }
              ),
              props
            );
        }
      };
    },
    { ssr: false }
  ),

  Collection: dynamic(
    () =>
      import("react-notion-x/build/third-party/collection").then(
        (m) => m.Collection
      ),
    { ssr: false }
  ),

  Equation: dynamic(
    () =>
      import("react-notion-x/build/third-party/equation").then(
        (m) => m.Equation
      ),
    { ssr: false }
  ),

  Pdf: dynamic(
    () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
    { ssr: false }
  ),

  Tweet: dynamic(
    () =>
      import("react-tweet-embed").then((mod) => {
        const { default: TweetEmbed } = mod;
        return function Tweet({ id }: { id: string }) {
          return <TweetEmbed tweetId={id} options={{ theme: "dark" }} />;
        };
      }),
    { ssr: false }
  ),
};

interface NotionRendererProps {
  recordMap: ExtendedRecordMap;
  components?: NotionXComponents;
  darkMode?: boolean;
  fullPage?: boolean;
}

export default function NotionRenderer({
  recordMap,
  components: overrideComponents,
}: NotionRendererProps) {
  const config = useConfig();
  const font = config.font === "serif" ? FONTS_SERIF : FONTS_SANS;

  if (recordMap) {
    for (const { value: block } of Object.values(recordMap.block)) {
      if (block?.type === "toggle") {
        (block as any).type = "toggle_nobelium"; // cast pour éviter l'erreur de type
      }
    }
  }

  const mergedComponents = {
    ...(baseComponents || {}),
    ...(overrideComponents || {}),
    Toggle: ({
      block,
      children,
    }: {
      block: ToggleBlock;
      children: ReactNode;
    }) => <Toggle block={block as ToggleBlock}>{children}</Toggle>,
  } as NotionXComponents;

  return (
    <>
      <style jsx global>{`
        .notion {
          --notion-font: ${font};
        }
      `}</style>

      <Renderer recordMap={recordMap} components={mergedComponents} />
    </>
  );
}
