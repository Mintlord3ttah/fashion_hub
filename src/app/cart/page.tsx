"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { showSuccess } from "@/components/Admin/Notification"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, itemCount, total } = useCart()

  const handleCheckout = () => {
    showSuccess('Checkout', 'Checkout functionality coming soon!')
  }

  if (items.length === 0) {
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
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-playfair text-black mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items yet.</p>
          <Link
            href="/#collection"
            className="px-8 py-3 bg-black text-white font-montserrat text-sm uppercase tracking-widest rounded-none hover:bg-[var(--gold)] hover:text-black transition-colors"
          >
            Continue Shopping
          </Link>
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
              <Link href="/#collection" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-playfair text-black mb-8">Your Cart ({itemCount} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-playfair text-lg text-black">{item.title}</h3>
                  <p className="text-[var(--gold)] font-montserrat font-semibold">{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-playfair text-black mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.title} x{item.quantity}</span>
                  <span className="text-black font-semibold">
                    {parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity >= 0
                      ? `$${(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}`
                      : item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-playfair text-black">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-black text-white font-montserrat text-sm uppercase tracking-widest rounded-none hover:bg-[var(--gold)] hover:text-black transition-colors"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => { clearCart(); showSuccess('Cart Cleared', 'All items removed from cart') }}
              className="w-full mt-4 py-3 border border-gray-300 text-gray-600 font-montserrat text-sm uppercase tracking-widest rounded-none hover:bg-gray-100 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
