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
import { useUpdateIncident } from '@/src/hooks/incidents/useUpdateIncident'
import { ParticipantRole } from '@/src/types/involved-party.interface'
import '@pbe/react-yandex-maps'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import {
	AlertTriangle,
	Calendar,
	ChevronLeft,
	Edit,
	Info,
	MapIcon,
	MapPin,
	Users
} from 'lucide-react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { yandexGeocoderService } from '@/src/services/yandex-geocoder.service'

const severityConfig: any = {
	LOW: { label: 'Низкая', variant: 'outline' },
	MEDIUM: { label: 'Средняя', variant: 'secondary' },
	HIGH: { label: 'Высокая', variant: 'default' },
	CRITICAL: { label: 'Критическая', variant: 'destructive' }
}

export default function IncidentViewPage() {
	const { incident, isIncidentLoading } = useUpdateIncident()
	const [coords, setCoords] = useState([55.751574, 37.573856])
	const [isMapLoaded, setIsMapLoaded] = useState(false)

	const mapRef = useRef<any>(null)

	useEffect(() => {
		const fetchCoords = async () => {
			if (!incident?.location) return

			const newCoords = await yandexGeocoderService.getCoordsFromAddress(
				incident.location
			)

			if (newCoords) {
				setCoords(newCoords)
				if (mapRef.current) {
					mapRef.current.setCenter(newCoords, 16)
				}
			}
		}

		if (isMapLoaded) {
			fetchCoords()
		}
	}, [isMapLoaded, incident?.location])

	if (isIncidentLoading) {
		return (
			<div className='flex h-[50vh] items-center justify-center'>
				<Loader2 className='size-8 animate-spin text-primary' />
			</div>
		)
	}

	const date = incident?.date ? new Date(incident.date) : null

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Link
						href={PUBLIC_URL.incidents()}
						className='p-2 hover:bg-accent rounded-full transition-colors'
					>
						<ChevronLeft className='size-6' />
					</Link>
					<div>
						<h1 className='text-2xl font-bold tracking-tight'>
							Детали инцидента
						</h1>
						<p className='text-sm text-muted-foreground'>
							Просмотр записи происшествия
						</p>
					</div>
				</div>
				<Link href={PUBLIC_URL.incidentEdit(incident?.id)}>
					<Button className='gap-2'>
						<Edit className='size-4' /> Редактировать
					</Button>
				</Link>
			</div>

			<div className='grid gap-6 md:grid-cols-3'>
				<Card className='md:col-span-2 border-none shadow-md'>
					<CardHeader>
						<CardTitle className='text-lg flex items-center gap-2 border-b pb-2'>
							<Info className='size-5 text-blue-500' /> Общие сведения
						</CardTitle>
					</CardHeader>
					<CardContent className='pt-4 space-y-6'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
							<div className='space-y-1'>
								<span className='text-xs uppercase text-muted-foreground font-semibold flex items-center gap-1'>
									<Calendar className='size-3' /> Дата и время
								</span>
								<p className='text-md font-medium'>
									{date
										? `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
										: 'Не указана'}
								</p>
							</div>
							<div className='space-y-1'>
								<span className='text-xs uppercase text-muted-foreground font-semibold flex items-center gap-1'>
									<AlertTriangle className='size-3' /> Тяжесть
								</span>
								<div>
									<Badge
										variant={
											severityConfig[incident?.severity || 'LOW'].variant
										}
									>
										{severityConfig[incident?.severity || 'LOW'].label}
									</Badge>
								</div>
							</div>
						</div>

						<div className='space-y-1'>
							<span className='text-xs uppercase text-muted-foreground font-semibold flex items-center gap-1'>
								<MapPin className='size-3' /> Местоположение
							</span>
							<p className='text-md'>{incident?.location || 'Не указано'}</p>
						</div>

						<div className='space-y-1 border-t pt-4'>
							<span className='text-xs uppercase text-muted-foreground font-semibold'>
								Описание
							</span>
							<p className='text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap'>
								{incident?.description || 'Описание отсутствует'}
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Яндекс Карты */}
				<Card className='border-none shadow-md overflow-hidden'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-lg flex items-center gap-2'>
							<MapIcon className='size-5 text-red-500' /> Карта происшествия
						</CardTitle>
					</CardHeader>
					<CardContent className='p-0 relative h-[300px]'>
						{!isMapLoaded && (
							<div className='absolute inset-0 flex items-center justify-center bg-muted/30 z-10'>
								<Loader2 className='size-6 animate-spin text-muted-foreground' />
							</div>
						)}
						<YMaps
							query={{
								apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY,
								load: 'package.full'
							}}
						>
							<Map
								defaultState={{ center: [55.751574, 37.573856], zoom: 16 }}
								instanceRef={ref => (mapRef.current = ref)}
								width='100%'
								height='100%'
								onLoad={() => setIsMapLoaded(true)}
							>
								<Placemark
									geometry={coords}
									options={{ preset: 'islands#redAutoIcon' }}
								/>
							</Map>
						</YMaps>
					</CardContent>
				</Card>

				{/* Участники */}
				<Card className='border-none shadow-md'>
					<CardHeader>
						<CardTitle className='text-lg flex items-center gap-2 border-b pb-2'>
							<Users className='size-5 text-orange-500' /> Участники
						</CardTitle>
					</CardHeader>
					<CardContent className='pt-4 px-3'>
						{incident?.involvedParties?.length ? (
							<div className='space-y-4'>
								{incident.involvedParties.map((party: any, idx: number) => (
									<div
										key={idx}
										className='p-3 rounded-lg border bg-muted/20 space-y-2'
									>
										<div className='flex justify-between items-center'>
											<Badge
												variant={
													party.role === ParticipantRole.CULPRIT
														? 'destructive'
														: 'outline'
												}
												className='text-[10px]'
											>
												{party.role === ParticipantRole.CULPRIT
													? 'Виновник'
													: 'Пострадавший'}
											</Badge>
										</div>
										<div className='text-sm font-medium'>
											{party.driver?.fullName}
										</div>
										<div className='text-[11px] text-muted-foreground'>
											{party.vehicle?.mark} {party.vehicle?.model}
											<span className='ml-2 font-mono uppercase bg-background px-1 rounded border'>
												{party.vehicle?.licensePlate}
											</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className='text-center py-6 text-muted-foreground italic text-sm'>
								Участники не указаны
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
