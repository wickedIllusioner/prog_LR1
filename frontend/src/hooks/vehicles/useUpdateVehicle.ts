'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { vehicleService } from '@/src/services/vehicle.service'
import { IVehicleInput } from '@/src/types/vehicle.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateVehicle = () => {
	const params = useParams<{ id: string }>()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { data: vehicle, isLoading: isVehicleLoading } = useQuery({
		queryKey: ['get vehicle', params.id],
		queryFn: () => vehicleService.getById(params.id),
		enabled: !!params.id
	})

	const { mutate: updateVehicle, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update vehicle'], 
		mutationFn: (data: IVehicleInput) => vehicleService.update(params.id, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get vehicles'] })
			toast.success('Данные транспортного средства обновлены')
			router.push(PUBLIC_URL.vehicles())
		},
		onError(error: string) {
			toast.error(error)
		}
	})

	return useMemo(() => ({ 
		vehicle, updateVehicle, isLoadingUpdate, isVehicleLoading 
	}), [vehicle, updateVehicle, isLoadingUpdate, isVehicleLoading])
}