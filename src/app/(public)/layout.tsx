import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { PublicHeader } from '@/components/layouts/PublicHeader'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  )
}
