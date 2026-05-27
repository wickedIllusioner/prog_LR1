'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { authService } from '@/src/services/auth.service'
import { EyeIcon, EyeOffIcon, Loader2, Mail, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	// Состояния для 1 шага (Учетные данные)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isVisible, setIsVisible] = useState(false)

	// Состояния для 2 шага (2FA)
	const [isOtpStep, setIsOtpStep] = useState(false)
	const [code, setCode] = useState('')

	// Обработчик первого шага (логин/пароль)
	const handleLoginSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			const res = await authService.login({ email, password })
			if (res.require2FA) {
				setIsOtpStep(true) // Включаем шаг 2FA
			}
		} catch (err: any) {
			setError(
				err?.response?.data?.message ||
					'Ошибка авторизации. Проверьте email и пароль.'
			)
		} finally {
			setIsLoading(false)
		}
	}

	// Обработчик второго шага (отправка кода)
	const handleOtpSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			await authService.verify2fa({ email, code })
			window.location.href = '/' // Успех! Идем на дашборд
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Неверный или устаревший код')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='space-y-6'>
			{error && (
				<div className='p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20'>
					{error}
				</div>
			)}

			{/* ШАГ 1: Логин и пароль */}
			{!isOtpStep ? (
				<form
					className='space-y-6 animate-in fade-in slide-in-from-bottom-2'
					onSubmit={handleLoginSubmit}
				>
					<div className='space-y-2'>
						<Label htmlFor='userEmail'>Email диспетчера</Label>
						<Input
							type='email'
							id='userEmail'
							placeholder='admin@test.ru'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
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
								onChange={e => setPassword(e.target.value)}
								required
							/>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								onClick={() => setIsVisible(!isVisible)}
								className='absolute inset-y-0 right-0 rounded-l-none text-muted-foreground hover:bg-transparent'
							>
								{isVisible ? (
									<EyeOffIcon className='size-4' />
								) : (
									<EyeIcon className='size-4' />
								)}
							</Button>
						</div>
					</div>

					<Button className='w-full' type='submit' disabled={isLoading}>
						{isLoading ? (
							<Loader2 className='size-4 animate-spin mr-2' />
						) : null}
						Продолжить
					</Button>
				</form>
			) : (
				/* ШАГ 2: Ввод кода из почты */
				<form
					className='space-y-6 animate-in fade-in slide-in-from-right-4'
					onSubmit={handleOtpSubmit}
				>
					<div className='flex flex-col items-center justify-center space-y-2 text-center pb-2'>
						<div className='bg-primary/10 p-3 rounded-full'>
							<ShieldCheck className='size-6 text-primary' />
						</div>
						<p className='text-sm text-muted-foreground'>
							Код подтверждения отправлен на <br />
							<strong className='text-foreground'>{email}</strong>
						</p>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='otpCode'>6-значный код</Label>
						<Input
							id='otpCode'
							type='text'
							placeholder='123456'
							maxLength={6}
							className='text-center text-lg tracking-widest'
							value={code}
							onChange={e => setCode(e.target.value.replace(/\D/g, ''))} // Разрешаем только цифры
							required
						/>
					</div>

					<Button
						className='w-full'
						type='submit'
						disabled={isLoading || code.length < 6}
					>
						{isLoading ? (
							<Loader2 className='size-4 animate-spin mr-2' />
						) : null}
						Войти в систему
					</Button>

					<Button
						type='button'
						variant='link'
						className='w-full text-xs text-muted-foreground'
						onClick={() => setIsOtpStep(false)}
					>
						Вернуться назад
					</Button>
				</form>
			)}
		</div>
	)
}
