"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams(); // order id
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load order', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">Loading order details…</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <p className="text-red-600">Order not found.</p>
        <Link href="/admin/orders" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Orders
      </button>
      <h1 className="text-3xl font-playfair mb-4">Order {order.id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-gray-800">
          <h2 className="font-medium mb-2">Customer</h2>
          <p className="text-gray-900 dark:text-white">{order.customer}</p>
          {order.email && <p className="text-sm text-gray-500">{order.email}</p>}
        </div>
        <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-gray-800">
          <h2 className="font-medium mb-2">Products</h2>
          {order.items && order.items.length > 0 ? (
            <ul className="list-disc list-inside">
              {order.items.map((item: any, idx: number) => (
                <li key={idx} className="text-gray-900 dark:text-white">
                  {item.title} × {item.quantity} @ {item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-900 dark:text-white">{order.product}</p>
          )}
        </div>
        <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-gray-800">
          <h2 className="font-medium mb-2">Status</h2>
          <p className="text-gray-900 dark:text-white">{order.status}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-gray-800">
          <h2 className="font-medium mb-2">Amount</h2>
          <p className="text-gray-900 dark:text-white">{order.amount}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-gray-800">
          <h2 className="font-medium mb-2">Date</h2>
          <p className="text-gray-900 dark:text-white">{order.date}</p>
        </div>
      </div>
    </div>
  );
}
