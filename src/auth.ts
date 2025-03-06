import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  return user
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials)
        if (!parsedCredentials.success) return null
        const { email, password } = parsedCredentials.data
        const user = await getUser(email)
        if (!user) return null
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (passwordsMatch) return user
        return null
      }
    })
  ]
})
