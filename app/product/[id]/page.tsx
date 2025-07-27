"use client"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Check, Shield, Truck, RefreshCw } from "lucide-react"
import { SearchDialog } from "@/components/search-dialog"
import { useCart } from "@/hooks/use-cart"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { cart, addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
    })
  }

  const product = db.getProductById(Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  const categories = db.getCategories()
  const relatedProducts = db
    .getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

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
          <Link href="/products" className="hover:text-brand-primary">
            المنتجات
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden bg-white shadow-sm">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              {product.badge && (
                <Badge className="absolute top-4 right-4 bg-brand-primary text-white">{product.badge}</Badge>
              )}
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-2 rounded font-bold">
                  وفر {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed(0)}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge variant="outline" className="text-brand-primary border-brand-secondary mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} تقييم)</span>
                <span className="text-sm text-gray-600">• {product.brand}</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 space-x-reverse mb-2">
                <span className="text-3xl font-bold text-brand-primary">{product.price.toLocaleString()} ر.س</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.originalPrice.toLocaleString()} ر.س
                  </span>
                )}
              </div>
              {product.inStock ? (
                <p className="text-green-600 font-medium">متوفر في المخزون</p>
              ) : (
                <p className="text-red-600 font-medium">نفد من المخزون</p>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">المميزات الرئيسية</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 ml-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <Button
                size="lg"
                className="w-full bg-brand-primary hover:bg-brand-secondary mb-4"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                {product.inStock ? "أضف إلى السلة" : "نفد من المخزون"}
              </Button>

              {/* Service Features */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="h-6 w-6 text-brand-primary mb-1" />
                  <span className="text-xs text-gray-600">ضمان سنتان</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="h-6 w-6 text-brand-primary mb-1" />
                  <span className="text-xs text-gray-600">شحن مجاني</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCw className="h-6 w-6 text-brand-primary mb-1" />
                  <span className="text-xs text-gray-600">إرجاع مجاني</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>المواصفات التقنية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">منتجات ذات صلة</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedProduct.badge && (
                        <Badge className="absolute top-2 right-2 bg-brand-primary text-white text-xs">
                          {relatedProduct.badge}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-brand-primary">
                          {relatedProduct.price.toLocaleString()} ر.س
                        </span>
                        <Button size="sm" className="bg-brand-primary hover:bg-brand-secondary text-xs px-3">
                          عرض
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
