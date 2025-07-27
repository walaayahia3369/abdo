"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  brand: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  itemCount: number
  total: number
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addToCart: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          })
        }

        // Update computed values
        const newItems = get().items
        set({
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        })
      },

      removeFromCart: (id) => {
        const items = get().items.filter((item) => item.id !== id)
        set({
          items,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }

        const items = get().items.map((item) => (item.id === id ? { ...item, quantity } : item))

        set({
          items,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        })
      },

      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
          total: 0,
        })
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

// Legacy export for backward compatibility
export const cart = {
  items: [],
  itemCount: 0,
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
}
