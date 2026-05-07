"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import StatCard from '@/components/Admin/StatCard'
import SalesChart from '@/components/Admin/SalesChart'
import RecentOrders from '@/components/Admin/RecentOrders'
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface DashboardData {
  stats: {
    totalRevenue: string;
    totalOrders: number;
    productsSold: number;
    activeCustomers: number;
    revenueTrend: number;
    ordersTrend: number;
    productsTrend: number;
    customersTrend: number;
  };
  categorySales: { category: string; percentage: number }[];
  topProducts: { name: string; sales: number; revenue: string; image: string }[];
  recentOrders: { id: string; customer: string; product: string; status: string; amount: string; date: string }[];
}

export default function DashboardHome() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load dashboard data', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Failed to load dashboard data</div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Revenue', value: data.stats.totalRevenue, icon: <DollarSign size={24} />, trend: data.stats.revenueTrend, trendLabel: 'vs last month' },
    { title: 'Total Orders', value: data.stats.totalOrders.toLocaleString(), icon: <ShoppingBag size={24} />, trend: data.stats.ordersTrend, trendLabel: 'vs last month' },
    { title: 'Products Sold', value: data.stats.productsSold.toLocaleString(), icon: <Package size={24} />, trend: data.stats.productsTrend, trendLabel: 'vs last month' },
    { title: 'Active Customers', value: data.stats.activeCustomers.toLocaleString(), icon: <Users size={24} />, trend: data.stats.customersTrend, trendLabel: 'vs last month' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Admin. Here's what's happening.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/admin/analytics">
            <button className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#C49F30] transition-colors flex items-center gap-2">
              View Analytics <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SalesChart data={data.revenueData} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">Sales by Category</h3>
          <div className="space-y-4">
            {data.categorySales.map((cat, i) => {
              const pct = cat.percentage;
              const color = ['#D4AF37', '#0B0B0B', '#888', '#D4AF37', '#0B0B0B'][i % 5];
              return (
                <div key={cat.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">{cat.category}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-playfair mb-4 text-gray-900 dark:text-white">Top Selling Products</h3>
          <div className="space-y-4">
            {data.topProducts.map((prod, idx) => (
              <motion.div
                key={prod.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{prod.name}</p>
                  <p className="text-xs text-gray-500">{prod.sales} sales</p>
                </div>
                <p className="text-sm font-semibold text-[#D4AF37]">{prod.revenue}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
