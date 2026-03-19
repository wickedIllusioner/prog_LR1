'use client'

import { driverService } from '@/src/services/driver.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useDriversLookup() {
	const { data: drivers, isLoading } = useQuery({
		queryKey: ['drivers lookup'],
		queryFn: () => driverService.getLookup(),
		staleTime: 5 * 60 * 1000
	})

	return useMemo(
		() => ({
			options:
				drivers?.map(d => ({
					label: d.fullName,
					value: d.id
				})) || [],
			isLoading
		}),
		[drivers, isLoading]
	)
}
