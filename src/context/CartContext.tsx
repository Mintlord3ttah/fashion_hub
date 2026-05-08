"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface CartItem {
  id: number
  image: string
  title: string
  price: string
  quantity: number
}

interface CartContextProps {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  total: string
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elara_cart')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems)
    if (typeof window !== 'undefined') {
      localStorage.setItem('elara_cart', JSON.stringify(newItems))
    }
  }

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      let newItems: CartItem[]
      if (existing) {
        newItems = prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        newItems = [...prev, { ...item, quantity: 1 }]
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('elara_cart', JSON.stringify(newItems))
      }
      return newItems
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    saveCart(items.filter(i => i.id !== id))
  }, [items])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    saveCart(items.map(i => i.id === id ? { ...i, quantity } : i))
  }, [items, removeFromCart])

  const clearCart = useCallback(() => {
    saveCart([])
  }, [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const total = items.reduce((sum, i) => {
    const priceNum = parseInt(i.price.replace(/[^0-9]/g, '')) * i.quantity
    return sum + priceNum
  }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
