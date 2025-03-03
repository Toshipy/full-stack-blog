import React from 'react'

type Props = {
  params: {
    id: string
  }
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params
  return (
    <div>
      <p>ID: {id}</p>
    </div>
  )
}
