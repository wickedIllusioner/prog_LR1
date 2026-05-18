import { SERVER_URL } from '../config/api.config'
import { errorCatch, getContentType } from './api.helper'
import axios, { CreateAxiosDefaults } from 'axios'
import Cookies from 'js-cookie'

const config: CreateAxiosDefaults = {
	baseURL: SERVER_URL,
	headers: getContentType()
}

const api = axios.create(config)

api.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

api.interceptors.response.use(
	response => response,
	error => {
		const message = errorCatch(error)
		return Promise.reject(message)
	}
)

export { api }
