"use client";
import { useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

type ServerEvent = {
  type: 'order' | 'inventory' | 'message';
  title: string;
  message: string;
  link: string;
};

export const useNotificationStream = () => {
  const { addNotification } = useNotification();

  useEffect(() => {
    const source = new EventSource('/api/notifications/stream');
    source.onmessage = (e) => {
      try {
        const data: ServerEvent = JSON.parse(e.data);
        addNotification({
          type: data.type,
          title: data.title,
          message: data.message,
          link: data.link,
        });
      } catch (err) {
        console.error('Failed to parse notification', err);
      }
    };
    source.onerror = (err) => {
      console.error('Notification stream error', err);
      source.close();
    };
    return () => {
      source.close();
    };
  }, [addNotification]);
};
