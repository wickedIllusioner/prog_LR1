import { SERVER_URL } from '../config/api.config'
import { errorCatch, getContentType } from './api.helper'
import axios, { CreateAxiosDefaults } from 'axios'

const config: CreateAxiosDefaults = {
	baseURL: SERVER_URL,
	headers: getContentType()
}

const api = axios.create(config)

api.interceptors.response.use(
	response => response,
	error => {
		const message = errorCatch(error)
		return Promise.reject(message)
	}
)

export { api }
