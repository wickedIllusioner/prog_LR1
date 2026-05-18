import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
	const { url, cookies } = request
	const token = cookies.get('accessToken')?.value
	const isLoginPage = url.includes('/login')

	if (isLoginPage && token) {
		return NextResponse.redirect(new URL('/', url))
	}

	if (!isLoginPage && !token) {
		return NextResponse.redirect(new URL('/login', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}