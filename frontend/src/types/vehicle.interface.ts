import { IDriver } from "./driver.interface"

export interface IVehicle {
  id: string
  vin: string
  licensePlate: string
  model: string
  mark: string
  year?: number
  drivers?: IDriver[]
}

export interface IVehicleInput extends Omit<IVehicle, 'id' | 'drivers'> {}