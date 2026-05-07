"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, ShoppingBag, Users, ArrowLeft } from 'lucide-react'

interface SearchResults {
  products: any[]
  orders: any[]
  customers: any[]
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResults>({ products: [], orders: [], customers: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], orders: [], customers: [] })
      return
    }
    const fetchResults = async () => {
      setLoading(true)
      try {
        const [productsRes, ordersRes, customersRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/orders'),
          fetch('/api/admin/customers'),
        ])
        const products = await productsRes.json()
        const orders = await ordersRes.json()
        const customers = await customersRes.json()
        const q = query.toLowerCase()
        const filteredProducts = products.filter((p: any) =>
          p.title?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
        )
        const filteredOrders = orders.filter((o: any) =>
          o.id?.toLowerCase().includes(q) || o.customer?.toLowerCase().includes(q) || o.product?.toLowerCase().includes(q)
        )
        const filteredCustomers = customers.filter((c: any) =>
          c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
        )
        setResults({
          products: filteredProducts,
          orders: filteredOrders,
          customers: filteredCustomers,
        })
      } catch (err) {
        console.error('Search failed', err)
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [query])

  const totalResults = results.products.length + results.orders.length + results.customers.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <div className="mb-6">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D4AF37] mb-4">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-playfair text-gray-900 dark:text-white">Search Results</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {loading ? 'Searching...' : `Found ${totalResults} result(s) for "${query}"`}
        </p>
      </div>

      {loading && <div className="text-center py-8 text-gray-500">Searching...</div>}

      {!loading && totalResults === 0 && query && (
        <div className="text-center py-12 text-gray-400">
          <p>No results found for "{query}"</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Products */}
        {results.products.length > 0 && (
          <section>
            <h2 className="text-xl font-playfair text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Package size={20} /> Products ({results.products.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.products.map((product) => (
                <Link key={product.id} href={`/admin/products`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#D4AF37] transition-colors"
                  >
                    <img src={product.image} alt={product.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h3 className="font-medium text-gray-900 dark:text-white">{product.title}</h3>
                    <p className="text-sm text-[#D4AF37] font-semibold">{product.price}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Orders */}
        {results.orders.length > 0 && (
          <section>
            <h2 className="text-xl font-playfair text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ShoppingBag size={20} /> Orders ({results.orders.length})
            </h2>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="p-4 text-left">Order ID</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {results.orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="p-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{order.customer}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{order.product}</td>
                      <td className="p-4 font-medium text-gray-900 dark:text-white">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Customers */}
        {results.customers.length > 0 && (
          <section>
            <h2 className="text-xl font-playfair text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users size={20} /> Customers ({results.customers.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.customers.map((customer) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                  <p className="text-sm text-[#D4AF37] font-semibold mt-1">{customer.spent}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  )
}
