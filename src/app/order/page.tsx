"use client"

import { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { useCart } from '@/context/CartContext'
import { showSuccess } from '@/components/Admin/Notification'

export default function OrderPage() {
  const { items, clearCart, total, itemCount, mounted } = useCart()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [savedInfoLoaded, setSavedInfoLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('elara_user')
    if (saved) {
      const userData = JSON.parse(saved)
      setForm(prev => ({ ...prev, ...userData }))
      setSavedInfoLoaded(true)
    }
  }, [])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.phone.trim()) newErrors.phone = 'Phone is required'
    if (!form.address.trim()) newErrors.address = 'Address is required'
    if (!form.city.trim()) newErrors.city = 'City is required'
    if (!form.zipCode.trim()) newErrors.zipCode = 'Zip Code is required'
    if (items.length === 0) newErrors.items = 'Your cart is empty'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    localStorage.setItem('elara_user', JSON.stringify({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      zipCode: form.zipCode,
    }))

    const orderData = {
      customer: form.name,
      email: form.email,
      // Store a summary and full items array
      product: items.length === 1 ? items[0].title : `${items.length} items`,
      items: items.map(i => ({ title: i.title, quantity: i.quantity, price: i.price })),
      status: 'Pending',
      amount: total,
      date: new Date().toISOString().split('T')[0],
    }

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (res.ok) {
        setSubmitted(true)
        clearCart()
        showSuccess('Order Placed!', 'Your order has been successfully placed.')
      } else {
        showSuccess('Error', 'Failed to place order. Please try again.')
      }
    } catch (error) {
      showSuccess('Error', 'Failed to place order. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-playfair font-bold text-black hover:text-[var(--gold)] transition-colors">
                Elara
              </Link>
              <Link href="/#collection" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-playfair text-black mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-8">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
            <Link
              href="/"
              className="px-8 py-3 bg-black text-white font-montserrat text-sm uppercase tracking-widest rounded-none hover:bg-[var(--gold)] hover:text-black transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-playfair font-bold text-black hover:text-[var(--gold)] transition-colors">
                Elara
              </Link>
              <div className="flex items-center gap-8">
                <Link href="/cart" className="relative hover:text-[var(--gold)] transition-colors" aria-label="Cart">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.5 6m-0.5 0L6 18h12M6 18a2 2 0 0 1 0m8 0a2 2 0 0 1 0m-8 0M6 12h12" />
                  </svg>
                  {mounted &&itemCount > 0 && (
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
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-playfair text-black mb-8">Checkout</h1>

            {errors.items && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {errors.items}
              </div>
            )}

            {savedInfoLoaded && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 mb-2">We have your saved shipping information. You can edit any field below or clear saved info.</p>
                <button
                  type="button"
                  onClick={() => { localStorage.removeItem('elara_user'); setSavedInfoLoaded(false); showSuccess('Info cleared', 'Your saved info has been removed.') }}
                  className="mr-2 text-sm text-blue-600 hover:underline"
                >
                  Clear Saved Info
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-playfair text-black mb-4">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[var(--gold)]`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[var(--gold)]`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[var(--gold)]`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[var(--gold)]`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[var(--gold)]`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      value={form.zipCode}
                      onChange={e => setForm({ ...form, zipCode: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[var(--gold)]`}
                    />
                    {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-playfair text-black mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={form.expiry}
                        onChange={e => setForm({ ...form, expiry: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={form.cvv}
                        onChange={e => setForm({ ...form, cvv: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-montserrat text-sm uppercase tracking-widest rounded-none hover:bg-[var(--gold)] hover:text-black transition-colors"
              >
                Place Order {mounted &&`• ${total}` }
              </button>
            </form>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-playfair text-black mb-4">Order Summary</h2>
            <div className="space-y-4 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-sm text-black">{item.title}</h3>
                    <p className="text-[var(--gold)] font-montserrat font-semibold text-sm">
                      ${(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-playfair text-black">
                <span>Total</span>
                {mounted &&<span>{total}</span>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
