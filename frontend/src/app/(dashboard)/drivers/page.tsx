'use client'

import { driverColumns } from './columns'
import { Button } from '@/src/components/ui/button'
import { DataTable } from '@/src/components/ui/data-table'
import { useGetDrivers } from '@/src/hooks/drivers/useGetDrivers'
import { Plus } from 'lucide-react'

export default function DriversPage() {
	const { drivers, isLoading } = useGetDrivers()

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight'>Водители</h2>
					<p className='text-muted-foreground'>
						Управление списком водителей и закрепленным транспортом
					</p>
				</div>
				<Button className='gap-2'>
					<Plus className='size-4' /> Добавить водителя
				</Button>
			</div>

			{isLoading ? (
				<div className='h-40 flex flex-col items-center justify-center'>
					<div className='size-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
				</div>
			) : (
				<DataTable
					columns={driverColumns}
					data={drivers || []}
					filterKey='fullName'
				/>
			)}
		</div>
	)
}
