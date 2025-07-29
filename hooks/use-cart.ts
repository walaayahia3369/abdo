"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  brand: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

interface CartContextType {
  cart: Cart
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("easyoft-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("easyoft-cart", JSON.stringify(cart))
  }, [cart])

  const updateCartTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    return { total, itemCount }
  }

  const addToCart = (product: Omit<CartItem, "quantity">) => {
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

      const { total, itemCount } = updateCartTotals(newItems)
      return { items: newItems, total, itemCount }
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== id)
      const { total, itemCount } = updateCartTotals(newItems)
      return { items: newItems, total, itemCount }
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) => (item.id === id ? { ...item, quantity } : item))
      const { total, itemCount } = updateCartTotals(newItems)
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

  const getTotalItems = () => {
    return cart.itemCount
  }

  const getTotal = () => {
    return cart.total
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
