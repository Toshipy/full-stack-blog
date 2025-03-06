'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { Input } from '../ui/input'

export function SearchBox() {
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword, setDebouncedKeyword] = useState('')
  const router = useRouter()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  // 500msごとにkeywordを更新
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword)
    }, 500)
    return () => clearTimeout(timer)
  }, [keyword])

  // debouncedKeywordが変化したら、URLを更新
  useEffect(() => {
    if (debouncedKeyword) {
      router.push(`/?keyword=${debouncedKeyword.trim()}`)
    } else {
      router.push('/')
    }
  }, [debouncedKeyword, router])

  return (
    <div>
      <Input
        placeholder="記事を検索..."
        className="w-[200px] lg:w-[300px] bg-white"
        value={keyword}
        onChange={handleChange}
      />
    </div>
  )
}
