export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),

	drivers: (url = '') => PUBLIC_URL.root(`/drivers${url ? `/${url}` : ''}`),
	driverCreate: () => PUBLIC_URL.drivers('/create'),
	driverEdit: (id: string = '') => PUBLIC_URL.drivers(`${id}/edit`),

	vehicles: (url = '') => PUBLIC_URL.root(`/vehicles${url ? `/${url}` : ''}`),
	vehicleCreate: () => PUBLIC_URL.vehicles('/create'),
	vehicleEdit: (id: string = '') => PUBLIC_URL.vehicles(`${id}/edit`),

	incidents: (url = '') => PUBLIC_URL.root(`/incidents${url ? `/${url}` : ''}`),
	incidentsCreate: () => PUBLIC_URL.incidents('/create'),
	incidentEdit: (id: string = '') => PUBLIC_URL.incidents(`${id}/edit`)
}
