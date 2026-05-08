import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  // In a real app, you'd send a password reset email
  // For now, just return success
  return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' })
}
