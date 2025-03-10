import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  content: z.string().min(1, { message: '内容は必須です' }),
  image: z.instanceof(File, { message: '画像は必須です' }).nullable().optional()
})

export type PostFormData = z.infer<typeof postSchema>
