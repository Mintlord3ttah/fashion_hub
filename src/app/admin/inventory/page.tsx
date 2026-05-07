"use client"
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { AlertTriangle, Package, Pencil, Trash2 } from 'lucide-react'
import { showConfirm, showSuccess } from '@/components/Admin/Notification'

export default function InventoryPage() {
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/inventory')
      .then(res => res.json())
      .then(data => {
        setInventory(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load inventory', err)
        setLoading(false)
      })
  }, [])

  const filtered = inventory.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.sku.toLowerCase().includes(search.toLowerCase())
  )

  const lowStock = inventory.filter(i => i.stock <= i.threshold && i.stock > 0).length
  const outOfStock = inventory.filter(i => i.stock === 0).length

  if (loading) return <div className="p-6">Loading inventory...</div>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Inventory</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track stock levels</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#C49F30] transition-colors">
          Bulk Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Items', value: inventory.length, color: 'text-blue-600' },
          { label: 'Low Stock', value: lowStock, color: 'text-yellow-600' },
          { label: 'Out of Stock', value: outOfStock, color: 'text-red-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#1a1a1a] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-2xl font-playfair font-semibold ${s.color}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      {lowStock > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="text-yellow-600" size={20} />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">{lowStock} item(s) are running low on stock</p>
        </motion.div>
      )}

      <div className="mb-6">
        <input type="text" placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-left text-gray-500">
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Threshold</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{item.sku}</td>
                <td className="p-4 text-gray-900 dark:text-white">{item.stock}</td>
                <td className="p-4 text-gray-500">{item.threshold}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>{item.status}</span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newStock = prompt('Update stock:', item.stock.toString())
                        if (newStock !== null) {
                          fetch(`/api/admin/inventory/${item.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ stock: parseInt(newStock) })
                          }).then(() => {
                            setInventory(prev => prev.map(i => i.id === item.id ? {...i, stock: parseInt(newStock)} : i))
                          })
                        }
                      }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600"
                    ><Pencil size={16} /></button>
                    <button
                      onClick={() => {
                        showConfirm('Delete Item', `Delete item ${item.name}?`, async () => {
                          await fetch(`/api/admin/inventory/${item.id}`, { method: 'DELETE' })
                          setInventory(prev => prev.filter(i => i.id !== item.id))
                          showSuccess('Deleted', 'Item deleted successfully')
                        })
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
