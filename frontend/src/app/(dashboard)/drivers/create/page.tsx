'use client'

import { useCreateDriver} from '@/src/hooks/drivers/useCreateDriver'
import { DriverForm } from '../DriverForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'

export default function CreateDriverPage() {
	const { createDriver, isLoadingCreate } = useCreateDriver()

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-center gap-4'>
				<Link 
					href={PUBLIC_URL.drivers()} 
					className='p-2 hover:bg-accent rounded-full transition-colors'
				>
					<ChevronLeft className='size-6' />
				</Link>
				<h1 className='text-2xl font-bold tracking-tight'>Новый водитель</h1>
			</div>

			<div className='max-w-3xl'>
				<DriverForm 
					onSubmit={createDriver} 
					isLoading={isLoadingCreate} 
				/>
			</div>
		</div>
	)
}