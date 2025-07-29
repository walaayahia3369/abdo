// نظام إدارة السلة
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

class CartManager {
  private static instance: CartManager
  private cart: Cart = {
    items: [],
    total: 0,
    itemCount: 0,
  }
  private listeners: ((cart: Cart) => void)[] = []

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager()
    }
    return CartManager.instance
  }

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage()
    }
  }

  private loadFromStorage() {
    const saved = localStorage.getItem("eazysoft-cart")
    if (saved) {
      try {
        this.cart = JSON.parse(saved)
      } catch (error) {
        console.error("Error loading cart from storage:", error)
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem("eazysoft-cart", JSON.stringify(this.cart))
    }
  }

  private updateTotals() {
    this.cart.total = this.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    this.cart.itemCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    this.saveToStorage()
    this.notifyListeners()
  }

  addItem(product: { id: number; name: string; price: number; image: string; category: string; brand: string }) {
    const existingItem = this.cart.items.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.items.push({
        ...product,
        quantity: 1,
      })
    }

    this.updateTotals()
  }

  removeItem(productId: number) {
    this.cart.items = this.cart.items.filter((item) => item.id !== productId)
    this.updateTotals()
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.items.find((item) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
        this.updateTotals()
      }
    }
  }

  clearCart() {
    this.cart = {
      items: [],
      total: 0,
      itemCount: 0,
    }
    this.updateTotals()
  }

  getCart(): Cart {
    return { ...this.cart }
  }

  getTotalItems(): number {
    return this.cart.itemCount
  }

  getTotal(): number {
    return this.cart.total
  }

  subscribe(listener: (cart: Cart) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.getCart()))
  }
}

export const cartManager = CartManager.getInstance()
