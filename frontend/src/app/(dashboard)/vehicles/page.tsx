'use client'

import { DataTable } from '@/src/components/ui/data-table'
import { vehicleColumns } from './columns'
import { useGetVehicles } from '@/src/hooks/vehicles/useGetVehicles' // Твой хук
import { Plus, Truck } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'

export default function VehiclesPage() {
	const { vehicles, isLoading } = useGetVehicles()

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight'>Транспорт</h2>
					<p className='text-muted-foreground'>
						Учет транспортных средств и их технических данных
					</p>
				</div>
        <Link href={PUBLIC_URL.vehicleCreate()}>
				<Button className='gap-2 shadow-sm'>
					<Plus className='size-4' /> Добавить ТС
				</Button>
        </Link>
			</div>

			{isLoading ? (
        <div className='h-40 flex flex-col items-center justify-center'>
					<div className='size-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
				</div>
			) : (
				<DataTable 
					columns={vehicleColumns} 
					data={vehicles || []} 
					filterKey='licensePlate'
				/>
			)}
		</div>
	)
}