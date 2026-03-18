import { statisticsService } from '@/src/services/statistics.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetStatistics() {
	const { data: stats, isLoading } = useQuery({
		queryKey: ['main stats'],
		queryFn: () => statisticsService.getStats()
	})

	return useMemo(() => ({ stats, isLoading }), [stats, isLoading])
}
