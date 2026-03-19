'use client'

import SeverityStatsCard from '@/src/components/ui/statistics-components/SeverityStatsCard'
import StatisticsCard from '@/src/components/ui/statistics-components/StatisticsCard'
import TopOffendersCard from '@/src/components/ui/statistics-components/TopOffendersCard'
import { useGetStatistics } from '@/src/hooks/statistics/useGetStatistics'
import { TriangleAlertIcon, TruckIcon, UsersIcon } from 'lucide-react'

export default function DashboardContent() {
	const { stats, isLoading } = useGetStatistics()

	if (isLoading) return <div>Загрузка статистики...</div>

	const statisticsData = [
		{
			icon: <UsersIcon className='size-4' />,
			value: String(stats?.counters.drivers || 0),
			title: 'Всего водителей'
		},
		{
			icon: <TruckIcon className='size-4' />,
			value: String(stats?.counters.vehicles || 0),
			title: 'Транспортных средств'
		},
		{
			icon: <TriangleAlertIcon className='size-4' />,
			value: String(stats?.counters.incidents || 0),
			title: 'Всего инцидентов'
		}
	]

	return (
		<div className='space-y-8'>
      <h2 className='text-2xl font-medium'>Статистика</h2>
			<div className='mx-auto grid w-full gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-6'>
				{statisticsData.map((card, index) => (
					<StatisticsCard
						key={index}
						icon={card.icon}
						value={card.value}
						title={card.title}
					/>
				))}
			</div>

			<div className='mx-auto grid w-full gap-6 px-4 lg:grid-cols-2'>
				<SeverityStatsCard data={stats?.severityPie || []} />
				<TopOffendersCard data={stats?.topOffenders || []} />
			</div>
		</div>
	)
}
