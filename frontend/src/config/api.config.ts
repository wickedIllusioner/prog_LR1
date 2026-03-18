export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	drivers: (url = '') => API_URL.root(`/drivers/${url}`),
	vehicles: (url = '') => API_URL.root(`/vehicles/${url}`),
	incidents: (url = '') => API_URL.root(`/incidents/${url}`),
	statistics: (url = '') => API_URL.root(`/statistics/${url}`)
}
