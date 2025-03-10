'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updatePost } from '@/lib/actions/updatePost'
import Image from 'next/image'
import { ChangeEvent, useActionState, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import TextareaAutosize from 'react-textarea-autosize'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type EditPostFormProps = {
  post: {
    id: string
    title: string
    content: string
    topImage?: string | null
    published: boolean
  }
}

export default function EditPageForm({ post }: EditPostFormProps) {
  const [content, setContent] = useState(post.content)
  const [contentLength, setContentLength] = useState(post.content.length)
  const [preview, setPreview] = useState(false)
  const [title, setTitle] = useState(post.title)
  const [published, setPublished] = useState(post.published)
  const [imagePreview, setImagePreview] = useState(post.topImage)
  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {}
  })

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setContent(content)
    setContentLength(content.length)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== post.topImage) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview, post.topImage])

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
            value={title}
            onChange={e => setTitle(e.target.value)}
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
            トップ画像
          </Label>
          <Input
            type="file"
            id="topImage"
            accept="image/*"
            name="topImage"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt={post.title}
                sizes="200px"
                width={0}
                height={0}
                className="w-[200px]"
                priority
              />
            </div>
          )}
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
        <RadioGroup
          value={published.toString()}
          name="published"
          onValueChange={value => setPublished(value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="true" />
            <Label htmlFor="true">公開</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="false" />
            <Label htmlFor="false">非公開</Label>
          </div>
        </RadioGroup>
        <Button className="cursor-pointer" type="submit">
          更新する
        </Button>
        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldImageUrl" value={post.topImage || ''} />
      </form>
    </div>
  )
}
