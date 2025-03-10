'use server'

import { signIn } from '@/auth'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/validations/user'
import * as bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { ZodError } from 'zod'

type ActionState = {
  success: boolean
  errors: Record<string, string[]>
}

// validation error
function handleValidationErrors(error: ZodError): ActionState {
  const fieldErrors = error.flatten().fieldErrors

  // undefinedの可能性を排除するために変換
  const safeErrors: Record<string, string[]> = {}

  // 各フィールドのエラーを安全に変換
  Object.entries(fieldErrors).forEach(([key, value]) => {
    safeErrors[key] = value || []
  })

  return {
    success: false,
    errors: safeErrors
  }
}

// Custom error
function handleError(customErrors: Record<string, string[]>) {
  return {
    success: false,
    errors: customErrors
  }
}

export async function createUser(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームから受け取った情報を取得
  const rawData = Object.fromEntries(
    ['name', 'email', 'password', 'confirmPassword'].map(field => [
      field,
      formData.get(field) as string
    ])
  ) as Record<string, string>

  // バリデーション
  const validationResult = registerSchema.safeParse(rawData)
  if (!validationResult.success) {
    return handleValidationErrors(validationResult.error)
  }

  // DBにメールアドレスが存在しているかの確認
  const existingUser = await prisma.user.findUnique({
    where: { email: rawData.email }
  })

  if (existingUser) {
    return handleError({
      email: ['このメールアドレスは既に登録されています']
    })
  }

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(rawData.password, 10)

  // DBに登録
  await prisma.user.create({
    data: {
      name: rawData.name,
      email: rawData.email,
      password: hashedPassword
    }
  })

  // dashboardにリダイレクト
  await signIn('credentials', {
    ...Object.fromEntries(formData),
    redirect: false
  })
  redirect('/dashboard')
}
