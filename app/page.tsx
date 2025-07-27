"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Phone, Mail, MapPin, Shield, Zap, Wifi, Battery, Plus } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"
import { SearchDialog } from "@/components/search-dialog"
import { useCart } from "@/hooks/use-cart"

export default function HomePage() {
  const { cart, addToCart } = useCart()

  const featuredProducts = db.getFeaturedProducts()
  const categories = db.getCategories()
  const siteSettings = db.getSiteSettings()

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
    })
  }

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const features = [
    {
      icon: Shield,
      title: "الأمان المتطور",
      description: "تقنيات حماية متقدمة مع التعرف البيومتري الدقيق لضمان أقصى درجات الأمان",
      highlight: "تقنية بيومترية",
    },
    {
      icon: Zap,
      title: "الكفاءة والسرعة",
      description: "أداء سريع وموثوق مع سرعة فائقة في تسجيل الدخول والخروج لجميع الأنظمة",
      highlight: "استجابة فورية",
    },
    {
      icon: Wifi,
      title: "التكامل السلس",
      description: "سهولة التكامل بين الأجهزة المختلفة والأنظمة الموجودة والتقنيات الحديثة",
      highlight: "توافق شامل",
    },
    {
      icon: Battery,
      title: "التوفير في الطاقة",
      description: "حلول موفرة للطاقة صديقة للبيئة مع فوائد اقتصادية طويلة المدى",
      highlight: "كفاءة الطاقة",
    },
  ]

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
              <Link href="/" className="text-gray-900 hover:text-red-600 font-medium">
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
              <Link href="/admin" className="text-red-600 hover:text-red-700 font-medium">
                لوحة التحكم
              </Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <SearchDialog />
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                </Button>
              </Link>
              <span className="text-sm font-medium">{cart.total.toLocaleString()} ر.س</span>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0">
          <Image
            src={siteSettings.heroBackgroundImage || "/placeholder.svg"}
            alt="Security Solutions"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              {siteSettings.heroTitle.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={index === siteSettings.heroTitle.split(" ").length - 1 ? "text-red-500" : ""}
                >
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">{siteSettings.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  تسوق الآن
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent w-full sm:w-auto"
                >
                  اكتشف المنتجات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">الأقسام الرئيسية</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من حلول الأمان والتقنيات الذكية المصممة لتلبية احتياجاتك
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                        {category.productCount}+ منتج
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg mb-2">{category.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full bg-red-600 hover:bg-red-700 group-hover:bg-red-700 transition-colors">
                      <span>تسوق الآن</span>
                      <span className="mr-2">←</span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{siteSettings.featuredSectionTitle}</h2>
            <p className="text-gray-600">{siteSettings.featuredSectionSubtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {product.badge && (
                      <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs">{product.badge}</Badge>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                        وفر {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed(0)}%
                      </div>
                    )}
                  </div>
                </Link>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.brand}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mb-3">
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full ml-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-lg font-bold text-red-600">{product.price.toLocaleString()} ر.س</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice.toLocaleString()} ر.س
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-xs px-3"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? (
                        <>
                          <Plus className="h-3 w-3 ml-1" />
                          أضف للسلة
                        </>
                      ) : (
                        "نفد المخزون"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
              >
                عرض جميع المنتجات
                <span className="mr-2">←</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">لماذا تختار EazySoft؟</h2>
            <p className="text-gray-600">نقدم حلولاً متكاملة تجمع بين الجودة والابتكار والموثوقية</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-red-100 to-red-50 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <feature.icon className="h-8 w-8 md:h-10 md:w-10 text-red-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                    {feature.highlight}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">هل تحتاج استشارة مجانية؟</h2>
          <p className="text-lg md:text-xl mb-8 text-red-100">
            فريقنا من الخبراء جاهز لمساعدتك في اختيار الحل الأمثل لاحتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              <Phone className="ml-2 h-5 w-5" />
              اتصل بنا الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
            >
              <Mail className="ml-2 h-5 w-5" />
              راسلنا عبر البريد
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Image src="/logo.png" alt="EazySoft Logo" width={40} height={40} className="h-10 w-auto" />
                <div>
                  <h3 className="text-xl font-bold">EazySoft</h3>
                  <p className="text-sm text-gray-400">حلول الأمان المتقدمة</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                نحن متخصصون في تقديم أحدث حلول الأمان والمنازل الذكية بأعلى معايير الجودة والموثوقية.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white">
                    المنتجات
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white">
                    الخدمات
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
              <h4 className="text-lg font-semibold mb-4">الأقسام الرئيسية</h4>
              <ul className="space-y-2 text-sm">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.slug}`} className="text-gray-400 hover:text-white">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">معلومات التواصل</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="h-4 w-4 text-red-500" />
                  <span className="text-gray-400">+966 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="h-4 w-4 text-red-500" />
                  <span className="text-gray-400">info@eazysoft.com</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 EazySoft. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
