"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#D4AF37', '#0B0B0B', '#8884d8', '#82ca9d']

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load analytics', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-6">Loading analytics...</div>
  if (!data) return <div className="p-6">Failed to load analytics data</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Business performance overview</p>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
      >
        <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.revenueData || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: '#0B0B0B', border: 'none' }}
              labelStyle={{ color: '#D4AF37' }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#D4AF37' }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">Orders by Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.analytics?.monthlyOrders || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B0B0B', border: 'none' }}
              />
              <Bar dataKey="orders" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.analytics?.trafficSources || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {(data.analytics?.trafficSources || []).map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0B0B0B', border: 'none' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {(data.analytics?.trafficSources || []).map((t: any, i: number) => (
              <div key={t.source} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-sm text-gray-600 dark:text-gray-300">{t.source}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
