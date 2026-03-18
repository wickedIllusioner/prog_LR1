'use client'

import { vehicleService } from '@/src/services/vehicle.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetVehicles(
	searchTerm?: string,
	skip?: number,
	take?: number
) {
	const { data: vehicles, isLoading } = useQuery({
		queryKey: ['get vehicles', searchTerm, skip, take],
		queryFn: () => vehicleService.getAll(searchTerm, skip, take)
	})

	return useMemo(
		() => ({
			vehicles: vehicles || [],
			isLoading
		}),
		[vehicles, isLoading]
	)
}
