'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { vehicleService } from '@/src/services/vehicle.service'
import { IVehicleInput } from '@/src/types/vehicle.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useCreateVehicle() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: createVehicle, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create vehicle'],
		mutationFn: (data: IVehicleInput) => vehicleService.create(data),

		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get vehicles'] })
			queryClient.invalidateQueries({ queryKey: ['get vehicles lookup'] })
      toast.success('Операция создания прошла успешно')
			router.push(PUBLIC_URL.vehicles())
		}
	})

	return useMemo(
		() => ({ createVehicle, isLoadingCreate }),
		[createVehicle, isLoadingCreate]
	)
}
