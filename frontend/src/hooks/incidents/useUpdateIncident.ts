'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { incidentService } from '@/src/services/incident.service'
import { IIncidentInput } from '@/src/types/incident.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const useUpdateIncident = () => {
	const params = useParams<{ id: string }>()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { data: incident, isLoading: isIncidentLoading } = useQuery({
		queryKey: ['get incident', params.id],
		queryFn: () => incidentService.getById(params.id),
		enabled: !!params.id
	})

	const { mutate: updateIncident, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update incident'], 
		mutationFn: (data: IIncidentInput) => {
      if (!params.id) throw new Error('ID инцидента не найден')
      return incidentService.update(params.id, data)
    },
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get incidents'] })
			router.push(PUBLIC_URL.incidents())
		}
	})

	return useMemo(() => ({ 
		incident, updateIncident, isLoadingUpdate, isIncidentLoading 
	}), [incident, updateIncident, isLoadingUpdate, isIncidentLoading])
}