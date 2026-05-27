import { api } from '../api/api.interceptors'
import { API_URL } from '../config/api.config'
import {
	IAuthResponse,
	ILoginData,
	ILoginResponse,
	IVerify2FA
} from '../types/auth.interface'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

class AuthService {
	async login(data: ILoginData) {
		const response = await api<ILoginResponse>({
			url: API_URL.auth(),
			method: 'POST',
			data
		})
		return response.data
	}

	async verify2fa(data: IVerify2FA) {
		const response = await api<IAuthResponse>({
			url: API_URL.auth('verify-2fa'),
			method: 'POST',
			data
		})

		if (response.data.accessToken) {
			Cookies.set('accessToken', response.data.accessToken, { expires: 1 })
		}

		return response.data
	}

	logout() {
		Cookies.remove('accessToken')
	}

	getUserRole(): 'ADMIN' | 'USER' | null {
		const token = Cookies.get('accessToken')
		if (!token) return null

		try {
			const decoded = jwtDecode<{ role: 'ADMIN' | 'USER' }>(token)
			return decoded.role
		} catch (error) {
			return null
		}
	}
}

export const authService = new AuthService()
