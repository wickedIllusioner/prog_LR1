'use client'

import { VehicleForm } from '../VehicleForm'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useUpdateVehicle } from '@/src/hooks/vehicles/useUpdateVehicle'
import { ChevronLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditVehiclePage() {
	const { vehicle, updateVehicle, isLoadingUpdate, isVehicleLoading } =
		useUpdateVehicle()

	if (isVehicleLoading) {
		return (
			<div className='flex h-[50vh] items-center justify-center'>
				<Loader2 className='size-8 animate-spin text-primary' />
			</div>
		)
	}

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
						Редактирование транспорта
					</h1>
					<p className='text-sm text-muted-foreground'>ID: {vehicle?.id}</p>
				</div>
			</div>

			<div className='bg-card border rounded-xl p-8 shadow-sm'>
				<VehicleForm
					initialData={vehicle}
					onSubmit={updateVehicle}
					isLoading={isLoadingUpdate}
				/>
			</div>
		</div>
	)
}
