import { Loader2 } from 'lucide-react'

export function Loader() {
	return (
		<div className='h-40 flex flex-col items-center justify-center'>
			<Loader2 className='size-8 animate-spin text-primary' />
		</div>
	)
}
