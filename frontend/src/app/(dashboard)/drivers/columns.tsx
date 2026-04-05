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
import { useDeleteDriver } from '@/src/hooks/drivers/useDeleteDriver'
import { IDriver } from '@/src/types/driver.interface'
import { ColumnDef } from '@tanstack/react-table'
import {
	MoreHorizontal,
	Phone,
	Truck
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const ActionCell = ({ driver }: { driver: IDriver }) => {
	const [isOpen, setIsOpen] = useState(false)
	const { deleteDriver, isLoadingDelete } = useDeleteDriver()

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
							onClick={() => navigator.clipboard.writeText(driver.id)}
						>
							Копировать ID
						</DropdownMenuItem>

            <Link href={PUBLIC_URL.drivers(driver.id)}>
              <DropdownMenuItem className='cursor-pointer'>
                Сведения
              </DropdownMenuItem>
            </Link>

						<Link href={PUBLIC_URL.driverEdit(driver.id)}>
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
					deleteDriver(driver.id)
					setIsOpen(false)
				}}
				isLoading={isLoadingDelete}
				title='Удалить водителя?'
				description={`Вы уверены, что хотите удалить ${driver.fullName}? Это действие нельзя отменить.`}
			/>
		</>
	)
}

export const driverColumns: ColumnDef<IDriver>[] = [
	{
		accessorKey: 'fullName',
		header: 'ФИО'
	},
	{
		accessorKey: 'licenseNumber',
		header: 'Удостоверение'
	},
	{
		accessorKey: 'phone',
		header: 'Телефон',
		cell: ({ row }) => {
			const phone = row.getValue('phone') as string
			return phone ? (
				<div className='flex items-center gap-2 text-muted-foreground'>
					<Phone className='size-3' />
					{phone}
				</div>
			) : (
				<span className='text-muted-foreground/50 italic text-xs'>
					не указан
				</span>
			)
		}
	},
	{
		accessorKey: 'vehicles',
		header: 'Транспорт',
		cell: ({ row }) => {
			const vehicles = row.original.vehicles || []
			const count = vehicles.length

			return (
				<div className='flex items-center gap-2'>
					<Badge variant='secondary' className='font-normal'>
						<Truck className='mr-1 size-3' />
						{count} ед.
					</Badge>
				</div>
			)
		}
	},
	{
		accessorKey: 'createdAt',
		header: 'Дата регистрации',
		cell: ({ row }) => {
			const date = new Date(row.getValue('createdAt'))
			return (
				<div className='text-muted-foreground text-sm'>
					{date.toLocaleDateString('ru-RU')}
				</div>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionCell driver={row.original} />
	}
]
