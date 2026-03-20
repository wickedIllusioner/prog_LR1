'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { IVehicle } from '@/src/types/vehicle.interface'
import { Calendar, Car, Hash, Loader2, PenTool } from 'lucide-react'
import { useEffect, useState } from 'react'

interface VehicleFormProps {
	initialData?: IVehicle | null
	onSubmit: (data: any) => void
	isLoading?: boolean
}

export function VehicleForm({
	initialData,
	onSubmit,
	isLoading
}: VehicleFormProps) {
	const [mark, setMark] = useState('')
	const [model, setModel] = useState('')
	const [licensePlate, setLicensePlate] = useState('')
	const [vin, setVin] = useState('')
	const [year, setYear] = useState<string>('')

	useEffect(() => {
		if (initialData) {
			setMark(initialData.mark || '')
			setModel(initialData.model || '')
			setLicensePlate(initialData.licensePlate || '')
			setVin(initialData.vin || '')
			setYear(initialData.year?.toString() || '')
		}
	}, [initialData])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onSubmit({
			mark,
			model,
			licensePlate,
			vin,
			year: year ? Number(year) : undefined
		})
	}

	return (
		<form onSubmit={handleSubmit} className='max-w-3xl space-y-8 animate-in fade-in duration-500'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='space-y-2'>
					<Label className='flex items-center gap-2'>
						<Car className='size-4 text-muted-foreground' /> Марка
					</Label>
					<Input
						value={mark}
						onChange={e => setMark(e.target.value)}
						placeholder='Например, Toyota'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label className='flex items-center gap-2'>
						<PenTool className='size-4 text-muted-foreground' /> Модель
					</Label>
					<Input
						value={model}
						onChange={e => setModel(e.target.value)}
						placeholder='Например, Camry'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label className='flex items-center gap-2'>
						<Hash className='size-4 text-muted-foreground' /> Госномер
					</Label>
					<Input
						value={licensePlate}
						onChange={e => setLicensePlate(e.target.value)}
						placeholder='А 001 АА 77'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label className='flex items-center gap-2'>
						<Calendar className='size-4 text-muted-foreground' /> Год выпуска
					</Label>
					<Input
						type='number'
						value={year}
						onChange={e => setYear(e.target.value)}
						placeholder='2024'
						min={1900}
						max={new Date().getFullYear() + 1}
					/>
				</div>

				<div className='space-y-2 md:col-span-2'>
					<Label className='flex items-center gap-2'>
						<Hash className='size-4 text-muted-foreground' /> VIN-код
					</Label>
					<Input
						value={vin}
						onChange={e => setVin(e.target.value)}
						placeholder='17-значный номер'
						className='font-mono'
					/>
				</div>
			</div>

			<div className='flex items-center gap-4 pt-4 border-t'>
				<Button type='submit' disabled={isLoading} className='min-w-[200px]'>
					{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					{initialData ? 'Сохранить изменения' : 'Зарегистрировать транспорт'}
				</Button>
			</div>
		</form>
	)
}
