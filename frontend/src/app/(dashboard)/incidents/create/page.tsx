'use client'

import { useCreateIncident } from '@/src/hooks/incidents/useCreateIncident'
import { IncidentForm } from '../IncidentForm'

export default function CreateIncidentPage() {
	const { createIncident, isLoadingCreate } = useCreateIncident()

	return (
		<div className='p-6 max-w-5xl mx-auto'>
			<h2 className='text-3xl font-bold mb-6'>Регистрация нового ДТП</h2>
			<IncidentForm onSubmit={createIncident} isLoading={isLoadingCreate} />
		</div>
	)
}