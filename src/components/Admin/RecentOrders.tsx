"use client"

import { motion } from 'framer-motion'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const statusColors: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-800',
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-purple-100 text-purple-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-red-100 text-red-800',
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data.slice(0, 5)) // Get only the 5 most recent
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load orders', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-4">Loading orders...</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
    >
      <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-gray-500 dark:text-gray-400">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Product</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                <td className="py-3 text-gray-600 dark:text-gray-300">{order.customer}</td>
                <td className="py-3 text-gray-600 dark:text-gray-300">{order.product}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 font-medium text-gray-900 dark:text-white">{order.amount}</td>
                <td className="py-3 text-gray-500">{order.date}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600"><Eye size={16} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600"><Pencil size={16} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
