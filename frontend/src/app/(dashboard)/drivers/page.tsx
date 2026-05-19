'use client'

import { driverColumns } from './columns'
import { Button } from '@/src/components/ui/button'
import { DataTable } from '@/src/components/ui/data-table'
import { Loader } from '@/src/components/ui/loader'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useRole } from '@/src/hooks/auth/useRole'
import { useGetDrivers } from '@/src/hooks/drivers/useGetDrivers'
import { Loader2, Plus } from 'lucide-react'
import Link from 'next/link'

export default function DriversPage() {
	const role = useRole()
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
				{role === 'ADMIN' && (
					<Link href={PUBLIC_URL.driverCreate()}>
						<Button className='gap-2'>
							<Plus className='size-4' /> Добавить водителя
						</Button>
					</Link>
				)}
			</div>

			{isLoading ? (
				<Loader />
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
