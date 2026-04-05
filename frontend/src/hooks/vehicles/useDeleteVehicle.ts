'use client'

import { PUBLIC_URL } from '@/src/config/url.config'
import { vehicleService } from '@/src/services/vehicle.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useDeleteVehicle = () => {
  const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: deleteVehicle, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete vehicle'],
		mutationFn: (id: string) => vehicleService.delete(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get vehicles'] })
      router.push(PUBLIC_URL.vehicles())
		},
    onError(error: any) {
      const message = error.response?.data?.message || 'Ошибка. Убедитесь, что к транспорту не привязаны водители'
      toast.error(message)
    }
	})

	return useMemo(
		() => ({ deleteVehicle, isLoadingDelete }),
		[deleteVehicle, isLoadingDelete]
	)
}
