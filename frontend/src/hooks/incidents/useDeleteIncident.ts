'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { incidentService } from '@/src/services/incident.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const useDeleteIncident = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: deleteIncident, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete incident'],
		mutationFn: (id: string) => incidentService.delete(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get incidents'] })
			router.push(PUBLIC_URL.incidents())
		}
	})

	return useMemo(
		() => ({ deleteIncident, isLoadingDelete }),
		[deleteIncident, isLoadingDelete]
	)
}
