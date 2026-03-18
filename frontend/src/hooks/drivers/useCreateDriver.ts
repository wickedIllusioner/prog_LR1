'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { driverService } from '@/src/services/driver.service'
import { IDriver } from '@/src/types/driver.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export function useCreateCategory() {
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: createDriver, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create driver'],
		mutationFn: (data: Partial<IDriver> & { vehicleIds?: string[] }) =>
			driverService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get drivers'] })
			queryClient.invalidateQueries({queryKey: ['get drivers lookup']})
			router.push(PUBLIC_URL.drivers())
		}
	})

	return useMemo(
		() => ({ createDriver, isLoadingCreate }),
		[createDriver, isLoadingCreate]
	)
}
