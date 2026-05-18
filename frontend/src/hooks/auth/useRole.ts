'use client'

import { authService } from '@/src/services/auth.service'
import { useEffect, useState } from 'react'

export const useRole = () => {
	const [role, setRole] = useState<'ADMIN' | 'USER' | null>(null)

	useEffect(() => {
		// Получаем роль только после монтирования компонента в браузере,
		// чтобы избежать ошибки Hydration Mismatch в Next.js
		setRole(authService.getUserRole())
	}, [])

	return role
}
