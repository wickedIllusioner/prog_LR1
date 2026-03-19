import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { IStatistics } from '@/src/types/statistics.interface'
import { IncidentSeverity } from '@/src/types/incident.interface'
import { Newspaper, ShieldCheckIcon } from 'lucide-react'

interface SeverityStatsCardProps {
	data: IStatistics['severityPie']
}

const severityLabels: Record<IncidentSeverity, string> = {
	[IncidentSeverity.LOW]: 'Легкое',
	[IncidentSeverity.MEDIUM]: 'Среднее',
	[IncidentSeverity.HIGH]: 'Высокое',
	[IncidentSeverity.CRITICAL]: 'Критическое'
}

const SeverityStatsCard = ({ data }: SeverityStatsCardProps) => {
	const hasData = data && data.length > 0 && data.some(item => item.value > 0)

	return (
		<Card className='border-none shadow-none bg-card/50'>
			<CardHeader>
				<CardTitle className='text-lg flex items-center gap-2'>
          <Newspaper className='size-5 text-primary' />
          Тяжесть инцидентов
          </CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col h-full justify-center'>
				<div className='space-y-2'>
					{hasData ? (
						data.map((item) => (
							<div
								key={item.type}
								className='flex justify-between items-center border-b border-border/50 pb-1 last:border-0'
							>
								<span className='text-muted-foreground'>
									{severityLabels[item.type] || item.type}:
								</span>
								<span className='font-bold text-xl'>{item.value}</span>
							</div>
						))
					) : (
						<div className='flex flex-col items-center justify-center py-6 text-center space-y-2'>
							<ShieldCheckIcon className='size-10 text-muted-foreground/20' />
							<p className='text-sm text-muted-foreground italic'>
								Данные по инцидентам <br /> отсутствуют
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default SeverityStatsCard