"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Search, Filter, Download, Eye, Pencil, Trash2 } from 'lucide-react'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load customers', err)
        setLoading(false)
      })
  }, [])

  const filtered = customers.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="p-6">Loading customers...</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Customers</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your customer base</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Download size={16} />
          <span className="text-sm">Export</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Customers', value: customers.length.toString() },
          { label: 'Active This Month', value: '347' },
          { label: 'Avg. Spend', value: '$2,450' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#1a1a1a] p-4 rounded-xl border border-gray-100 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-left text-gray-500 dark:text-gray-400">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, idx) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-white">{c.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{c.email}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{c.phone}</td>
                  <td className="p-4 text-gray-900 dark:text-white">{c.orders}</td>
                  <td className="p-4 font-medium text-[#D4AF37]">{c.spent}</td>
                  <td className="p-4 text-gray-500">{c.joined}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('View customer profile: ' + c.name)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600"
                      ><Eye size={16} /></button>
                      <button
                        onClick={() => {
                          const newName = prompt('Update name:', c.name)
                          if (newName) {
                            fetch(`/api/admin/customers/${c.id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ name: newName })
                            }).then(() => {
                              setCustomers(prev => prev.map(cust => cust.id === c.id ? {...cust, name: newName} : cust))
                            })
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600"
                      ><Pencil size={16} /></button>
                      <button
                        onClick={() => {
                          if (confirm('Delete customer ' + c.name + '?')) {
                            fetch(`/api/admin/customers/${c.id}`, { method: 'DELETE' })
                              .then(() => setCustomers(prev => prev.filter(cust => cust.id !== c.id)))
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                      ><Trash2 size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
