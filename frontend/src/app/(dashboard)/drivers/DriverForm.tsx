'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { MultiSelect } from '@/src/components/ui/multi-select'
import { useVehiclesLookup } from '@/src/hooks/vehicles/useVehicleLookup'
import { IDriver } from '@/src/types/driver.interface'
import { Car, CreditCard, Loader2, Phone, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DriverFormProps {
	initialData?: IDriver | null
	onSubmit: (data: any) => void
	isLoading?: boolean
}

export function DriverForm({
	initialData,
	onSubmit,
	isLoading
}: DriverFormProps) {
	const { options: vehicleOptions, isLoading: isVehiclesLoading } =
		useVehiclesLookup()

	const [fullName, setFullName] = useState('')
	const [licenseNumber, setLicenseNumber] = useState('')
	const [phone, setPhone] = useState('')
	const [vehicleIds, setVehicleIds] = useState<string[]>([])

	useEffect(() => {
		if (initialData) {
			setFullName(initialData.fullName || '')
			setLicenseNumber(initialData.licenseNumber || '')
			setPhone(initialData.phone || '')
			const ids =
				initialData.vehicles?.map((v: any) => v.vehicle?.id || v.vehicleId) ||
				[]
			setVehicleIds(ids)
		}
	}, [initialData])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit({
			fullName,
			licenseNumber,
			phone,
			vehicleIds
		})
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6 animate-in fade-in duration-500'
		>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='space-y-2'>
					<Label className='flex items-center gap-2'>
						<User className='size-4 text-muted-foreground' /> ФИО
					</Label>
					<Input
						value={fullName}
						onChange={e => setFullName(e.target.value)}
						placeholder='Иванов Иван Иванович'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label className='flex items-center gap-2'>
						<CreditCard className='size-4 text-muted-foreground' /> Номер ВУ
					</Label>
					<Input
						value={licenseNumber}
						onChange={e => setLicenseNumber(e.target.value)}
						placeholder='77 15 123456'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label className='flex items-center gap-2'>
						<Phone className='size-4 text-muted-foreground' /> Телефон
					</Label>
					<Input
						value={phone}
						onChange={e => setPhone(e.target.value)}
						placeholder='+7 (999) 123-45-67'
					/>
				</div>

				<div className='space-y-2 md:col-span-2'>
					<Label className='flex items-center gap-2'>
						<Car className='size-4 text-muted-foreground' /> Закрепленные авто
					</Label>
					<MultiSelect
						options={vehicleOptions}
						defaultValue={vehicleIds}
						onValueChange={setVehicleIds}
						placeholder={
							isVehiclesLoading ? 'Загрузка...' : 'Выберите автомобили'
						}
					/>
					<p className='text-[0.8rem] text-muted-foreground'>
						Выберите один или несколько автомобилей из списка
					</p>
				</div>
			</div>

			<div className='flex items-center gap-4 pt-4 border-t'>
				<Button type='submit' disabled={isLoading} className='min-w-[160px]'>
					{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					{initialData ? 'Сохранить изменения' : 'Создать водителя'}
				</Button>

				<Button
					type='button'
					variant='outline'
					onClick={() => window.history.back()}
				>
					Отмена
				</Button>
			</div>
		</form>
	)
}
