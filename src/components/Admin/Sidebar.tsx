"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Archive,
  BarChart3,
  MessageSquare,
  Tag,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/inventory', label: 'Inventory', icon: Archive },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/discounts', label: 'Discounts', icon: Tag },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    window.location.href = '/admin/login'
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 70 : 250 }}
      className="h-screen bg-[#0B0B0B] text-white flex flex-col fixed left-0 top-0 z-40"
    >
      {/* Brand */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-playfair text-xl text-[#D4AF37]"
          >
            Elara Admin
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                `flex items-center gap-3 px-4 py-3 transition-colors ` +
                (isActive
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-r-2 border-[#D4AF37]'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white')
              }
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm font-montserrat">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </motion.aside>
  )
}
