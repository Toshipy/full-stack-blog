import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PostCardProps } from '@/types/post'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link href={`/posts/${post.id}`}>
        {post.topImage && (
          <div className="relative h-48 w-full">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        <CardHeader className="pt-4">
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.author.name}</span>
            <time>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ja
              })}
            </time>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
