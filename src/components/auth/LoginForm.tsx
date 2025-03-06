'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authenticate } from '@/lib/actions/authenticate'
import { useActionState } from 'react'

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined)

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-2xl font-bold text-center">
          ログイン
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-8">
        <form action={formAction} className="space-y-6">
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
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium mt-4"
          >
            ログイン
          </Button>
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
