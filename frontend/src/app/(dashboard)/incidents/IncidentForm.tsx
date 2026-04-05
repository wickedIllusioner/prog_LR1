'use client'

import { Button } from '@/src/components/ui/button'
import { Card, CardContent } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/src/components/ui/select'
import { Textarea } from '@/src/components/ui/textarea'
import { useDriversLookup } from '@/src/hooks/drivers/useDriversLookup'
import { useVehiclesLookup } from '@/src/hooks/vehicles/useVehicleLookup'
import {
	IIncident,
	IInvolvedPartyInput,
	IncidentSeverity
} from '@/src/types/incident.interface'
import { ParticipantRole } from '@/src/types/involved-party.interface'
import { IVehicle } from '@/src/types/vehicle.interface'
import {
	AlertTriangle,
	Calendar as CalendarIcon,
	Car,
	Loader2,
	MapPin,
	Plus,
	Trash2,
	User
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface IncidentFormProps {
	initialData?: IIncident | null
	onSubmit: (data: any) => void
	isLoading?: boolean
}

export function IncidentForm({
	initialData,
	onSubmit,
	isLoading
}: IncidentFormProps) {
	const { options: driverOptions, isLoading: isDriversLoading } =
		useDriversLookup()
	const { options: vehicleOptions, isLoading: isVehiclesLoading } =
		useVehiclesLookup()

	const [date, setDate] = useState('')
	const [location, setLocation] = useState('')
	const [description, setDescription] = useState('')
	const [severity, setSeverity] = useState<IncidentSeverity>(
		IncidentSeverity.LOW
	)
	const [involvedParties, setInvolvedParties] = useState<IInvolvedPartyInput[]>(
		[{ driverId: '', vehicleId: '', role: ParticipantRole.VICTIM }]
	)

	useEffect(() => {
		if (initialData) {
			if (initialData.date) {
				const d = new Date(initialData.date)
				const tzOffset = d.getTimezoneOffset() * 60000
				const localISOTime = new Date(d.getTime() - tzOffset)
					.toISOString()
					.slice(0, 16)
				setDate(localISOTime)
			}

			setLocation(initialData.location || '')
			setDescription(initialData.description || '')
			setSeverity(initialData.severity || IncidentSeverity.MEDIUM)

			if (
				initialData.involvedParties &&
				initialData.involvedParties.length > 0
			) {
				const formattedParties = initialData.involvedParties.map(party => ({
					role: party.role,
					driverId: party.driverId,
					vehicleId: party.vehicleId
				}))
				setInvolvedParties(formattedParties)
			}
		}
	}, [initialData])

	const addParticipant = () => {
		setInvolvedParties([
			...involvedParties,
			{ driverId: '', vehicleId: '', role: ParticipantRole.VICTIM }
		])
	}

	const removeParticipant = (index: number) => {
		setInvolvedParties(involvedParties.filter((_, i) => i !== index))
	}

	const updateParticipant = (
		index: number,
		field: keyof IInvolvedPartyInput,
		value: string
	) => {
		const updated = [...involvedParties]
		updated[index] = { ...updated[index], [field]: value }
		setInvolvedParties(updated)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit({
			date: new Date(date).toISOString(),
			location,
			description,
			severity,
			involvedParties: involvedParties.filter(p => p.driverId && p.vehicleId)
		})
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-8 animate-in fade-in duration-500'
		>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label className='flex items-center gap-2'>
							<CalendarIcon className='size-4 text-muted-foreground' /> Дата и
							время
						</Label>
						<Input
							type='datetime-local'
							value={date}
							onChange={e => setDate(e.target.value)}
							required
						/>
					</div>

					<div className='space-y-2'>
						<Label className='flex items-center gap-2'>
							<MapPin className='size-4 text-muted-foreground' /> Местоположение
						</Label>
						<Input
							value={location}
							onChange={e => setLocation(e.target.value)}
							placeholder='г. Москва, ул. Ленина, д. 1'
							required
						/>
					</div>

					<div className='space-y-2'>
						<Label className='flex items-center gap-2'>
							<AlertTriangle className='size-4 text-muted-foreground' /> Тяжесть
							инцидента
						</Label>
						<Select
              key={severity}
							value={severity}
							onValueChange={v => setSeverity(v as IncidentSeverity)}
						>
							<SelectTrigger>
								<SelectValue placeholder='Выберите тяжесть' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={IncidentSeverity.LOW}>Легкое</SelectItem>
								<SelectItem value={IncidentSeverity.MEDIUM}>Среднее</SelectItem>
								<SelectItem value={IncidentSeverity.HIGH}>Высокое</SelectItem>
								<SelectItem value={IncidentSeverity.CRITICAL}>
									Критическое
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className='space-y-2'>
					<Label>Описание происшествия</Label>
					<div className='h-full'>
						<Textarea
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder='Опишите детали инцидента...'
							className='min-h-[180px]'
						/>
					</div>
				</div>
			</div>

			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<Label className='text-lg font-semibold'>Участники инцидента</Label>
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={addParticipant}
						className='gap-2'
					>
						<Plus className='size-4' /> Добавить участника
					</Button>
				</div>

				<div className='grid gap-4'>
					{involvedParties.map((party, index) => {
						const currentDriverOption = driverOptions.find(
							opt => opt.value === party.driverId
						)
						const availableVehicles = currentDriverOption?.vehicles || []

						return (
							<Card
								key={index}
								className='relative overflow-hidden border-l-4 border-l-primary'
							>
								<CardContent className='p-4'>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
										<div className='space-y-2'>
											<Label className='text-xs flex items-center gap-1'>
												<User className='size-3' /> Водитель
											</Label>
											<Select
												key={`${isDriversLoading}-${party.driverId}`}
												value={party.driverId}
												onValueChange={v =>
													updateParticipant(index, 'driverId', v)
												}
											>
												<SelectTrigger>
													<SelectValue
														placeholder={
															isDriversLoading
																? 'Загрузка...'
																: 'Выберите водителя'
														}
													/>
												</SelectTrigger>
												<SelectContent>
													{driverOptions.map(opt => (
														<SelectItem key={opt.value} value={opt.value}>
															{opt.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div className='space-y-2'>
											<Label className='text-xs flex items-center gap-1'>
												<Car className='size-3' /> Транспорт
											</Label>
											<Select
												key={`${isVehiclesLoading}-${party.vehicleId}`}
												value={party.vehicleId}
												onValueChange={v =>
													updateParticipant(index, 'vehicleId', v)
												}
												disabled={!party.driverId}
											>
												<SelectTrigger>
													<SelectValue
														placeholder={
															isVehiclesLoading
																? 'Загрузка...'
																: 'Выберите авто'
														}
													/>
												</SelectTrigger>
												<SelectContent>
													{availableVehicles.map((v: IVehicle) => (
														<SelectItem key={v.id} value={v.id}>
															{v.mark} {v.model} ({v.licensePlate})
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div className='flex items-center gap-2'>
											<div className='flex-1 space-y-2'>
												<Label className='text-xs'>Роль</Label>
												<Select
													key={`${index}-${party.role}`}
													value={party.role ? party.role.toString() : ''}
													onValueChange={v =>
														updateParticipant(index, 'role', v)
													}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value={ParticipantRole.CULPRIT}>
															Виновник
														</SelectItem>
														<SelectItem value={ParticipantRole.VICTIM}>
															Пострадавший
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											{involvedParties.length > 1 && (
												<Button
													type='button'
													variant='ghost'
													size='icon'
													onClick={() => removeParticipant(index)}
													className='text-destructive hover:text-destructive hover:bg-destructive/10'
												>
													<Trash2 className='size-4' />
												</Button>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>

			<div className='flex items-center gap-4 pt-6 border-t'>
				<Button type='submit' disabled={isLoading} className='min-w-[150px]'>
					{isLoading ? (
						<Loader2 className='mr-2 size-4 animate-spin' />
					) : initialData ? (
						'Сохранить изменения'
					) : (
						'Создать инцидент'
					)}
				</Button>
			</div>
		</form>
	)
}
