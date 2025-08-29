import { getAllPosts } from "@/lib/notion";
import { generateRss } from "@/lib/rss";
import { NextApiResponse } from "next";
import { Post } from "@/types/postTypes";

export async function getServerSideProps({
  res,
}: {
  res: NextApiResponse;
}): Promise<{ props: {} }> {
  res.setHeader("Content-Type", "text/xml");
  const posts: Post[] | null = await getAllPosts();
  const latestPosts: Post[] = posts?.slice(0, 10) ?? [];
  const rssPosts = latestPosts.map((p) => ({
    id: p.id,
    title: p.Title,
    slug: p.Slug ?? p.id,
    summary: p.Description ?? "",
    date: new Date(p.date),
  }));
  const xmlFeed: string = await generateRss(rssPosts);
  res.write(xmlFeed);
  res.end();
  return {
    props: {},
  };
}

const feed: () => null = () => null;
export default feed;
