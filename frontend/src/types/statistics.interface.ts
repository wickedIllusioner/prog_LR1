import { IncidentSeverity } from './incident.interface'

export interface IStatistics {
	counters: {
		incidents: number
		drivers: number
		vehicles: number
	}
	severityPie: {
		type: IncidentSeverity
		value: number
	}[]
	topOffenders: {
		name: string
		count: number
	}[]
}
