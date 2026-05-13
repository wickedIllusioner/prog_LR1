'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { driverService } from '@/src/services/driver.service'
import { IDriverInput } from '@/src/types/driver.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateDriver = () => {
	const params = useParams<{ id: string }>()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { data: driver, isLoading: isDriverLoading } = useQuery({
		queryKey: ['get driver', params.id],
		queryFn: () => driverService.getById(params.id),
		enabled: !!params.id
	})

	const { mutate: updateDriver, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update driver'], 
		mutationFn: (data: IDriverInput) => driverService.update(params.id!, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get drivers'] })
			toast.success('Данные водителя обновлены')
			router.push(PUBLIC_URL.drivers())
		},
		onError(error: string) {
			toast.error(error)
		}
	})

	return useMemo(
		() => ({ 
			driver, 
			updateDriver, 
			isLoadingUpdate, 
			isDriverLoading 
		}),
		[driver, updateDriver, isLoadingUpdate, isDriverLoading]
	)
}
