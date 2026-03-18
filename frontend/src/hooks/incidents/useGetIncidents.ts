'use client'

import { incidentService } from '@/src/services/incident.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetIncidents(
	searchTerm?: string,
	skip?: number,
	take?: number
) {
	const { data: incidents, isLoading } = useQuery({
		queryKey: ['get incidents', searchTerm, skip, take],
		queryFn: () => incidentService.getAll(searchTerm, skip, take),
		staleTime: 60 * 1000
	})

	return useMemo(
		() => ({
			incidents: incidents || [],
			isLoading
		}),
		[incidents, isLoading]
	)
}
