"use client"

import { motion } from 'framer-motion'
import { showSuccess, showError, showConfirm } from '@/components/Admin/Notification'

export default function NotificationsDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-playfair text-gray-900 dark:text-white mb-6">Notification Demo</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Use the buttons below to trigger the custom notification system. Success and error notifications disappear after a few seconds, while confirm notifications require you to choose an action.
      </p>

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <button
          onClick={() => showSuccess('Success', 'The operation completed successfully.')}
          className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#C49F30] transition-colors"
        >
          Show Success
        </button>
        <button
          onClick={() => showError('Error', 'Something went wrong. Please try again.')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Show Error
        </button>
        <button
          onClick={() =>
            showConfirm('Delete Item', 'Are you sure you want to delete this item?', () => {
              showSuccess('Deleted', 'The item was deleted.')
            })
          }
          className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Show Confirm
        </button>
      </div>
    </motion.div>
  )
}
