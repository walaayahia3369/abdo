"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"
import { SearchDialog } from "@/components/search-dialog"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart()
  const categories = db.getCategories()

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const getItemQuantity = (productId: number) => {
    const item = cart.items.find((item) => item.id === productId)
    return item ? item.quantity : 0
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 space-x-reverse">
              <Image src="/easyoft-logo.png" alt="EASYoft Logo" width={120} height={60} className="h-12 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
              <Link href="/" className="text-gray-700 hover:text-brand-primary">
                الرئيسية
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-brand-primary whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/products" className="text-gray-700 hover:text-brand-primary">
                كل المنتجات
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-brand-primary">
                من نحن
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-brand-primary">
                تواصل معنا
              </Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <SearchDialog />
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                </Button>
              </Link>
              <span className="text-sm font-medium">{cart.total.toLocaleString()} ر.س</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-brand-primary">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-gray-900">سلة التسوق</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="ml-2 h-5 w-5" />
                    سلة التسوق ({cart.itemCount} عنصر)
                  </CardTitle>
                  {cart.items.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4 ml-2" />
                      إفراغ السلة
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {cart.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">سلة التسوق فارغة</h3>
                    <p className="text-gray-600 mb-4">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
                    <Link href="/products">
                      <Button className="bg-brand-primary hover:bg-brand-secondary">تسوق الآن</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 space-x-reverse p-4 border rounded-lg">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            {item.category} • {item.brand}
                          </p>
                          <div className="flex items-center space-x-2 space-x-reverse mt-2">
                            <span className="text-lg font-bold text-brand-primary">
                              {item.price.toLocaleString()} ر.س
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-gray-900">
                            {(item.price * item.quantity).toLocaleString()} ر.س
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 mt-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          {cart.items.length > 0 && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span>{cart.total.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الشحن</span>
                    <span className="text-green-600">مجاني</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الضريبة</span>
                    <span>{(cart.total * 0.15).toLocaleString()} ر.س</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>المجموع الكلي</span>
                      <span className="text-brand-primary">{(cart.total * 1.15).toLocaleString()} ر.س</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <Button className="w-full bg-brand-primary hover:bg-brand-secondary">
                      متابعة إلى الدفع
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="w-full bg-transparent">
                      متابعة التسوق
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
