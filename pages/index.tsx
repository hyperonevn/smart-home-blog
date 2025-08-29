import { GetStaticProps } from "next";
import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import { getAllPosts } from "@/lib/notion";
import { Post } from "@/types/postTypes";

interface BlogProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getAllPosts();

  // Sanitize to remove undefined values for Next.js serialization
  const sanitizedPosts = JSON.parse(JSON.stringify(posts ?? []));

  return {
    props: {
      posts: sanitizedPosts,
    },
    revalidate: 1,
  };
};

export default function Blog({ posts }: BlogProps) {
  return (
    <Container>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  );
}
