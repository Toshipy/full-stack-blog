'use server'

import { auth } from '@/auth'
import { saveImage } from '@/utils/image'
import { type PostFormData, postSchema } from '@/validations/post'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '../prisma'

type ActionState = {
  success: boolean
  errors: Record<string, string[]>
}

export async function createPost(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Form 情報を取得
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const topImageInput = formData.get('topImage')
  const topImage = topImageInput ? (topImageInput as File) : null

  // Validation
  const validationResult = postSchema.safeParse({
    title,
    content,
    topImage
  })
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors
    }
  }

  // 画像保存
  const imageUrl = topImage ? await saveImage(topImage) : null
  if (topImage && !imageUrl) {
    return {
      success: false,
      errors: {
        image: ['画像の保存に失敗しました']
      }
    }
  }
  // データベースに保存
  const session = await auth()
  const userId = session?.user?.id
  if (!userId || !session?.user?.id) {
    throw new Error('ユーザーが見つかりません')
  }
  await prisma.post.create({
    data: {
      title,
      content,
      topImage: imageUrl,
      authorId: userId
    }
  })
  redirect('/dashboard')
}
