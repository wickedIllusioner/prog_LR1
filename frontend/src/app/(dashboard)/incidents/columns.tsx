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
import { IIncident, IncidentSeverity } from '@/src/types/incident.interface'
import { ParticipantRole } from '@/src/types/involved-party.interface'
import { ColumnDef } from '@tanstack/react-table'
import { AlertTriangle, Calendar, MapPin, MoreHorizontal } from 'lucide-react'

const severityConfig: Record<
	IncidentSeverity,
	{
		label: string
		variant: 'default' | 'secondary' | 'destructive' | 'outline'
	}
> = {
	[IncidentSeverity.LOW]: { label: 'Легкое', variant: 'secondary' },
	[IncidentSeverity.MEDIUM]: { label: 'Среднее', variant: 'outline' },
	[IncidentSeverity.HIGH]: { label: 'Высокое', variant: 'default' },
	[IncidentSeverity.CRITICAL]: { label: 'Критическое', variant: 'destructive' }
}

export const incidentColumns: ColumnDef<IIncident>[] = [
	{
		accessorKey: 'date',
		header: 'Дата и время',
		cell: ({ row }) => {
			const date = new Date(row.getValue('date'))
			return (
				<div className='flex items-center gap-2 text-sm'>
					<Calendar className='size-3 text-muted-foreground' />
					<span>
						{date.toLocaleDateString('ru-RU')}{' '}
						{date.toLocaleTimeString('ru-RU', {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'severity',
		header: 'Тяжесть',
		cell: ({ row }) => {
			const rawSeverity = row.getValue('severity') as string
			const severity = rawSeverity?.toUpperCase() as IncidentSeverity

			const config = severityConfig[severity] || {
				label: rawSeverity || 'Н/Д',
				variant: 'outline'
			}

			return (
				<Badge variant={config.variant} className='whitespace-nowrap'>
					{config.label}
				</Badge>
			)
		}
	},
	{
		accessorKey: 'location',
		header: 'Место',
		cell: ({ row }) => (
			<div className='flex items-center gap-2 max-w-[200px]'>
				<MapPin className='size-3 text-muted-foreground shrink-0' />
				<span className='truncate text-sm'>{row.getValue('location')}</span>
			</div>
		)
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const incident = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='size-8 p-0'>
							<MoreHorizontal className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Действия</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(incident.id)}
							>
								Копировать ID
							</DropdownMenuItem>
							<DropdownMenuItem>Детали</DropdownMenuItem>
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
