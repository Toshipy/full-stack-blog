import { prisma } from './prisma'

export async function getOwnPosts(userId: string) {
  const post = await prisma.post.findMany({
    where: {
      authorId: userId
    },
    select: {
      id: true,
      title: true,
      published: true,
      updatedAt: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })
  return post
}
