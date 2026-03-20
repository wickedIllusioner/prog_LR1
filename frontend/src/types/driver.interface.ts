import { IVehicle } from "./vehicle.interface"

export interface IDriver {
  id: string
  fullName: string
  licenseNumber: string
  phone?: string
  vehicles: { vehicle: IVehicle }[]
  createdAt: string
}

export interface IDriverInput extends Pick<IDriver, 'fullName' | 'licenseNumber' | 'phone'> {
  vehicleIds?: string[]
}