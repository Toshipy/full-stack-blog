'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUser } from '@/lib/actions/createUser'
import { useActionState } from 'react'

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {}
  })

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-2xl font-bold text-center">
          ユーザー登録
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-8">
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              名前
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              className="h-12 text-base"
              placeholder="名前を入力"
            />
            {state.errors.name && (
              <p className="text-sm text-red-500 mt-2">
                {state.errors.name.join(', ')}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              メールアドレス
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              className="h-12 text-base"
              placeholder="メールアドレスを入力"
            />
            {state.errors.email && (
              <p className="text-sm text-red-500 mt-2">
                {state.errors.email.join(', ')}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base">
              パスワード
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              className="h-12 text-base"
              placeholder="パスワードを入力"
            />
            {state.errors.password && (
              <p className="text-sm text-red-500 mt-2">
                {state.errors.password.join(', ')}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-base">
              パスワード確認
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
              className="h-12 text-base"
              placeholder="パスワードを入力"
            />
            {state.errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-2">
                {state.errors.confirmPassword.join(', ')}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium mt-4"
          >
            ユーザー登録
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
