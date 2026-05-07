"use client"

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface Props {
  title: string
  value: string
  icon: React.ReactNode
  trend?: number // percentage change
  trendLabel?: string
}

export default function StatCard({ title, value, icon, trend, trendLabel }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
      className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
          {icon}
        </div>
        {trend !== undefined && (
          <span className={`flex items-center text-sm font-medium ${
            trend >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{Math.abs(trend)}%</span>
          </span>
        )}
      </div>
      <h3 className="text-sm font-montserrat text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
      <p className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white">{value}</p>
      {trendLabel && (
        <p className="text-xs text-gray-400 mt-2">{trendLabel}</p>
      )}
    </motion.div>
  )
}
