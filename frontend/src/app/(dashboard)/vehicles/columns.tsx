'use client'

import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { ConfirmModal } from '@/src/components/ui/modals/ConfirmModal'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useDeleteVehicle } from '@/src/hooks/vehicles/useDeleteVehicle'
import { IVehicle } from '@/src/types/vehicle.interface'
import { ColumnDef } from '@tanstack/react-table'
import { Hash, MoreHorizontal, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const ActionCell = ({ vehicle }: { vehicle: IVehicle }) => {
	const [isOpen, setIsOpen] = useState(false)
	const { deleteVehicle, isLoadingDelete } = useDeleteVehicle()

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<span className='sr-only'>Открыть меню</span>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuGroup>
						<DropdownMenuLabel>Действия</DropdownMenuLabel>

						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(vehicle.id)}
						>
							Копировать ID
						</DropdownMenuItem>

						<Link href={PUBLIC_URL.vehicleEdit(vehicle.id)}>
							<DropdownMenuItem className='cursor-pointer'>
								Редактировать
							</DropdownMenuItem>
						</Link>

						<DropdownMenuItem
							className='text-destructive focus:text-destructive cursor-pointer'
							onClick={() => setIsOpen(true)}
						>
							Удалить
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>

			<ConfirmModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onConfirm={() => {
					deleteVehicle(vehicle.id)
					setIsOpen(false)
				}}
				isLoading={isLoadingDelete}
				title='Удалить транспорт?'
				description={`Вы уверены, что хотите удалить ${vehicle.mark} ${vehicle.model}? Это действие нельзя отменить.`}
			/>
		</>
	)
}

export const vehicleColumns: ColumnDef<IVehicle>[] = [
	{
		id: 'vehicle_info',
		header: 'Автомобиль',
		cell: ({ row }) => {
			const { mark, model, year } = row.original
			return (
				<div className='flex flex-col'>
					<span className='text-sm tracking-tight'>
						{mark} {model}
					</span>
					{year && (
						<span className='text-[10px] text-muted-foreground'>
							{year} г.в.
						</span>
					)}
				</div>
			)
		}
	},
	{
		accessorKey: 'licensePlate',
		header: 'Госномер',
		cell: ({ row }) => (
			<Badge
				variant='outline'
				className='font-mono bg-background px-2 py-0.5 border-2 border-border/80'
			>
				{row.getValue('licensePlate')}
			</Badge>
		)
	},
	{
		accessorKey: 'vin',
		header: 'VIN',
		cell: ({ row }) => (
			<div className='flex items-center gap-2 font-mono text-xs text-muted-foreground'>
				<Hash className='size-3' />
				{row.getValue('vin')}
			</div>
		)
	},
	{
		id: 'drivers_count',
		header: 'Водители',
		cell: ({ row }) => {
			const drivers = row.original.drivers || []
			const count = drivers.length

			return (
				<div className='flex items-center gap-2'>
					{count > 0 ? (
						<Badge variant='secondary' className='font-normal py-1'>
							<User className='mr-1.5 size-3 text-muted-foreground' />
							{count} {count === 1 ? 'водитель' : 'водителя'}
						</Badge>
					) : (
						<span className='text-xs text-muted-foreground/60 italic px-2'>
							Нет водителей
						</span>
					)}
				</div>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionCell vehicle={row.original} />
	}
]
