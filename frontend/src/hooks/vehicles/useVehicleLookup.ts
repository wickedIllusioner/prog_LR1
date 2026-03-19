'use client'

import { vehicleService } from '@/src/services/vehicle.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useDriversLookup() {
	const { data: vehicles, isLoading } = useQuery({
		queryKey: ['drivers lookup'],
		queryFn: () => vehicleService.getLookup(),
		staleTime: 5 * 60 * 1000
	})

	return useMemo(
		() => ({
			options:
				vehicles?.map(v => ({
					label: `${v.licensePlate} (${v.mark} ${v.model})`,
					value: v.id
				})) || [],
			isLoading
		}),
		[vehicles, isLoading]
	)
}
