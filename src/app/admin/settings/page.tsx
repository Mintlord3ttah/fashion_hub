"use client"
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Store, CreditCard, Truck, Bell, Shield, Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('store')
  const [showPassword, setShowPassword] = useState(false)

  const tabs = [
    { id: 'store', label: 'Store', icon: Store },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your store configuration</p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={
                  "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors " +
                  (activeTab === tab.id
                    ? "border-b-2 border-[#D4AF37] text-[#D4AF37]"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white")
                }
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'store' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-lg">
              <h3 className="text-lg font-playfair text-gray-900 dark:text-white mb-4">Store Settings</h3>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Brand Name</label>
                <input defaultValue="Elara" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Contact Email</label>
                <input defaultValue="admin@elara.com" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm" />
              </div>
              <button className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-sm font-medium hover:bg-[#C49F30] transition-colors">
                Save Changes
              </button>
            </motion.div>
          )}

          {activeTab === 'payment' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-lg">
              <h3 className="text-lg font-playfair text-gray-900 dark:text-white mb-4">Payment Settings</h3>
              <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Stripe Integration</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">PayPal Integration</span>
              </label>
            </motion.div>
          )}

          {activeTab === 'shipping' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-lg">
              <h3 className="text-lg font-playfair text-gray-900 dark:text-white mb-4">Shipping Settings</h3>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Standard Shipping Fee</label>
                <input defaultValue="$15.00" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Delivery Regions</label>
                <textarea rows={3} defaultValue="North America, Europe, Asia" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm" />
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-lg">
              <h3 className="text-lg font-playfair text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
              {['New Order Alerts', 'Low Stock Alerts', 'Customer Messages'].map(item => (
                <label key={item} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <span className="text-sm">{item}</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
              ))}
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-lg">
              <h3 className="text-lg font-playfair text-gray-900 dark:text-white mb-4">Security</h3>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Change Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Enable Two-Factor Authentication</span>
              </label>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
