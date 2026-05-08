"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send reset email')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] font-sans">
        <div className="w-full max-w-md p-8 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8m-18 0l9 5.197m-9-5.197a2 2 0 010 2.22l.01.01M21 8l-9 5.197m-9-5.197a2 2 0 00-2.22 0L3 8m18 0l-9 5.197m-9-5.197a2 2 0 012.22 0l9 5.197M3 8l9 5.197M21 8l-9 5.197" />
            </svg>
          </div>
          <h1 className="text-2xl font-playfair text-gray-900 dark:text-white mb-4">Check Your Email</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">If an account exists for {email}, you'll receive a password reset link.</p>
          <p className="text-sm text-gray-500 mb-6">The link will expire in 24 hours.</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-6 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C49F30] transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] font-sans">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Reset Password</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your email to receive a reset link</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D4AF37] text-black font-medium rounded-lg hover:bg-[#C49F30] transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <a href="/auth/login" className="text-[#D4AF37] hover:underline font-medium">Sign In</a>
          </p>
          <a href="/" className="text-sm text-gray-500 hover:text-[#D4AF37] transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  )
}
