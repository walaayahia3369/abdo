"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, ArrowRight, Shield, Truck, RefreshCw, Plus } from "lucide-react"
import { SearchDialog } from "@/components/search-dialog"
import { MobileNav } from "@/components/mobile-nav"
import { HeroSlider, type HeroSlide } from "@/components/hero-slider"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"

import { db, type Product, type Category, type SiteSettings, type ContactInfo } from "@/lib/db"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const { cart, addToCart } = useCart()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsData, categoriesData, heroSlidesData, settingsData, contactData] = await Promise.all([
        db.getFeaturedProducts(),
        db.getCategories(),
        db.getHeroSlides(),
        db.getSiteSettings(),
        db.getContactInfo(),
      ])

      setProducts(productsData)
      setCategories(categoriesData)
      setHeroSlides(heroSlidesData)
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
      image: product.local_image_path || product.image,
      category: product.category,
      brand: product.brand,
    })

    toast({
      title: "تم إضافة المنتج للسلة! 🛒",
      description: `تم إضافة ${product.name} إلى سلة التسوق`,
      duration: 3000,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-easyoft-sky to-white flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-easyoft-sky border-t-easyoft-blue mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-easyoft-lightBlue animate-ping mx-auto"></div>
          </div>
          <p className="text-easyoft-darkBlue font-medium text-lg animate-pulse-soft">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-easyoft-sky" dir="rtl">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-easyoft-sky sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 space-x-reverse group">
              <div className="relative">
                <Image
                  src="/easyoft-logo.png"
                  alt="EASYoft Logo"
                  width={120}
                  height={60}
                  className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 animate-shimmer"></div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
              <Link
                href="/"
                className="text-brand-primary font-semibold hover:text-easyoft-lightBlue transition-all duration-300 relative group"
              >
                الرئيسية
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue"></span>
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative group"
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <Link
                href="/products"
                className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
              >
                كل المنتجات
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/about"
                className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
              >
                من نحن
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/contact"
                className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
              >
                تواصل معنا
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <SearchDialog />
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative group hover:bg-easyoft-sky transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5 text-easyoft-blue group-hover:scale-110 transition-transform duration-200" />
                  {cart.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle shadow-lg">
                      {cart.itemCount}
                    </span>
                  )}
                </Button>
              </Link>
              <span className="text-sm font-semibold text-easyoft-darkBlue bg-easyoft-sky px-3 py-1 rounded-full">
                {cart.total.toLocaleString()} ر.س
              </span>
              <MobileNav categories={categories} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} autoPlay={true} autoPlayInterval={6000} />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-easyoft-navy mb-4">فئات المنتجات</h2>
            <p className="text-xl text-easyoft-darkBlue max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من حلول الأمان والتقنيات الذكية
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Card
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 group h-full animate-scale-in hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.local_image_path || category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-easyoft-lightBlue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 right-4 text-white">
                      <Badge className="bg-gradient-to-r from-brand-primary to-easyoft-blue text-white mb-2 shadow-lg">
                        {category.product_count} منتج
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-gradient-to-br from-white to-easyoft-sky group-hover:from-easyoft-sky group-hover:to-white transition-all duration-300">
                    <h3 className="text-xl font-bold text-easyoft-navy mb-2 group-hover:text-brand-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-easyoft-darkBlue text-sm leading-relaxed">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-br from-easyoft-sky to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-easyoft-navy mb-4">
              {siteSettings?.featured_section_title || "المنتجات المميزة"}
            </h2>
            <p className="text-xl text-easyoft-darkBlue max-w-2xl mx-auto">
              {siteSettings?.featured_section_subtitle || "أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 group h-full bg-white hover:bg-gradient-to-br hover:from-white hover:to-easyoft-sky animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.local_image_path || product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {product.badge && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-brand-primary to-easyoft-blue text-white text-xs shadow-lg animate-bounce-gentle">
                      {product.badge}
                    </Badge>
                  )}
                  {product.original_price && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-soft">
                      وفر {(((product.original_price - product.price) / product.original_price) * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-easyoft-darkBlue bg-easyoft-sky px-2 py-1 rounded-full font-medium">
                      {product.brand}
                    </p>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-easyoft-darkBlue font-medium">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-easyoft-navy mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="mb-3">
                    <ul className="text-xs text-easyoft-darkBlue space-y-1">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue rounded-full ml-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-lg font-bold bg-gradient-to-r from-brand-primary to-easyoft-blue bg-clip-text text-transparent">
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
                      className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white text-xs px-4 py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      <Plus className="h-3 w-3 ml-1 group-hover:rotate-90 transition-transform duration-300" />
                      أضف للسلة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center animate-fade-in">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  عرض جميع المنتجات
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "ضمان سنتان",
                desc: "ضمان شامل على جميع المنتجات لمدة سنتين كاملتين",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Truck,
                title: "شحن مجاني",
                desc: "توصيل مجاني لجميع المناطق داخل المملكة",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: RefreshCw,
                title: "إرجاع مجاني",
                desc: "إمكانية الإرجاع والاستبدال خلال 30 يوم",
                color: "from-purple-500 to-purple-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-easyoft-navy mb-2 group-hover:text-brand-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-easyoft-darkBlue leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-easyoft-navy to-easyoft-darkBlue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in">
              <Image
                src="/easyoft-logo.png"
                alt="EASYoft"
                width={120}
                height={40}
                className="h-8 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-300 mb-4 leading-relaxed">
                نقدم أحدث حلول الأمان والتقنيات الذكية لحماية ممتلكاتك وتوفير الراحة والأمان
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-lg font-semibold mb-4 text-easyoft-lightBlue">روابط سريعة</h3>
              <ul className="space-y-2">
                {[
                  { name: "الرئيسية", href: "/" },
                  { name: "المنتجات", href: "/products" },
                  { name: "من نحن", href: "/about" },
                  { name: "تواصل معنا", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-easyoft-lightBlue transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-lg font-semibold mb-4 text-easyoft-lightBlue">الفئات</h3>
              <ul className="space-y-2">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-gray-300 hover:text-easyoft-lightBlue transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold mb-4 text-easyoft-lightBlue">تواصل معنا</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-easyoft-lightBlue transition-colors duration-300">{contactInfo?.phone}</li>
                <li className="hover:text-easyoft-lightBlue transition-colors duration-300">{contactInfo?.email}</li>
                <li className="hover:text-easyoft-lightBlue transition-colors duration-300">{contactInfo?.address}</li>
                <li className="hover:text-easyoft-lightBlue transition-colors duration-300">
                  {contactInfo?.working_hours}
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-easyoft-blue/30 mt-8 pt-8 text-center text-gray-300 animate-fade-in">
            <p>&copy; 2024 EASYoft. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
