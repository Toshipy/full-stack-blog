import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPostById } from '@/lib/post'
import { format } from 'date-fns'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Params = {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Params) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) {
    return notFound()
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        {post.topImage && (
          <div className="relative h-64 lg:h-96 w-full rounded-t-lg overflow-hidden">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-center gap-2 mb-4">
            <p className="text-sm text-gray-500">投稿者: {post.author.name}</p>
            <time className="text-sm text-gray-500">
              {format(new Date(post.createdAt), 'yyyy/MM/dd')}
            </time>
          </div>
          <CardTitle className="text-2xl font-bold">{post?.title}</CardTitle>
        </CardHeader>
        <CardContent className="mb-4">
          <p className="text-gray-700">{post?.content}</p>
        </CardContent>
      </Card>
    </div>
  )
}
