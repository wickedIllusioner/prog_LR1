'use client'

import { useUpdateDriver } from '@/src/hooks/drivers/useUpdateDriver'
import { DriverForm } from '@/src/app/(dashboard)/drivers/DriverForm'
import { ChevronLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'

export default function EditDriverPage() {
	const { 
		driver, 
		updateDriver, 
		isLoadingUpdate, 
		isDriverLoading 
	} = useUpdateDriver()

	if (isDriverLoading) {
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
					href={PUBLIC_URL.drivers()} 
					className='p-2 hover:bg-accent rounded-full transition-colors'
				>
					<ChevronLeft className='size-6' />
				</Link>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>
						Редактирование водителя
					</h1>
					<p className='text-sm text-muted-foreground'>
						ID: {driver?.id}
					</p>
				</div>
			</div>

			<div className='max-w-3xl'>
				<DriverForm 
					initialData={driver} 
					onSubmit={(data) => updateDriver(data)} 
					isLoading={isLoadingUpdate} 
				/>
			</div>
		</div>
	)
}