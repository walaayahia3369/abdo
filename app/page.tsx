"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, ArrowRight, Shield, Truck, RefreshCw, Phone } from "lucide-react"
import { SearchDialog } from "@/components/search-dialog"
import { MobileNav } from "@/components/mobile-nav"
import { useCart } from "@/hooks/use-cart"
import { db, type Product, type Category, type SiteSettings, type ContactInfo } from "@/lib/db"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const { cart, addToCart } = useCart()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsData, categoriesData, settingsData, contactData] = await Promise.all([
        db.getFeaturedProducts(),
        db.getCategories(),
        db.getSiteSettings(),
        db.getContactInfo(),
      ])

      setProducts(productsData)
      setCategories(categoriesData)
      setSiteSettings(settingsData)
      setContactInfo(contactData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 space-x-reverse">
              <Image src="/easyoft-logo.png" alt="EASYoft Logo" width={120} height={60} className="h-12 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
              <Link href="/" className="text-brand-primary font-medium">
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
              <MobileNav categories={categories} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-brand-primary to-brand-secondary text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {siteSettings?.hero_title || "حلول الأمان المتقدمة"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
              {siteSettings?.hero_subtitle ||
                "نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100 text-lg px-8">
                  تصفح المنتجات
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-primary text-lg px-8 bg-transparent"
                >
                  تواصل معنا
                  <Phone className="mr-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">فئات المنتجات</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من حلول الأمان والتقنيات الذكية
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 text-white">
                      <Badge className="bg-brand-primary text-white mb-2">{category.product_count} منتج</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {siteSettings?.featured_section_title || "المنتجات المميزة"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {siteSettings?.featured_section_subtitle || "أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 right-2 bg-brand-primary text-white text-xs">
                      {product.badge}
                    </Badge>
                  )}
                  {product.original_price && (
                    <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                      وفر {(((product.original_price - product.price) / product.original_price) * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.brand}</p>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                  <div className="mb-3">
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-brand-primary rounded-full ml-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-lg font-bold text-brand-primary">
                          {product.price.toLocaleString()} ر.س
                        </span>
                        {product.original_price && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.original_price.toLocaleString()} ر.س
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-brand-primary hover:bg-brand-secondary text-xs px-3"
                      onClick={() => handleAddToCart(product)}
                    >
                      أضف للسلة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/products">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-secondary">
                عرض جميع المنتجات
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ضمان سنتان</h3>
              <p className="text-gray-600">ضمان شامل على جميع المنتجات لمدة سنتين كاملتين</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">شحن مجاني</h3>
              <p className="text-gray-600">توصيل مجاني لجميع المناطق داخل المملكة</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">إرجاع مجاني</h3>
              <p className="text-gray-600">إمكانية الإرجاع والاستبدال خلال 30 يوم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image src="/easyoft-logo.png" alt="EASYoft" width={120} height={40} className="h-8 w-auto mb-4" />
              <p className="text-gray-400 mb-4">
                نقدم أحدث حلول الأمان والتقنيات الذكية لحماية ممتلكاتك وتوفير الراحة والأمان
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white">
                    المنتجات
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">الفئات</h3>
              <ul className="space-y-2">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.slug}`} className="text-gray-400 hover:text-white">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{contactInfo?.phone}</li>
                <li>{contactInfo?.email}</li>
                <li>{contactInfo?.address}</li>
                <li>{contactInfo?.working_hours}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EASYoft. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
