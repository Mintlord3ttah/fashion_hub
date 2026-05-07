"use client"

import { useState, useEffect, useRef } from 'react'
import { useNotification } from '@/context/NotificationContext'
import Link from 'next/link'
import { Sun, Moon, Bell, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TopNavbar() {
const [darkMode, setDarkMode] = useState(false)
const router = useRouter()
const [searchQuery, setSearchQuery] = useState('')
const [open, setOpen] = useState(false)
const { notifications, unreadCount, markAsRead } = useNotification()
const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const isDark = storedTheme === 'dark' || (!storedTheme && document.documentElement.classList.contains('dark'))
    setDarkMode(isDark)
    if (storedTheme) {
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggleDarkMode = () => {
    const newDark = !darkMode
    setDarkMode(newDark)
    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="h-16 bg-white dark:bg-[#0B0B0B] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 fixed top-0 right-0 z-30 transition-colors">
      {/* Left side - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                router.push(`/admin/search?q=${encodeURIComponent(searchQuery.trim())}`)
              }
            }}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} className="text-[#D4AF37]" /> : <Moon size={20} className="text-gray-600" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            onClick={() => setOpen(!open)}
          >
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-xs text-white rounded-full flex items-center justify-center font-montserrat">
                {unreadCount}
              </span>
            )}
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0B0B0B] border border-gray-200 dark:border-gray-700 rounded shadow-lg z-20 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      if (n.link) router.push(n.link);
                      markAsRead(n.id);
                    }}
                  >
                    <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">{n.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@elara.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
