'use client'

import { sendContactForm } from '@/lib/actions/contact'
import { contactSchema } from '@/validations/contact'
import { useActionState, useState } from 'react'
import { FocusEvent } from 'react'
import { ZodError } from 'zod'

export default function ContactForm() {
  const [clientError, setClientError] = useState({
    name: '',
    email: ''
  })
  const [state, formAction] = useActionState(sendContactForm, {
    success: false,
    error: {},
    serverError: undefined
  })

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    try {
      if (name === 'name') {
        contactSchema.pick({ name: true }).parse({ name: value })
      } else if (name === 'email') {
        contactSchema.pick({ email: true }).parse({ email: value })
      }

      setClientError(prev => ({
        ...prev,
        [name]: ''
      }))
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors[0]?.message || ''
        setClientError(prevState => ({
          ...prevState,
          [name]: errorMessage
        }))
      }
    }
  }

  return (
    <div>
      <form action={formAction}>
        <div className="py-24 text-gray-600">
          <div className="mx-auto flex flex-col bg-white shadow-lg p-8 md:w-1/2 border border-gray-300 rounded-lg">
            <h2 className="text-lg mb-2">お問い合わせ</h2>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm">
                名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8"
                onBlur={handleBlur}
              />
              {clientError.name && (
                <p className="text-red-500 text-sm">{clientError.name}</p>
              )}
              {state.error.name && (
                <p className="text-red-500 text-sm">{state.error.name[0]}</p>
              )}
            </div>
            <div className="mb-8">
              <label htmlFor="email" className="text-sm">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8"
                onBlur={handleBlur}
              />
              {clientError.email && (
                <p className="text-red-500 text-sm">{clientError.email}</p>
              )}
              {state.error.email && (
                <p className="text-red-500 text-sm">{state.error.email[0]}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              送信
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
