import PrivateHeader from '@/components/layouts/PrivateHeader'
import { ReactNode } from 'react'

export default function PrivateLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <PrivateHeader />
      {children}
    </div>
  )
}
