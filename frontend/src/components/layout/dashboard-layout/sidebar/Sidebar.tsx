'use client'

import { Badge } from '@/src/components/ui/badge'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger
} from '@/src/components/ui/sidebar'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useRole } from '@/src/hooks/auth/useRole'
import { authService } from '@/src/services/auth.service'
import { CarFront, ChartNoAxesCombinedIcon, LogOut } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { IoMdWarning } from 'react-icons/io'
import { IoPersonOutline } from 'react-icons/io5'

const SidebarPage = ({ children }: PropsWithChildren) => {
	const role = useRole()

	const handleLogout = () => {
		authService.logout()
		window.location.href = '/login'
	}

	return (
		<div className='flex min-h-dvh w-full'>
			<SidebarProvider>
				<Sidebar>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton
											render={
												<Link href={PUBLIC_URL.home()}>
													<ChartNoAxesCombinedIcon />
													<span>Главная</span>
												</Link>
											}
										/>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						<SidebarGroup>
							<SidebarGroupLabel>Вкладки контроля</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton
											render={
												<Link href={PUBLIC_URL.drivers()}>
													<IoPersonOutline />
													<span>Водители</span>
												</Link>
											}
										/>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											render={
												<Link href={PUBLIC_URL.vehicles()}>
													<CarFront />
													<span>Транспорт</span>
												</Link>
											}
										/>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											render={
												<Link href={PUBLIC_URL.incidents()}>
													<IoMdWarning />
													<span>Инциденты</span>
												</Link>
											}
										/>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						<SidebarGroup className='mt-auto'>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton
											onClick={handleLogout}
											className='text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors'
										>
											<LogOut className='size-4' />
											<span>Выйти</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<div className='flex flex-1 flex-col'>
					<header className='bg-card sticky top-0 z-50 flex h-13.75 items-center justify-between gap-6 border-b px-4 py-2 sm:px-6'>
						<SidebarTrigger className='[&_svg]:size-5!' />
						{role && (
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								Вы вошли как:
								<Badge variant={role === 'ADMIN' ? 'default' : 'secondary'}>
									{role === 'ADMIN' ? 'Администратор' : 'Диспетчер'}
								</Badge>
							</div>
						)}
					</header>
					<main className='size-full flex-1 px-4 py-6 sm:px-6'>{children}</main>
				</div>
			</SidebarProvider>
		</div>
	)
}

export default SidebarPage
