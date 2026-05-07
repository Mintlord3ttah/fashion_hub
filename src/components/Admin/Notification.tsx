"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import { CheckCircle, AlertTriangle, X, Trash2 } from 'lucide-react'

type NotificationType = 'success' | 'error' | 'confirm'

interface NotificationItem {
  id: number
  type: NotificationType
  title: string
  message: string
  onConfirm?: () => void
}

let notificationId = 0
let addNotificationFn: ((notification: Omit<NotificationItem, 'id'>) => void) | null = null

export function showNotification(type: NotificationType, title: string, message: string, onConfirm?: () => void) {
  if (addNotificationFn) {
    addNotificationFn({ type, title, message, onConfirm })
  }
}

export function showSuccess(title: string, message: string) {
  showNotification('success', title, message)
}

export function showError(title: string, message: string) {
  showNotification('error', title, message)
}

export function showConfirm(title: string, message: string, onConfirm: () => void) {
  showNotification('confirm', title, message, onConfirm)
}

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const addNotification = useCallback((notification: Omit<NotificationItem, 'id'>) => {
    const id = ++notificationId
    setNotifications(prev => [...prev, { ...notification, id }])
    if (notification.type !== 'confirm') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }, 3000)
    }
  }, [])

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Expose the add function globally
  if (typeof window !== 'undefined') {
    addNotificationFn = addNotification
  }

  return (
    <>
      {children}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 w-80">
        <AnimatePresence>
          {notifications.map(notification => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`p-4 rounded-lg shadow-lg border ${
                notification.type === 'success' ? 'bg-green-50 border-green-200' :
                notification.type === 'error' ? 'bg-red-50 border-red-200' :
                'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {notification.type === 'success' && (
                  <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                )}
                {notification.type === 'error' && (
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
                )}
                {notification.type === 'confirm' && (
                  <Trash2 className="text-red-600 flex-shrink-0" size={20} />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  {notification.type === 'confirm' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          notification.onConfirm?.()
                          removeNotification(notification.id)
                        }}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="px-3 py-1 border border-gray-300 text-xs rounded hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
