import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { authConfig } from './auth.config'

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
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id || token.sub) as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    }
  }
})
