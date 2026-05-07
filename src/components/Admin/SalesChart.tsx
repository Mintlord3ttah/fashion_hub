"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

interface SalesChartProps {
  data: { month: string; revenue: number }[];
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
    >
      <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">
        Revenue Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{ backgroundColor: '#0B0B0B', border: 'none' }}
            labelStyle={{ color: '#D4AF37' }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#D4AF37"
            strokeWidth={2}
            dot={{ fill: '#D4AF37' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
