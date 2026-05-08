"use client"

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { showSuccess } from '@/components/Admin/Notification'
import { useCart } from '@/context/CartContext'

export default function ProductPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [product, setProduct] = useState<any>(null)
  const [stock, setStock] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        const [prodRes, stockRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/products/stock'),
        ])
        const products = await prodRes.json()
        const stockList = await stockRes.json()
        const found = products.find((p: any) => String(p.id) === id)
        setProduct(found || null)
        if (found) {
          const stockInfo = stockList.find((s: any) => s.id === found.id)
          setStock(stockInfo || null)
        }
      } catch (e) {
        console.error('Failed to fetch product', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  // Check auth status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        setIsLoggedIn(res.ok)
      } catch {
        setIsLoggedIn(false)
      }
    }
    checkAuth()
  }, [])

  if (!id) return <div className="min-h-screen flex items-center justify-center text-gray-500">Product ID missing</div>
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  if (!product) return <div className="min-h-screen flex items-center justify-center text-gray-500">Product not found</div>

  const outOfStock = stock?.status === 'Out of Stock'

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-playfair font-bold text-black hover:text-[var(--gold)] transition-colors">
              Elara
            </Link>
            <Link href="/#collection" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
              Back to Collection
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-playfair font-semibold text-black">{product.title}</h1>
              {product.isLimited && (
                <span className="mt-2 inline-block px-3 py-1 bg-[var(--gold)] text-white text-xs font-montserrat uppercase tracking-wider">
                  Limited
                </span>
              )}
            </div>
            <p className="text-2xl font-montserrat font-semibold text-[var(--gold)]">{product.price}</p>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            {product.category && (
              <p className="text-sm text-gray-500">Category: {product.category}</p>
            )}
            <div className="flex items-center gap-4">
              {stock && (
                <span className={`px-3 py-1 rounded-full text-xs font-montserrat uppercase ${outOfStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {stock.status}
                </span>
              )}
              {stock?.stock !== undefined && (
                <span className="text-sm text-gray-500">Stock: {stock.stock}</span>
              )}
            </div>
            <button
              disabled={outOfStock}
              onClick={() => {
                if (outOfStock) return;
                if (isLoggedIn) {
                  showSuccess('Proceeding to Checkout', `Redirecting to checkout for ${product.title}`);
                } else {
                  addToCart({ id: product.id, image: product.image, title: product.title, price: product.price });
                  showSuccess('Added to Cart', `${product.title} added to cart`);
                }
              }}
              className={`px-8 py-3 font-montserrat text-sm uppercase tracking-widest rounded-none transition-colors ${outOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-[var(--gold)] hover:text-black'}`}
            >
              {outOfStock ? 'Out of Stock' : isLoggedIn ? 'Buy Now' : 'Add to Cart'}
            </button>
            {product.isNew && (
              <p className="text-sm text-green-600">New Arrival</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
