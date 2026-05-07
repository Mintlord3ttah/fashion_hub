"use client"
import { motion } from 'framer-motion'
import { Search, Check, X, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load reviews', err)
        setLoading(false)
      })
  }, [])

  const filtered = reviews.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.product?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="p-6">Loading reviews...</div>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Reviews</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Moderate customer reviews</p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 dark:text-white">{r.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      r.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Product: {r.product}</p>
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} className={s <= r.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">"{r.comment}"</p>
                </div>
                {r.status === 'Pending' && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        fetch(`/api/admin/reviews/${r.id}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ status: 'Approved' })
                        }).then(() => {
                          setReviews(prev => prev.map(rev => rev.id === r.id ? {...rev, status: 'Approved'} : rev))
                        })
                      }}
                      className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                    ><Check size={16} /></button>
                    <button
                      onClick={() => {
                        if (confirm('Reject review from ' + r.name + '?')) {
                          fetch(`/api/admin/reviews/${r.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'Rejected' })
                          }).then(() => {
                            setReviews(prev => prev.map(rev => rev.id === r.id ? {...rev, status: 'Rejected'} : rev))
                          })
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    ><X size={16} /></button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
