import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session')
  if (session?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true, user: process.env.ADMIN_USER || 'admin' })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}
