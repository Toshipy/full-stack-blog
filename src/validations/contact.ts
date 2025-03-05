import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(3, { message: '名前を３文字以上で入力してください' }),
  email: z
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .email({ message: '正しいメールアドレスの形式で入力してください' })
})

export type ContactFormData = z.infer<typeof contactSchema>
