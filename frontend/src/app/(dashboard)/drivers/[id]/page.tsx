'use client'

import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useUpdateDriver } from '@/src/hooks/drivers/useUpdateDriver'
import {
	ChevronLeft,
	CreditCard,
	Edit,
	Phone,
	Truck,
	User
} from 'lucide-react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function DriverDetailsPage() {
	const { driver, isDriverLoading } = useUpdateDriver()

	if (isDriverLoading) {
		return (
			<div className='flex h-[50vh] items-center justify-center'>
				<Loader2 className='size-8 animate-spin text-primary' />
			</div>
		)
	}

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Link
						href={PUBLIC_URL.drivers()}
						className='p-2 hover:bg-accent rounded-full transition-colors'
					>
						<ChevronLeft className='size-6' />
					</Link>
					<h1 className='text-2xl font-bold tracking-tight'>
						Карточка водителя
					</h1>
				</div>
				<Link href={PUBLIC_URL.driverEdit(driver?.id)}>
					<Button className='gap-2'>
						<Edit className='size-4' /> Редактировать
					</Button>
				</Link>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle className='text-lg flex items-center gap-2'>
							<User className='size-5 text-primary' /> Личная информация
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<p className='text-sm text-muted-foreground'>ФИО</p>
							<p className='font-medium text-lg'>{driver?.fullName}</p>
						</div>
						<div className='flex items-center gap-2'>
							<CreditCard className='size-4 text-muted-foreground' />
							<span>
								Удостоверение: <strong>{driver?.licenseNumber}</strong>
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Phone className='size-4 text-muted-foreground' />
							<span>{driver?.phone || 'Телефон не указан'}</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-lg flex items-center gap-2'>
							<Truck className='size-5 text-primary' /> Привязанный транспорт
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex flex-wrap gap-2'>
							{driver?.vehicles?.length ? (
								driver.vehicles.map((v: any) => (
									<Badge
										key={v.vehicle.id}
										variant='secondary'
										className='py-1.5 px-3'
									>
										{v.vehicle.mark} {v.vehicle.model} ({v.vehicle.licensePlate}
										)
									</Badge>
								))
							) : (
								<p className='text-sm text-muted-foreground italic'>
									Транспорт не закреплен
								</p>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
