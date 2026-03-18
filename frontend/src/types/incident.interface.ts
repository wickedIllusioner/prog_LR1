import { IInvolvedParty, ParticipantRole } from "./involved-party.interface"

export enum IncidentSeverity {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
	CRITICAL = 'CRITICAL'
}

export interface IIncident {
	id: string
	date: string
	location: string
	description?: string
	severity: IncidentSeverity
	involvedParties: IInvolvedParty[]
	createdAt: string
}

export interface IInvolvedPartyInput {
  role: ParticipantRole
  driverId: string
  vehicleId: string
}

export interface IIncidentInput extends Pick<IIncident, 'date' | 'location' | 'description' | 'severity'> {
	involvedParties: IInvolvedPartyInput[]
}
