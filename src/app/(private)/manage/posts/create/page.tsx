'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createPost } from '@/lib/actions/createPost'
import { ChangeEvent, useActionState, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import TextareaAutosize from 'react-textarea-autosize'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export default function CreatePostPage() {
  const [content, setContent] = useState('')
  const [contentLength, setContentLength] = useState(0)
  const [preview, setPreview] = useState(false)
  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {}
  })

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setContent(content)
    setContentLength(content.length)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">記事を作成</h1>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            タイトル
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力"
          />
          {state.errors.title && (
            <p className="text-red-500 text-sm">
              {state.errors.title.join(', ')}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            画像
          </Label>
          <Input type="file" id="topImage" accept="image/*" name="topImage" />
          {state.errors.topImage && (
            <p className="text-red-500 text-sm">
              {state.errors.topImage.join(', ')}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            内容
          </Label>
          <TextareaAutosize
            className="w-full border p-2 font-mono text-sm"
            id="content"
            name="content"
            placeholder="内容を入力"
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className="text-red-500 text-sm">
              {state.errors.content.join(', ')}
            </p>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">
          文字数: {contentLength}
        </div>
        <div>
          <Button
            className="cursor-pointer"
            type="button"
            onClick={() => setPreview(!preview)}
          >
            {preview ? 'プレビューを閉じる' : 'プレビューを表示'}
          </Button>
        </div>
        {preview && (
          <div className="border p-4 bg-gray-50 rounded-md">
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <ReactMarkdown
                className="markdown"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        )}
        <Button className="cursor-pointer" type="submit">
          投稿
        </Button>
      </form>
    </div>
  )
}
