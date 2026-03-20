import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/src/components/ui/alert-dialog'
import { TriangleAlertIcon } from 'lucide-react'

interface ConfirmModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	description?: string
	isLoading?: boolean
}

export const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	title = 'Вы уверены?',
	description = 'Это действие нельзя будет отменить.',
	isLoading
}: ConfirmModalProps) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader className='items-center'>
					<div className='bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
						<TriangleAlertIcon className='text-destructive size-6' />
					</div>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription className='text-center'>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>Отмена</AlertDialogCancel>
					<AlertDialogAction
						// variant='destructive'
						onClick={onConfirm}
						disabled={isLoading}
					>
						{isLoading ? 'Удаление...' : 'Удалить'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
