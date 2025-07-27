"use client"

import { useState, useEffect } from "react"
import { cartManager, type Cart } from "@/lib/cart"

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 })

  useEffect(() => {
    // Initialize cart
    setCart(cartManager.getCart())

    // Subscribe to cart changes
    const unsubscribe = cartManager.subscribe(setCart)

    return unsubscribe
  }, [])

  const addToCart = (product: {
    id: number
    name: string
    price: number
    image: string
    category: string
    brand: string
  }) => {
    cartManager.addItem(product)
  }

  const removeFromCart = (productId: number) => {
    cartManager.removeItem(productId)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    cartManager.updateQuantity(productId, quantity)
  }

  const clearCart = () => {
    cartManager.clearCart()
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}
