import { getAllPosts, getAllTagsFromPosts } from "@/lib/notion";
import SearchLayout from "@/layouts/search";

import { Post } from "@/types/postTypes";

export interface TagPageProps {
  tags: Record<string, number>;
  posts: Post[];
  currentTag: string;
}

export default function Tag({ tags, posts, currentTag }: TagPageProps) {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />;
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
  const currentTag = params.tag;
  const posts = await getAllPosts();
  const tags = getAllTagsFromPosts(posts as Post[]);
  const filteredPosts = posts?.filter(
    (post) => post && post.Tags && post.Tags.includes(currentTag)
  );
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const tags = getAllTagsFromPosts(posts as Post[]);
  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: true,
  };
}
