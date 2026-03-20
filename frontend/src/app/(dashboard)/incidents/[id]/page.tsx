'use client'

import { useUpdateIncident } from '@/src/hooks/incidents/useUpdateIncident'
import { IncidentForm } from '../IncidentForm'

export default function EditIncidentPage() {
	const { incident, updateIncident, isLoadingUpdate, isIncidentLoading } = useUpdateIncident()

	if (isIncidentLoading) return <div>Загрузка данных...</div>

	return (
		<div className='p-6 max-w-5xl mx-auto'>
			<h2 className='text-3xl font-bold mb-6'>Редактирование инцидента</h2>
			<IncidentForm 
				initialData={incident} 
				onSubmit={updateIncident} 
				isLoading={isLoadingUpdate} 
			/>
		</div>
	)
}