'use server'

import { contactSchema } from '@/validations/contact'
import { redirect } from 'next/navigation'

// ActionStateの型定義
type State = {
  success: boolean
  error: {
    name?: string[]
    email?: string[]
  }
  serverError?: string
}
export async function sendContactForm(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const name = formData.get('name')
  const email = formData.get('email')

  const validationResult = contactSchema.safeParse({
    name,
    email
  })

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors
    console.log(errors)
    return {
      success: false,
      error: {
        name: errors?.name || [],
        email: errors?.email || []
      }
    }
  }

  // 成功状態を返してからリダイレクト
  const result = {
    success: true,
    error: {}
  }

  redirect('/contacts/complete')

  return result
}
