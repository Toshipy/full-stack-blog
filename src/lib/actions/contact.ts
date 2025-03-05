'use server'

import { contactSchema } from '@/validations/contact'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

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
  const name = formData.get('name') as string
  const email = formData.get('email') as string

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

  const contact = await prisma.contact.findUnique({
    where: {
      email: email as string
    }
  })

  if (contact) {
    return {
      success: false,
      error: {
        name: [],
        email: ['このメールアドレスは既に登録されています']
      }
    }
  }

  await prisma.contact.create({
    data: {
      name: name,
      email: email
    }
  })

  // 成功状態を返してからリダイレクト
  const result = {
    success: true,
    error: {}
  }

  redirect('/contacts/complete')

  return result
}
