'use client'

import { vehicleColumns } from './columns'
import { Button } from '@/src/components/ui/button'
import { DataTable } from '@/src/components/ui/data-table'
import { Loader } from '@/src/components/ui/loader'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useRole } from '@/src/hooks/auth/useRole'
import { useGetVehicles } from '@/src/hooks/vehicles/useGetVehicles'
import { Loader2, Plus } from 'lucide-react'
import Link from 'next/link'

export default function VehiclesPage() {
	const role = useRole()
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
				{role === 'ADMIN' && (
					<Link href={PUBLIC_URL.vehicleCreate()}>
						<Button className='gap-2 shadow-sm'>
							<Plus className='size-4' /> Добавить ТС
						</Button>
					</Link>
				)}
			</div>

			{isLoading ? (
				<Loader />
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
