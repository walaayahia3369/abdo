"use client"

import { useState, useEffect } from "react"
import { cartManager } from "@/lib/cart"
import type { CartItem } from "@/lib/cart"

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // أول تحميل: ناخد البيانات من cartManager
    const cart = cartManager.getCart()
    setItems(cart.items)
    setTotal(cart.total)
    setItemCount(cart.itemCount)

    // نتابع أي تغييرات تحصل على السلة
    const unsubscribe = cartManager.subscribe((cart) => {
      setItems(cart.items)
      setTotal(cart.total)
      setItemCount(cart.itemCount)
    })

    // عند إلغاء المكون نفصل الاشتراك
    return () => unsubscribe()
  }, [])

  return {
    items,
    total,
    itemCount,
    addItem: cartManager.addItem.bind(cartManager),
    removeItem: cartManager.removeItem.bind(cartManager),
    updateQuantity: cartManager.updateQuantity.bind(cartManager),
    clearCart: cartManager.clearCart.bind(cartManager),
  }
}
