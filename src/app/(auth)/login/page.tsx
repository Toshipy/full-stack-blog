import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
