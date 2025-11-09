'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface CartItem {
  id: number
  itemId: number
  quantity: number
  item: {
    id: number
    name: string
    price: number
    description?: string
  }
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (itemId: number, quantity?: number) => Promise<void>
  removeFromCart: (itemId: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const refreshCart = async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const items = await response.json()
        setCartItems(items)
      }
    } catch (error) {
      console.error('Failed to refresh cart:', error)
    }
  }

  const addToCart = async (itemId: number, quantity = 1) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity }),
      })
      if (response.ok) {
        await refreshCart()
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      })
      if (response.ok) {
        await refreshCart()
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error)
    }
  }

  const clearCart = async () => {
    setCartItems([])
  }

  useEffect(() => {
    const loadCart = async () => {
      await refreshCart()
    }
    loadCart()
  }, [])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}