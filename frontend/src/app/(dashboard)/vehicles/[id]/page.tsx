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
import { useUpdateVehicle } from '@/src/hooks/vehicles/useUpdateVehicle'
import {
	Calendar,
	Car,
	ChevronLeft,
	Edit,
	Hash,
	ShieldCheck,
	Users
} from 'lucide-react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function VehicleViewPage() {
	const { vehicle, isVehicleLoading } = useUpdateVehicle()

	if (isVehicleLoading) {
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
						href={PUBLIC_URL.vehicles()}
						className='p-2 hover:bg-accent rounded-full transition-colors'
					>
						<ChevronLeft className='size-6' />
					</Link>
					<div>
						<h1 className='text-2xl font-bold tracking-tight'>
							{vehicle?.mark} {vehicle?.model}
						</h1>
						<Badge variant='outline' className='font-mono uppercase mt-1'>
							{vehicle?.licensePlate}
						</Badge>
					</div>
				</div>
				<Link href={PUBLIC_URL.vehicleEdit(vehicle?.id)}>
					<Button className='gap-2 shadow-sm'>
						<Edit className='size-4' /> Редактировать
					</Button>
				</Link>
			</div>

			<div className='grid gap-6 md:grid-cols-3'>
				<Card className='md:col-span-2 border-none shadow-md'>
					<CardHeader>
						<CardTitle className='text-lg flex items-center gap-2 border-b pb-2'>
							<ShieldCheck className='size-5 text-blue-500' /> Технические
							данные
						</CardTitle>
					</CardHeader>
					<CardContent className='pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6'>
						<div className='space-y-1'>
							<span className='text-xs uppercase text-muted-foreground font-semibold flex items-center gap-1'>
								<Hash className='size-3' /> VIN-номер
							</span>
							<p className='text-md font-mono font-medium bg-muted/50 p-2 rounded border'>
								{vehicle?.vin}
							</p>
						</div>
						<div className='space-y-1'>
							<span className='text-xs uppercase text-muted-foreground font-semibold flex items-center gap-1'>
								<Calendar className='size-3' /> Год выпуска
							</span>
							<p className='text-lg font-medium italic'>
								{vehicle?.year ? `${vehicle.year} г.` : 'Не указан'}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className='border-none shadow-md'>
					<CardHeader>
						<CardTitle className='text-lg flex items-center gap-2 border-b pb-2'>
							<Users className='size-5 text-green-500' /> Экипаж
						</CardTitle>
					</CardHeader>
					<CardContent className='pt-4'>
						{vehicle?.drivers?.length ? (
							<div className='space-y-3'>
								{vehicle.drivers.map((d: any) => (
									<div
										key={d.driver.id}
										className='flex flex-col p-3 border rounded-lg hover:bg-accent/10 transition-colors'
									>
										<span className='font-medium text-sm'>
											{d.driver.fullName}
										</span>
										<span className='text-[10px] text-muted-foreground font-mono'>
											ВУ: {d.driver.licenseNumber}
										</span>
									</div>
								))}
							</div>
						) : (
							<div className='text-center py-6 text-muted-foreground italic text-sm'>
								Водители не закреплены
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
