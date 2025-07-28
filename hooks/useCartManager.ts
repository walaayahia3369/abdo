// hooks/useCartManager.ts
"use client"

import { useEffect, useState } from "react"
import { cartManager } from "@/lib/cart-manager"
import type { Cart } from "@/lib/cart-manager"

export function useCartManager() {
  const [cart, setCart] = useState<Cart>(cartManager.getCart())

  useEffect(() => {
    const unsubscribe = cartManager.subscribe((updatedCart) => {
      setCart(updatedCart)
    })
    return unsubscribe
  }, [])

  return {
    cart,
    addItem: cartManager.addItem.bind(cartManager),
    removeItem: cartManager.removeItem.bind(cartManager),
    updateQuantity: cartManager.updateQuantity.bind(cartManager),
    clearCart: cartManager.clearCart.bind(cartManager),
  }
}
