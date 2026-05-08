"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { showSuccess, showError, showConfirm } from '@/components/Admin/Notification'

const statusColors: Record<string, string> = {
  Active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Expired: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  Scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
}

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDiscount, setEditingDiscount] = useState<any>(null)
  const [formData, setFormData] = useState({
    code: '',
    type: 'Percentage',
    value: '',
    expiry: '',
    usage: ''
  })

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

  const resetForm = () => {
    setFormData({ code: '', type: 'Percentage', value: '', expiry: '', usage: '' })
    setEditingDiscount(null)
  }

  const handleEdit = (discount: any) => {
    setFormData({
      code: discount.code || '',
      type: discount.type || 'Percentage',
      value: discount.value || '',
      expiry: discount.expiry || '',
      usage: discount.usage?.split('/')[1] || '' // extract limit from "45/100"
    })
    setEditingDiscount(discount)
    setShowForm(true)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const payload = {
        code: formData.code,
        type: formData.type,
        value: formData.value,
        expiry: formData.expiry,
        usage: formData.usage ? `0/${formData.usage}` : undefined
      }

      if (editingDiscount) {
        const res = await fetch(`/api/admin/discounts/${editingDiscount.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (res.ok) {
          const updated = await res.json()
          setDiscounts(prev => prev.map(d => d.id === editingDiscount.id ? updated : d))
          showSuccess('Updated', 'Coupon updated successfully')
        } else {
          showError('Update Failed', 'Failed to update coupon')
        }
      } else {
        const res = await fetch('/api/admin/discounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (res.ok) {
          const newDiscount = await res.json()
          setDiscounts(prev => [...prev, newDiscount])
          showSuccess('Created', 'Coupon created successfully')
        } else {
          showError('Create Failed', 'Failed to create coupon')
        }
      }
      resetForm()
      setShowForm(false)
    } catch (err: any) {
      showError('Error', err.message || 'Operation failed')
    }
  }

  const handleDelete = async (discount: any) => {
    showConfirm('Delete Coupon', `Delete coupon ${discount.code}?`, async () => {
      try {
        const res = await fetch(`/api/admin/discounts/${discount.id}`, { method: 'DELETE' })
        if (res.ok) {
          setDiscounts(prev => prev.filter(d => d.id !== discount.id))
          showSuccess('Deleted', 'Coupon deleted successfully')
        } else {
          showError('Delete Failed', 'Failed to delete coupon')
        }
      } catch (err: any) {
        showError('Delete Failed', err.message || 'Failed to delete coupon')
      }
    })
  }

  if (loading) return <div className="p-6">Loading discounts...</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Discounts & Coupons</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage promotional offers</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#C49F30] transition-colors"
        >
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800 mb-6"
        >
          <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">
            {editingDiscount ? 'Edit Coupon' : 'New Coupon'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Coupon Code"
              value={formData.code}
              onChange={e => setFormData({...formData, code: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <select
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm"
            >
              <option value="Percentage">Percentage</option>
              <option value="Fixed Amount">Fixed Amount</option>
            </select>
            <input
              placeholder="Discount Value (e.g. 20 or $50)"
              value={formData.value}
              onChange={e => setFormData({...formData, value: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <input
              type="date"
              placeholder="Expiry Date"
              value={formData.expiry}
              onChange={e => setFormData({...formData, expiry: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <input
              placeholder="Usage Limit (leave empty for unlimited)"
              value={formData.usage}
              onChange={e => setFormData({...formData, usage: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm md:col-span-2"
            />
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-sm font-medium"
              >
                {editingDiscount ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm()
                  setShowForm(false)
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Table */}
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
              <motion.tr
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <td className="p-4 font-mono font-medium text-gray-900 dark:text-white">{c.code}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{c.type}</td>
                <td className="p-4 font-medium text-[#D4AF37]">{c.value}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{c.expiry}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{c.usage}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600"
                    ><Pencil size={16} /></button>
                    <button
                      onClick={() => handleDelete(c)}
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
