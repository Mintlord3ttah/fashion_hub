"use client"

import { useState, FormEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
  const logout = searchParams.get('logout')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.success) {
        router.push(callbackUrl)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] font-sans">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Elara Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your account</p>
          {logout && (
            <p className="mt-4 text-sm text-green-600 dark:text-green-400">
              You have been logged out successfully.
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D4AF37] text-black font-medium rounded-lg hover:bg-[#C49F30] transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/auth/reset-password" className="text-sm text-[#D4AF37] hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-[#D4AF37] transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  )
}
