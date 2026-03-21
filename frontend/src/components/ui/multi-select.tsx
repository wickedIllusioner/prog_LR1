import { Badge } from '@/src/components/ui/badge'
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList
} from '@/src/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/src/components/ui/popover'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MultiSelectProps {
	options: { label: string; value: string }[]
	defaultValue?: string[]
	onValueChange: (value: string[]) => void
	placeholder?: string
	disabled?: boolean
}

export function MultiSelect({
	options,
	defaultValue = [],
	onValueChange,
	placeholder
}: MultiSelectProps) {
	const [selected, setSelected] = useState<string[]>(defaultValue)

  useEffect(() => {
    if (defaultValue) {
        setSelected(defaultValue)
    }
}, [defaultValue])

	const handleSelect = (value: string) => {
		const newSelected = selected.includes(value)
			? selected.filter(s => s !== value)
			: [...selected, value]
		setSelected(newSelected)
		onValueChange(newSelected)
	}

	return (
		<Popover>
			<PopoverTrigger>
				<div className='flex min-h-10 w-full flex-wrap gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background'>
					{selected.length > 0 ? (
						selected.map(val => (
							<Badge key={val} variant='secondary' className='gap-1'>
								{options.find(o => o.value === val)?.label}
							</Badge>
						))
					) : (
						<span className='text-muted-foreground'>{placeholder}</span>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-full p-0'>
				<Command>
					<CommandList>
						<CommandGroup>
							{options.map(option => (
								<CommandItem
									key={option.value}
									onSelect={() => handleSelect(option.value)}
								>
									<div
										className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${selected.includes(option.value) ? 'bg-primary text-primary-foreground' : 'opacity-50'}`}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
