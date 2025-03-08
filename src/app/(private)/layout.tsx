import PrivateHeader from '@/components/layouts/PrivateHeader'
import { ReactNode } from 'react'

export default function PrivateLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <PrivateHeader />
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  )
}
