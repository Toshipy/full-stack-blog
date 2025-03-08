import { auth } from '@/auth'
import PostDropdownMenu from '@/components/post/PostDropdown'
import { Button } from '@/components/ui/button'
import { getOwnPosts } from '@/lib/ownPost'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId || !session?.user?.id) {
    throw new Error('ユーザーが見つかりません')
  }
  const posts = await getOwnPosts(userId)
  if (!posts) {
    throw new Error('記事が見つかりません')
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">記事一覧</h1>
        <Link href="/manage/posts/create">
          <Button className="cursor-pointer" size="lg">
            新規投稿
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">タイトル</th>
              <th className="border p-3 text-center">更新日時</th>
              <th className="border p-3 text-center">公開状態</th>
              <th className="border p-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border p-3">{post.title}</td>
                <td className="border p-3 text-center">
                  {post.updatedAt.toLocaleString()}
                </td>
                <td className="border p-3 text-center">
                  {post.published ? '公開中' : '非公開'}
                </td>
                <td className="border p-3 text-center">
                  <PostDropdownMenu postId={post.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
