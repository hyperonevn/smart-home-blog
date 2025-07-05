export default function filterPublishedPosts({ posts, includePages }) {
  if (!posts || !posts.length) return []
  return posts
    .filter(post =>
      includePages
        ? post?.type?.[0]?.toLowerCase() === 'post' || post?.type?.[0]?.toLowerCase() === 'page'
        : post?.type?.[0]?.toLowerCase() === 'post'
    )
    .filter(post =>
      post.title &&
      post.slug &&
      post?.status?.[0]?.toLowerCase() === 'published' &&
      post.date <= new Date()
    )
}
