'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { driverService } from '@/src/services/driver.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const useDeleteDriver = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: deleteDriver, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete driver'],
		mutationFn: (id: string) => driverService.delete(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get drivers'] })
			router.push(PUBLIC_URL.drivers())
		}
	})

	return useMemo(
		() => ({ deleteDriver, isLoadingDelete }),
		[deleteDriver, isLoadingDelete]
	)
}
