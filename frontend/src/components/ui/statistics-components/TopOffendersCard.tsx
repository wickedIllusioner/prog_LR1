import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { IStatistics } from '@/src/types/statistics.interface'
import { UserIcon, ShieldCheckIcon } from 'lucide-react'

interface TopOffendersCardProps {
	data: IStatistics['topOffenders']
}

const TopOffendersCard = ({ data }: TopOffendersCardProps) => {
	const hasOffenders = data && data.length > 0

	return (
		<Card className='border-none shadow-none bg-card/50 h-full'>
			<CardHeader>
				<CardTitle className='text-lg flex items-center gap-2'>
					<UserIcon className='size-5 text-primary' />
					Частые нарушители
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col h-full justify-center'>
				<div className='space-y-4'>
					{hasOffenders ? (
						data.map((offender, index) => (
							<div 
								key={index} 
								className='flex justify-between items-center border-b border-border/40 pb-2 last:border-0'
							>
								<div className='flex flex-col'>
									<span className='font-medium'>{offender.name}</span>
								</div>
								<div className='flex items-center gap-2'>
									<span className='text-xl font-bold text-destructive'>{offender.count}</span>
									<span className='text-xs text-muted-foreground'>ДТП</span>
								</div>
							</div>
						))
					) : (
						<div className='flex flex-col items-center justify-center py-6 text-center space-y-2'>
							<ShieldCheckIcon className='size-10 text-muted-foreground/20' />
							<p className='text-sm text-muted-foreground italic'>
								На данный момент <br /> нарушителей не выявлено
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default TopOffendersCard