"use client"

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { showSuccess } from "@/components/Admin/Notification"

function ProductCard({ id, image, title, description, price, isLimited, stock, isLoggedIn }: {
  id: number
  image: string
  title: string
  description: string
  price: string
  isLimited?: boolean
  stock?: string
  isLoggedIn?: boolean
}) {
  const { addToCart } = useCart()
  const router = useRouter()
  const outOfStock = stock === 'Out of Stock'

  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer ${outOfStock ? 'opacity-60' : ''}`}
      onClick={() => {
        if (outOfStock) return
        if (isLoggedIn) {
          router.push(`/product?id=${id}`)
        } else {
          addToCart({ id, image, title, price })
          showSuccess('Added to Cart', `${title} added to cart`)
        }
      }}
    >
      <div className="relative h-80 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        {isLimited && (
          <span className="absolute top-2 right-2 px-3 py-1 bg-[var(--gold)] text-white text-xs font-montserrat uppercase tracking-wider">
            Limited
          </span>
        )}
        <span className={`absolute top-2 left-2 px-3 py-1 text-xs font-montserrat uppercase ${outOfStock ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
          {outOfStock ? 'Out of Stock' : 'In Stock'}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-playfair font-semibold text-black mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <p className="text-[var(--gold)] font-montserrat font-semibold">{price}</p>
      </div>
    </div>
  )
}

export default function ShoppingPage() {
  const [products, setProducts] = useState<any[]>([])
  const [stock, setStock] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Trending Items')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, stockRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/products/stock'),
        ])
        const [prodData, stockData] = await Promise.all([prodRes.json(), stockRes.json()])
        setProducts(prodData)
        setStock(stockData)
      } catch (e) {
        console.error('Failed to fetch', e)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        setIsLoggedIn(res.ok)
      } catch { setIsLoggedIn(false) }
    }
    checkAuth()
  }, [])

  const categories = useMemo(() => {
    const cats = ['Trending Items', ...new Set(products.map((p: any) => p.category).filter(Boolean))]
    return cats
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products
    if (selectedCategory === 'Trending Items') {
      // Sort by newest or featured (isNew first)
      filtered = [...products].sort((a: any, b: any) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    } else {
      filtered = products.filter((p: any) => p.category === selectedCategory)
    }
    if (search) {
      filtered = filtered.filter((p: any) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    return filtered
  }, [products, selectedCategory, search])

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-playfair font-bold text-black hover:text-[var(--gold)] transition-colors">
              Elara
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/#collection" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
                Back to Home
              </Link>
              <Link href="/cart" className="relative hover:text-[var(--gold)] transition-colors" aria-label="Cart">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.5 6m0 0L6 18h12M6 18a2 2 0 1 0 4 0m8 0a2 2 0 1 0 4 0M6 12h12" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[var(--gold)] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-playfair text-black mb-8">Shopping</h1>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-montserrat uppercase tracking-wider rounded-full transition-colors ${selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          ) : (
            filteredProducts.map((p: any) => {
              const stockInfo = stock.find((s: any) => s.id === p.id)
              const stockStatus = stockInfo ? stockInfo.status : 'Unknown'
              return (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image}
                  title={p.title}
                  description={p.description}
                  price={p.price}
                  isLimited={p.isLimited}
                  stock={stockStatus}
                  isLoggedIn={isLoggedIn}
                />
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}
