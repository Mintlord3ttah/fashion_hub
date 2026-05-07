import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  const adminUser = process.env.ADMIN_USER
  const adminPass = process.env.ADMIN_PASS

  if (username === adminUser && password === adminPass) {
    // Set a simple cookie to indicate authentication
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      // In production, set secure: true
      // secure: process.env.NODE_ENV === 'production',
    })
    return response
  } else {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  }
}