"use client"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import { SearchDialog } from "@/components/search-dialog"
import { useCart } from "@/hooks/use-cart"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { cart, addToCart } = useCart()

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

  const category = db.getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const products = db.getProductsByCategory(category.name)
  const categories = db.getCategories()

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
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`hover:text-brand-primary whitespace-nowrap ${cat.slug === params.slug ? "text-brand-primary font-medium" : "text-gray-700"}`}
                >
                  {cat.name}
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
          <span className="text-gray-900">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{category.description}</p>
              <Badge variant="outline" className="text-brand-primary border-brand-secondary">
                {products.length} منتج متاح
              </Badge>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge className="absolute top-2 right-2 bg-brand-primary text-white text-xs">{product.badge}</Badge>
                )}
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                    وفر {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed(0)}%
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
                      <span className="text-lg font-bold text-brand-primary">{product.price.toLocaleString()} ر.س</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()} ر.س
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

        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد منتجات في هذه الفئة حالياً</h3>
            <p className="text-gray-600 mb-4">تحقق مرة أخرى قريباً أو تصفح فئات أخرى</p>
            <Link href="/products">
              <Button className="bg-brand-primary hover:bg-brand-secondary">تصفح كل المنتجات</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
