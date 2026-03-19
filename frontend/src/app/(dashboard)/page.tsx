import DashboardContent from './DashboardContent'

export default async function DashboardPage() {
	return (
		<div className='pt-6 sm:pt-8 lg:pt-6'>
      <DashboardContent />
			<div className='mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8'>
			</div>
		</div>
	)
}
