"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star, Check, Shield, Truck, RefreshCw, Heart, Share2, Plus, Minus } from "lucide-react"
import { SearchDialog } from "@/components/search-dialog"
import { MobileNav } from "@/components/mobile-nav"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"

import { db, type Product, type Category } from "@/lib/db"

export default function ProductPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)

  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const { cart, addToCart } = useCart()

  useEffect(() => {
    loadData()
  }, [productId])

  const loadData = async () => {
    try {
      const [productData, categoriesData] = await Promise.all([db.getProductById(productId), db.getCategories()])

      if (productData) {
        setProduct(productData)

        // Load related products from the same category
        const related = await db.getProductsByCategory(productData.category)
        setRelatedProducts(related.filter((p) => p.id !== productId).slice(0, 4))
      }

      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading product data:", error)
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل بيانات المنتج",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
      })
    }

    toast({
      title: "تم إضافة المنتج للسلة! 🛒",
      description: `تم إضافة ${quantity} من ${product.name} إلى سلة التسوق`,
      duration: 3000,
    })
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock_quantity) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-easyoft-sky to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-easyoft-navy mb-4">المنتج غير موجود</h1>
          <p className="text-easyoft-darkBlue mb-6">عذراً، لم نتمكن من العثور على المنتج المطلوب</p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white">
              العودة للمنتجات
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const productImages = [product.image, product.image, product.image] // Mock multiple images

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
                className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
              >
                الرئيسية
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
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
                className="text-brand-primary font-semibold hover:text-easyoft-lightBlue transition-all duration-300 relative group"
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

      {/* Breadcrumb */}
      <div className="bg-white border-b border-easyoft-sky">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-easyoft-darkBlue">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-primary transition-colors">
              المنتجات
            </Link>
            <span>/</span>
            <Link href={`/category/${product.category}`} className="hover:text-brand-primary transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-brand-primary font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-xl">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-brand-primary to-easyoft-blue text-white shadow-lg">
                  {product.badge}
                </Badge>
              )}
              {product.original_price && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  وفر {(((product.original_price - product.price) / product.original_price) * 100).toFixed(0)}%
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-4 space-x-reverse">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-brand-primary shadow-lg scale-105"
                      : "border-gray-200 hover:border-easyoft-lightBlue"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg?height=80&width=80"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-easyoft-sky text-easyoft-darkBlue">{product.brand}</Badge>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button variant="ghost" size="icon" className="hover:bg-easyoft-sky">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-easyoft-sky">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-easyoft-navy mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="flex items-center space-x-1 space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-easyoft-darkBlue mr-2">
                    {product.rating} ({product.reviews} تقييم)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-easyoft-blue bg-clip-text text-transparent">
                    {product.price.toLocaleString()} ر.س
                  </span>
                  {product.original_price && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.original_price.toLocaleString()} ر.س
                    </span>
                  )}
                </div>
              </div>

              <p className="text-easyoft-darkBlue leading-relaxed mb-6">{product.description}</p>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 space-x-reverse mb-6">
                <div className={`w-3 h-3 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className={`font-medium ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
                  {product.in_stock ? `متوفر (${product.stock_quantity} قطعة)` : "غير متوفر"}
                </span>
              </div>

              {/* Quantity Selector */}
              {product.in_stock && (
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <span className="text-easyoft-darkBlue font-medium">الكمية:</span>
                  <div className="flex items-center border border-easyoft-sky rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="hover:bg-easyoft-sky"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium text-easyoft-navy">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock_quantity}
                      className="hover:bg-easyoft-sky"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="flex space-x-4 space-x-reverse mb-8">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                  className="flex-1 bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <ShoppingCart className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  {product.in_stock ? "أضف للسلة" : "غير متوفر"}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Shield, text: "ضمان سنتان" },
                  { icon: Truck, text: "شحن مجاني" },
                  { icon: RefreshCw, text: "إرجاع مجاني" },
                ].map((feature, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <feature.icon className="h-6 w-6 text-brand-primary mx-auto mb-2" />
                    <span className="text-sm text-easyoft-darkBlue">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">المميزات</TabsTrigger>
                <TabsTrigger value="specifications">المواصفات</TabsTrigger>
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-easyoft-navy mb-4">مميزات المنتج</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3 space-x-reverse">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-easyoft-darkBlue">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-easyoft-navy mb-4">المواصفات التقنية</h3>
                  <div className="grid gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-easyoft-sky">
                        <span className="font-medium text-easyoft-navy">{key}</span>
                        <span className="text-easyoft-darkBlue">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-easyoft-navy mb-4">تقييمات العملاء</h3>
                  <div className="text-center py-8">
                    <p className="text-easyoft-darkBlue">لا توجد تقييمات بعد</p>
                    <p className="text-sm text-gray-500 mt-2">كن أول من يقيم هذا المنتج</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-easyoft-navy mb-8 text-center">منتجات ذات صلة</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group h-full bg-white hover:bg-gradient-to-br hover:from-white hover:to-easyoft-sky">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {relatedProduct.badge && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-brand-primary to-easyoft-blue text-white text-xs shadow-lg">
                          {relatedProduct.badge}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-easyoft-darkBlue bg-easyoft-sky px-2 py-1 rounded-full font-medium">
                          {relatedProduct.brand}
                        </p>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-easyoft-darkBlue font-medium">{relatedProduct.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-easyoft-navy mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors duration-300">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold bg-gradient-to-r from-brand-primary to-easyoft-blue bg-clip-text text-transparent">
                            {relatedProduct.price.toLocaleString()} ر.س
                          </span>
                          {relatedProduct.original_price && (
                            <span className="text-sm text-gray-400 line-through">
                              {relatedProduct.original_price.toLocaleString()} ر.س
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-easyoft-navy to-easyoft-darkBlue text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
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
            <div>
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
                      className="text-gray-300 hover:text-easyoft-lightBlue transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-easyoft-lightBlue">الفئات</h3>
              <ul className="space-y-2">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-gray-300 hover:text-easyoft-lightBlue transition-colors duration-300"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-easyoft-lightBlue">تواصل معنا</h3>
              <ul className="space-y-2 text-gray-300">
                <li>+966 50 123 4567</li>
                <li>info@easyoft.com</li>
                <li>الرياض، المملكة العربية السعودية</li>
                <li>الأحد - الخميس: 9:00 ص - 6:00 م</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-easyoft-blue/30 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 EASYoft. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
