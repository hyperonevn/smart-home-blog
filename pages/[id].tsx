import { GetStaticProps, GetStaticPaths } from "next";
import { clientConfig } from "@/lib/server/config";
import { useRouter } from "next/router";
import cn from "classnames";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import { useLocale } from "@/lib/locale";
import { useConfig } from "@/lib/config";
import { createHash } from "crypto";
import Container from "@/components/Container";
import Post from "@/components/Post";
import { BlogConfig, LocaleData } from "@/types";
import { Post as PostType } from "@/types/postTypes";

interface BlogPostProps {
  post: PostType;
  blockMap: any;
  emailHash: string;
}

export default function BlogPost({ post, blockMap, emailHash }: BlogPostProps) {
  const router = useRouter();
  const BLOG = useConfig() as unknown as BlogConfig;
  const locale = useLocale() as unknown as LocaleData;
  console.log(post);

  // TODO: It would be better to render something
  if (router.isFallback) return null;

  const fullWidth = post.fullWidth ?? false;

  return (
    <Container
      layout="blog"
      title={post.Title}
      description={post.Description}
      slug={post.Slug ?? post.Title}
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <Post
        post={post}
        blockMap={blockMap}
        emailHash={emailHash}
        fullWidth={fullWidth}
      />

      {/* Back and Top */}
      <div
        className={cn(
          "px-4 flex justify-between font-medium text-gray-500 dark:text-gray-400 my-5",
          fullWidth ? "md:px-24" : "mx-auto max-w-2xl"
        )}
      >
        <a>
          <button
            onClick={() => router.push(BLOG.path || "/")}
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ← {locale.POST.BACK}
          </button>
        </a>
        <a>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ↑ {locale.POST.TOP}
          </button>
        </a>
      </div>

      {/* Comments disabled */}
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = (posts ?? []).map((row: any) => `/${row.id}`);
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const id = params?.id as string;

  const posts = await getAllPosts();
  if (!posts) return { notFound: true };
  const post = posts.find((t: any) => t.id === id);

  if (!post) return { notFound: true };

  const blockMap = await getPostBlocks(post.id);
  const emailHash = createHash("md5")
    .update(clientConfig.email)
    .digest("hex")
    .trim()
    .toLowerCase();

  // Sanitize props to ensure JSON-serializable values
  const sanitized = JSON.parse(JSON.stringify({ post, blockMap, emailHash }));

  return {
    props: sanitized,
    revalidate: 1,
  };
};
