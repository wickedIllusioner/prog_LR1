import { api } from '../api/api.interceptors'
import { API_URL } from '../config/api.config'
import { IIncident, IncidentSeverity } from '../types/incident.interface'

class IncidentService {
	async getAll(searchTerm?: string, skip?: number, take?: number) {
		const { data } = await api<IIncident[]>({
			url: API_URL.incidents(),
			method: 'GET',
			params: { searchTerm, skip, take }
		})
		return data || []
	}

	async getById(id: string) {
		const { data } = await api<IIncident>({
			url: API_URL.incidents(`${id}`),
			method: 'GET'
		})
		return data
	}

	async create(data: {
		date: string
		location: string
		description?: string
		severity?: IncidentSeverity
		photoUrl?: string
		involvedParties: {
			role: string
			driverId: string
			vehicleId: string
		}[]
	}) {
		const { data: createdIncident } = await api<IIncident>({
			url: API_URL.incidents(),
			method: 'POST',
			data
		})
		return createdIncident
	}

	async update(id: string, data: Partial<IIncident> & { photoUrl?: string }) {
		const { data: updatedIncident } = await api<IIncident>({
			url: API_URL.incidents(`${id}`),
			method: 'PUT',
			data
		})
		return updatedIncident
	}

	async delete(id: string) {
		const { data: deletedIncident } = await api({
			url: API_URL.incidents(`${id}`),
			method: 'DELETE'
		})
		return deletedIncident
	}

  async uploadPhoto(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('photo', file);

    const { data } = await api<{ fileName: string }>({
      url: API_URL.incidents('upload-photo'),
      method: 'POST',
      data: formData,
    });
    return data.fileName;
  }
}

export const incidentService = new IncidentService()