"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { SearchDialog } from "@/components/search-dialog"
import { useCart } from "@/hooks/use-cart"
import { db } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const categories = db.getCategories()

  const shippingCost = cart.total > 500 ? 0 : 50
  const tax = cart.total * 0.15 // 15% VAT
  const finalTotal = cart.total + shippingCost + tax

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 space-x-reverse">
              <Image src="/logo.png" alt="EazySoft Logo" width={50} height={50} className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">EazySoft</h1>
                <p className="text-sm text-gray-600">حلول الأمان والمنازل الذكية</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
              <Link href="/" className="text-gray-700 hover:text-red-600">
                الرئيسية
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-red-600 whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/products" className="text-gray-700 hover:text-red-600">
                كل المنتجات
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600">
                من نحن
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600">
                تواصل معنا
              </Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <SearchDialog />
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              </Button>
              <span className="text-sm font-medium">{cart.total.toLocaleString()} ر.س</span>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-red-600">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-gray-900">سلة التسوق</span>
        </div>

        {cart.items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">سلة التسوق فارغة</h2>
            <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
            <Link href="/products">
              <Button className="bg-red-600 hover:bg-red-700">
                تسوق الآن
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="ml-2 h-5 w-5" />
                    سلة التسوق ({cart.itemCount} منتج)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-red-600 line-clamp-2">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-600">
                          {item.category} • {item.brand}
                        </p>
                        <p className="font-bold text-red-600 mt-1">{item.price.toLocaleString()} ر.س</p>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()} ر.س</p>
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
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>{cart.total.toLocaleString()} ر.س</span>
                  </div>

                  <div className="flex justify-between">
                    <span>الشحن:</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "مجاني" : `${shippingCost} ر.س`}
                    </span>
                  </div>

                  {shippingCost > 0 && <p className="text-sm text-gray-600">شحن مجاني للطلبات أكثر من 500 ر.س</p>}

                  <div className="flex justify-between">
                    <span>ضريبة القيمة المضافة (15%):</span>
                    <span>{tax.toLocaleString()} ر.س</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>المجموع الكلي:</span>
                      <span className="text-red-600">{finalTotal.toLocaleString()} ر.س</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">
                      متابعة إلى الدفع
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      متابعة التسوق
                    </Button>
                  </Link>

                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        ✓ دفع آمن
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        ✓ ضمان الجودة
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
