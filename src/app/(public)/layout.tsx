import { PublicHeader } from '@/components/layouts/PublicHeader'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

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
