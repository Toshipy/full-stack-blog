import PostCard from '@/components/post/PostCard'
import { getPosts, searchPosts } from '@/lib/post'
import { Post } from '@/types/post'

type Params = {
  searchParams: Promise<{ keyword: string }>
}

export default async function PostsPage({ searchParams }: Params) {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.keyword || ''
  const posts = query ? await searchPosts(query) : await getPosts()
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
