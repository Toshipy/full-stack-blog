import { auth } from '@/auth'
import EditPostForm from '@/components/post/EditPostForm'
import { getPost } from '@/lib/ownPost'
import { notFound } from 'next/navigation'

type EditPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params
  const session = await auth()
  const userId = session?.user?.id
  if (!userId || !session?.user?.id) {
    throw new Error('ユーザーが見つかりません')
  }
  const post = await getPost(userId, id)
  if (!post) {
    return notFound()
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <EditPostForm post={post} />
    </div>
  )
}
