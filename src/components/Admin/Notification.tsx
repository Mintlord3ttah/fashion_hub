"use client";

import { getGlobalAddNotification } from "@/context/NotificationContext";
import type { NotificationItem } from "@/context/NotificationContext";

type NotificationType = 'success' | 'error' | 'confirm';

export function showNotification(
  type: NotificationType,
  title: string,
  message: string,
  onConfirm?: () => void
) {
  const addNotification = getGlobalAddNotification();
  if (addNotification) {
    addNotification({ type, title, message, onConfirm } as Omit<NotificationItem, 'id'>);
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
