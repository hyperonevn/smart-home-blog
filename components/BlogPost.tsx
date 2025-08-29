import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Link from "next/link";
import { Post } from "@/types/postTypes";

interface BlogPostProps {
  post: Post;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const BLOG = useConfig();

  return (
    <Link href={`/${post.id}`}>
      <article key={post.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline">
          <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
            {post.Title}
          </h2>
          {/* <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            <FormattedDate date={post.date} />
          </time> */}
        </header>
        {/* <main>
          <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
            {post.summary}
          </p>
        </main> */}
      </article>
    </Link>
  );
};

export default BlogPost;
