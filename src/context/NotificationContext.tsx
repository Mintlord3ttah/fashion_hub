"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, X, Trash2 } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'confirm' | 'order' | 'inventory' | 'message';

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  link?: string; // optional navigation target
  onConfirm?: () => void;
}

interface NotificationContextProps {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (n: Omit<NotificationItem, 'id'>) => void;
  removeNotification: (id: number) => void;
  markAsRead: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationId, setNotificationId] = useState(0);

  const addNotification = useCallback((n: Omit<NotificationItem, 'id'>) => {
    const id = notificationId + 1;
    setNotificationId(id);
    setNotifications((prev) => [...prev, { ...n, id }]);
    if (n.type !== 'confirm') {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));
      }, 5000);
    }
  }, [notificationId]);

  // SSE stream will be initialized by a child component

  // Register this addNotification with the compatibility layer
  useEffect(() => {
    // Dynamically import to avoid circular dependency
    import('@/components/Admin/Notification').then(mod => {
      mod.setNotificationDispatcher(addNotification);
    });
  }, [addNotification]);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const markAsRead = (id: number) => {
    removeNotification(id);
  };

  const unreadCount = notifications.length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, removeNotification, markAsRead }}>
      {children}
              {/* Toast UI */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 w-80">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`p-4 rounded-lg shadow-lg border ${
                notification.type === 'success'
                  ? 'bg-green-50 border-green-200'
                  : notification.type === 'error'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {notification.type === 'success' && <CheckCircle className="text-green-600 flex-shrink-0" size={20} />}
                {notification.type === 'error' && <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />}
                {(notification.type === 'order' || notification.type === 'inventory' || notification.type === 'message') && (
                  <BellIcon className="text-gray-600 flex-shrink-0" size={20} />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  {notification.type === 'confirm' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          notification.onConfirm?.();
                          removeNotification(notification.id);
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
                <button onClick={() => removeNotification(notification.id)} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};

// Helper icons for non‑toast types (optional)
const BellIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} width={size} height={size}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 8.75V14.158c0 .538-.214 1.055-.595 1.437L6 17h5m4 0a3 3 0 11-6 0h6z" />
  </svg>
);
