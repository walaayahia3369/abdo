"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  category: string
  brand: string
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

interface CartContextType {
  cart: Cart
  addToCart: (product: {
    id: number
    name: string
    price: number
    image: string
    category: string
    brand: string
  }) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("eazysoft-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("eazysoft-cart", JSON.stringify(cart))
  }, [cart])

  const updateTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    return { total, itemCount }
  }

  const addToCart = (product: {
    id: number
    name: string
    price: number
    image: string
    category: string
    brand: string
  }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.id === product.id)
      let newItems: CartItem[]

      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        newItems = [...prevCart.items, { ...product, quantity: 1 }]
      }

      const { total, itemCount } = updateTotals(newItems)
      return { items: newItems, total, itemCount }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== productId)
      const { total, itemCount } = updateTotals(newItems)
      return { items: newItems, total, itemCount }
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) => (item.id === productId ? { ...item, quantity } : item))
      const { total, itemCount } = updateTotals(newItems)
      return { items: newItems, total, itemCount }
    })
  }

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    })
  }

  const getTotalItems = () => cart.itemCount

  const getTotal = () => cart.total

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
