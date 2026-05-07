"use client"
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

const statusColors: Record<string, string> = {
  Active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Expired: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  Scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
}

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch('/api/admin/discounts')
      .then(res => res.json())
      .then(data => {
        setDiscounts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load discounts', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-6">Loading discounts...</div>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Discounts & Coupons</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage promotional offers</p>
        </div>
        <button onClick={() => setShowForm(true)} className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#C49F30] transition-colors">
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800 mb-6">
          <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">New Coupon</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Coupon Code" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm" />
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm">
              <option>Percentage</option>
              <option>Fixed Amount</option>
            </select>
            <input placeholder="Discount Value" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm" />
            <input type="date" placeholder="Expiry Date" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm" />
            <input placeholder="Usage Limit (leave empty for unlimited)" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm md:col-span-2" />
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-sm font-medium">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-left text-gray-500 dark:text-gray-400">
              <th className="p-4">Code</th>
              <th className="p-4">Type</th>
              <th className="p-4">Value</th>
              <th className="p-4">Expiry</th>
              <th className="p-4">Usage</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((c, idx) => (
              <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="p-4 font-mono font-medium text-gray-900 dark:text-white">{c.code}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{c.type}</td>
                <td className="p-4 font-medium text-[#D4AF37]">{c.value}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{c.expiry}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{c.usage}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>{c.status}</span></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newCode = prompt('Update code:', c.code)
                        if (newCode) {
                          fetch(`/api/admin/discounts/${c.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ code: newCode })
                          }).then(() => {
                            setDiscounts(prev => prev.map(d => d.id === c.id ? {...d, code: newCode} : d))
                          })
                        }
                      }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600"
                    ><Pencil size={16} /></button>
                    <button
                      onClick={() => {
                        if (confirm('Delete discount ' + c.code + '?')) {
                          fetch(`/api/admin/discounts/${c.id}`, { method: 'DELETE' })
                            .then(() => setDiscounts(prev => prev.filter(d => d.id !== c.id)))
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
    </motion.div>
  )
}
