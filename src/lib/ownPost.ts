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

export async function getPost(userId: string, postId: string) {
  const post = await prisma.post.findFirst({
    where: {
      AND: [
        {
          id: postId
        },
        {
          authorId: userId
        }
      ]
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: true,
      topImage: true,
      published: true,
      createdAt: true,
      updatedAt: true
    }
  })
  return post
}
