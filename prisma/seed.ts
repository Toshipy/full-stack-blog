import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

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
      name: 'Arai',
      email: 'arai@exmaple.com',
      password: hashedPassword,
      posts: {
        create: [
          {
            title: '１番目の投稿',
            content: 'これは最初のブログ投稿です',
            topImage: dummyImage[0],
            published: true
          },
          {
            title: '２番目の投稿',
            content: 'これは２番目のブログ投稿です',
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
