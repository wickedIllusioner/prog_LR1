import { IDriver } from "./driver.interface"
import { IVehicle } from "./vehicle.interface"

export enum ParticipantRole {
	CULPRIT = "CULPRIT",
	VICTIM = "VICTIM"
}

export interface IInvolvedParty {
	role: ParticipantRole
	driverId: string
	vehicleId: string
	driver?: IDriver
	vehicle?: IVehicle
}
