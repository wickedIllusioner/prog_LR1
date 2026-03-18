'use client'

import { driverService } from '@/src/services/driver.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetDrivers(
	searchTerm?: string,
	skip?: number,
	take?: number
) {
	const { data: drivers, isLoading } = useQuery({
		queryKey: ['get drivers', searchTerm, skip, take],
		queryFn: () => driverService.getAll(searchTerm, skip, take),
		staleTime: 60 * 1000
	})

	return useMemo(
		() => ({
			drivers: drivers || [],
			isLoading
		}),
		[drivers, isLoading]
	)
}
