'use client'

import { useCreateVehicle } from '@/src/hooks/vehicles/useCreateVehicle'
import { VehicleForm } from '../VehicleForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'

export default function CreateVehiclePage() {
	const { createVehicle, isLoadingCreate } = useCreateVehicle()

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-center gap-4'>
				<Link 
					href={PUBLIC_URL.vehicles()} 
					className='p-2 hover:bg-accent rounded-full transition-colors'
				>
					<ChevronLeft className='size-6' />
				</Link>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>
						Регистрация транспорта
					</h1>
					<p className='text-sm text-muted-foreground'>
						Введите технические характеристики нового автомобиля
					</p>
				</div>
			</div>

			<div className='bg-card border rounded-xl p-8 shadow-sm'>
				<VehicleForm 
					onSubmit={createVehicle} 
					isLoading={isLoadingCreate} 
				/>
			</div>
		</div>
	)
}