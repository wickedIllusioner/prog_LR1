import { api } from '../api/api.interceptors'
import { API_URL } from '../config/api.config'
import { IDriver, IDriverInput } from '../types/driver.interface'

class DriverService {
	async getAll(searchTerm?: string, skip?: number, take?: number) {
		const { data } = await api<IDriver[]>(({
			url: API_URL.drivers(),
			method: 'GET',
			params: { searchTerm, skip, take }
		}))
		return data || []
	}

	async getById(id: string) {
		const { data } = await api<IDriver>({
			url: API_URL.drivers(`${id}`),
			method: 'GET'
		})
		return data
	}

	async getLookup() {
		const { data } = await api<(
			{ id: string; fullName: string; licenseNumber: string }[]
		)>(({
			url: API_URL.drivers(`/lookup`),
			method: 'GET'
		}))
		return data
	}

	async create(data: IDriverInput) {
		const { data: createdDriver } = await api<IDriver>({
			url: API_URL.drivers(),
			method: 'POST',
			data
		})
		return createdDriver
	}

	async update(id: string, data: IDriverInput) {
		const { data: updatedDriver } = await api<IDriver>({
			url: API_URL.drivers(`${id}`),
			method: 'PUT',
			data
		})
		return updatedDriver
	}

	async delete(id: string) {
		const { data: deletedDriver } = await api({
      url: API_URL.drivers(`${id}`),
      method: 'DELETE'
    })
		return deletedDriver
	}
}

export const driverService = new DriverService()
