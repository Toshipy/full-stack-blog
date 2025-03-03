import { ReactNode } from "react"

export default function AboutLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="bg-slate-200 h-screen">
      {children}
    </div>
  )
}
