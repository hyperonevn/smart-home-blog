import { Post } from "@/types/postTypes";

export function getAllTagsFromPosts(
  posts: Array<Post>
): Record<string, number> {
  const tags: string[] = posts.flatMap((p) => p.Tags ?? []);
  const tagObj: Record<string, number> = {};
  tags.forEach((tag: string) => {
    tagObj[tag] = (tagObj[tag] ?? 0) + 1;
  });
  return tagObj;
}
