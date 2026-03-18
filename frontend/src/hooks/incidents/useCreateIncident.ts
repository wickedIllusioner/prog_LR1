'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { incidentService } from '@/src/services/incident.service'
import { IIncidentInput } from '@/src/types/incident.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export function useCreateIncident() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: createIncident, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create incident'],
		mutationFn: (data: IIncidentInput) => incidentService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get incidents'] })
			router.push(PUBLIC_URL.incidents())
		}
	})

	return useMemo(
		() => ({ createIncident, isLoadingCreate }),
		[createIncident, isLoadingCreate]
	)
}
