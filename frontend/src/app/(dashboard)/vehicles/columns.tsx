'use client'

import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { IVehicle } from '@/src/types/vehicle.interface'
import { ColumnDef } from '@tanstack/react-table'
import { Hash, MoreHorizontal, User } from 'lucide-react'

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
		id: 'actions',
		cell: ({ row }) => {
			const vehicle = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<MoreHorizontal className='h-4 w-4' />
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
							<DropdownMenuItem>Редактировать</DropdownMenuItem>
							<DropdownMenuItem className='text-destructive'>
								Удалить
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]
