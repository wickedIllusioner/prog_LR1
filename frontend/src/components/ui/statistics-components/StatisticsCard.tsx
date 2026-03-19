import type { ReactNode } from 'react'

import { Card, CardContent, CardHeader } from '@/src/components/ui/card'

import { cn } from '@/src/lib/utils'

type StatisticsCardProps = {
  icon: ReactNode
  value: string
  title: string
  className?: string
}

const StatisticsCard = ({ icon, value, title, className }: StatisticsCardProps) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='flex items-center'>
        <div className='bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-md'>
          {icon}
        </div>
        <span className='text-2xl'>{value}</span>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <span className='font-semibold'>{title}</span>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
