'use client'

import { DataTable } from '@/src/components/ui/data-table'
import { incidentColumns } from './columns'
import { useGetIncidents } from '@/src/hooks/incidents/useGetIncidents'
import { Plus, AlertOctagon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { useState } from 'react'

export default function IncidentsPage() {
	const [searchTerm, setSearchTerm] = useState('')
	
	const { incidents, isLoading } = useGetIncidents(searchTerm)

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<div className='flex items-center gap-2'>
						<AlertOctagon className='size-6 text-destructive' />
						<h2 className='text-3xl font-bold tracking-tight'>Инциденты</h2>
					</div>
					<p className='text-muted-foreground'>
						Регистрация и мониторинг происшествий на дорогах
					</p>
				</div>
				<Button className='gap-2 shadow-md bg-destructive hover:bg-destructive/90 text-white'>
					<Plus className='size-4' /> Сообщить о ДТП
				</Button>
			</div>

			{isLoading ? (
				<div className='h-40 flex flex-col items-center justify-center'>
					<div className='size-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
				</div>
			) : (
				<div className='bg-card/30 rounded-lg p-2'>
					<DataTable 
						columns={incidentColumns} 
						data={incidents || []} 
						filterKey='location'
					/>
				</div>
			)}
		</div>
	)
}