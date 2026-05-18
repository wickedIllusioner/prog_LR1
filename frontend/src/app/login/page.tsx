import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import LoginForm from './login-form'

export default function LoginPage() {
  return (
    <div className='relative flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10'>
      <Card className='z-10 w-full max-w-md border shadow-md bg-background'>
        <CardHeader className='gap-2 text-center pb-2'>
          <CardTitle className='text-2xl font-bold tracking-tight'>Вход в систему</CardTitle>
          {/* <CardDescription className='text-base'>
            Авторизуйтесь для управления инцидентами
          </CardDescription> */}
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}