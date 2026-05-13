'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { incidentService } from '@/src/services/incident.service'
import { IIncidentInput } from '@/src/types/incident.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useCreateIncident() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: createIncident, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create incident'],
		mutationFn: (data: IIncidentInput) => incidentService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get incidents'] })
			toast.success('Инцидент успешно создан')
			router.push(PUBLIC_URL.incidents())
		},
		onError(error: string) {
			toast.error(error)
		}
	})

	return useMemo(
		() => ({ createIncident, isLoadingCreate }),
		[createIncident, isLoadingCreate]
	)
}
