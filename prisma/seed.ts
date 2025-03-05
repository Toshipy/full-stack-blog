import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()

  // ハッシュ化
  const hashedPassword = await bcrypt.hash('password', 10)

  // ダミー画像
  const dummyImage = [
    'https://picsum.photos/seed/post1/600/400',
    'https://picsum.photos/seed/post2/600/400'
  ]

  // ユーザー作成
  const user = await prisma.user.create({
    data: {
      name: 'test',
      email: 'test@exmaple.com',
      password: hashedPassword,
      posts: {
        create: [
          {
            title: 'test',
            content: 'test',
            topImage: dummyImage[0],
            published: true
          },
          {
            title: 'test2',
            content: 'test2',
            topImage: dummyImage[1],
            published: true
          }
        ]
      }
    }
  })

  console.log({ user })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
