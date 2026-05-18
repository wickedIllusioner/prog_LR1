'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { authService } from '@/src/services/auth.service'

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      await authService.login({ email, password })
      // После успешного логина принудительно обновляем страницу и идем на главную
      window.location.href = '/' 
    } catch (err: any) {
      setError(err?.message || 'Ошибка авторизации. Проверьте email и пароль.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
          {error}
        </div>
      )}
      
      <div className='space-y-2'>
        <Label htmlFor='userEmail'>Email диспетчера</Label>
        <Input 
          type='email' 
          id='userEmail' 
          placeholder='admin@test.ru' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
        />
      </div>

      <div className='w-full space-y-2'>
        <Label htmlFor='password'>Пароль</Label>
        <div className='relative'>
          <Input 
            id='password' 
            type={isVisible ? 'text' : 'password'} 
            placeholder='••••••••' 
            className='pr-10' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsVisible(!isVisible)}
            className='absolute inset-y-0 right-0 rounded-l-none text-muted-foreground hover:bg-transparent'
          >
            {isVisible ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
          </Button>
        </div>
      </div>

      <Button className='w-full' type='submit' disabled={isLoading}>
        {isLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
        Войти
      </Button>
    </form>
  )
}