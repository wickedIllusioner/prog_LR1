import { api } from '../api/api.interceptors'
import { API_URL } from '../config/api.config'
import { IStatistics } from '../types/statistics.interface'

class StatisticsService {
	async getStats() {
		const { data } = await api<IStatistics>({
			url: API_URL.statistics(),
			method: 'GET'
		})
		return data
	}
}

export const statisticsService = new StatisticsService()
