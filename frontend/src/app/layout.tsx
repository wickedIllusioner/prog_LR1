import './globals.css'
import { Providers } from './providers'
import { TooltipProvider } from '@/src/components/ui/tooltip'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'Авто инциденты',
		template: `%s | Авто инциденты`
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TooltipProvider>
					<Providers>{children}</Providers>
				</TooltipProvider>
			</body>
		</html>
	)
}
