"use client";

import type { NotificationItem } from "@/context/NotificationContext";

type NotificationType = 'success' | 'error' | 'confirm';

let addNotificationFn: ((notification: Omit<NotificationItem, 'id'>) => void) | null = null;

/**
 * Call this from the NotificationProvider to wire the context's addNotification.
 */
export function setNotificationDispatcher(
  dispatcher: (notification: Omit<NotificationItem, 'id'>) => void
) {
  addNotificationFn = dispatcher;
}

export function showNotification(
  type: NotificationType,
  title: string,
  message: string,
  onConfirm?: () => void
) {
  if (addNotificationFn) {
    addNotificationFn({ type, title, message, onConfirm });
  } else {
    console.warn('Notification dispatcher not set. Wrap app with NotificationProvider.');
  }
}

export function showSuccess(title: string, message: string) {
  showNotification('success', title, message);
}

export function showError(title: string, message: string) {
  showNotification('error', title, message);
}

export function showConfirm(
  title: string,
  message: string,
  onConfirm: () => void
) {
  showNotification('confirm', title, message, onConfirm);
}
