import RegisterForm from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}
