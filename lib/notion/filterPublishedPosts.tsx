import { Post } from "@/types/postTypes";

export default function filterPublishedPosts({ posts }: { posts: Post[] }) {
  if (!posts || !posts.length) return [];
  return posts.filter((post) => {
    return (
      post.Title &&
      post?.Status === "Archived" &&
      post.date <= new Date().getTime()
    );
  });
}
