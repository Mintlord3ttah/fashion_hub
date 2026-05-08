"use client"

import { motion } from 'framer-motion'
import { Search, Mail, MailOpen, Trash2, Send } from 'lucide-react'
import { useState, useEffect } from 'react'
import ComposeMessage from '@/components/Admin/ComposeMessage'
import { showSuccess, showError } from '@/components/Admin/Notification'

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number | null>(null)
  const [showCompose, setShowCompose] = useState(false)
  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/admin/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load messages', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch('/api/admin/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Failed to load customers', err))
  }, [])

  const handleSend = async (to: string, subject: string, body: string) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body }),
      })
      if (res.ok) {
        showSuccess('Sent', 'Message sent successfully')
        setShowCompose(false)
      } else {
        showError('Send Failed', 'Failed to send message')
      }
    } catch (err: any) {
      showError('Send Failed', err.message || 'Failed to send message')
    }
  }

  const filtered = messages.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="p-6">Loading messages...</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Customer inquiries and support</p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#C49F30] transition-colors"
        >
          <Send size={16} />
          <span className="text-sm">Compose</span>
        </button>
      </div>

      {showCompose && (
        <ComposeMessage
          onClose={() => setShowCompose(false)}
          onSend={handleSend}
          customers={customers}
        />
      )}

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelected(msg.id)}
              className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30 ${
                selected === msg.id ? 'bg-gray-50 dark:bg-gray-800/30' : ''
              } ${!msg.read ? 'border-l-4 border-[#D4AF37]' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {msg.read ? (
                      <MailOpen size={16} className="text-gray-400" />
                    ) : (
                      <Mail size={16} className="text-[#D4AF37]" />
                    )}
                    <span className={`text-sm ${msg.read ? 'text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-white font-semibold'}`}>
                      {msg.name}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${msg.read ? 'text-gray-500' : 'text-gray-900 dark:text-white font-medium'}`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate">{msg.preview}</p>
                </div>
                <div className="flex flex-col items-end gap-2 ml-4">
                  <span className="text-xs text-gray-400">{msg.date}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Delete message from ' + msg.name + '?')) {
                        fetch(`/api/admin/messages/${msg.id}`, { method: 'DELETE' })
                          .then(() => setMessages(prev => prev.filter(m => m.id !== msg.id)))
                      }
                    }}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
