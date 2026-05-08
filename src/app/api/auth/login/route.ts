import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  const adminUser = process.env.ADMIN_USER
  const adminPass = process.env.ADMIN_PASS

  if (username === adminUser && password === adminPass) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    })
    return response
  }
  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
}
