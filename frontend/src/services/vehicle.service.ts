import { api } from '../api/api.interceptors'
import { API_URL } from '../config/api.config'
import { IVehicle } from '../types/vehicle.interface'

class VehicleService {
	async getAll(searchTerm?: string, skip?: number, take?: number) {
		const { data } = await api<IVehicle[]>({
			url: API_URL.vehicles(),
			method: 'GET',
			params: { searchTerm, skip, take }
		})
		return data || []
	}

	async getById(id: string) {
		const { data } = await api<IVehicle>({
			url: API_URL.vehicles(`${id}`),
			method: 'GET'
		})
		return data
	}

	async getLookup() {
		const { data } = await api<
			{ id: string; licensePlate: string; mark: string; model: string }[]
		>({
			url: API_URL.vehicles('lookup'),
			method: 'GET'
		})
		return data
	}

	async create(data: Partial<IVehicle>) {
		const { data: createdVehicle } = await api<IVehicle>({
			url: API_URL.vehicles(),
			method: 'POST',
			data
		})
		return createdVehicle
	}

	async update(id: string, data: Partial<IVehicle>) {
		const { data: updatedVehicle } = await api<IVehicle>({
			url: API_URL.vehicles(`${id}`),
			method: 'PUT',
			data
		})
		return updatedVehicle
	}

	async delete(id: string) {
		const { data: deletedVehicle } = await api({
			url: API_URL.vehicles(`${id}`),
			method: 'DELETE'
		})
		return deletedVehicle
	}
}

export const vehicleService = new VehicleService()