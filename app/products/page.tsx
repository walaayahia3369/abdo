"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Search, Filter, Grid, List, Star, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"
import { SearchDialog } from "@/components/search-dialog"
import { useCart } from "@/hooks/use-cart"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const allProducts = db.getProducts()
  const categories = db.getCategories()
  const brands = [...new Set(allProducts.map((p) => p.brand))]

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name, "ar")
      default:
        return 0
    }
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
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
              <Link href="/products" className="text-brand-primary font-medium">
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
          <span className="text-gray-900">كل المنتجات</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button onClick={() => setSidebarOpen(!sidebarOpen)} variant="outline" className="w-full mb-4">
              <Filter className="ml-2 h-4 w-4" />
              تصفية المنتجات
            </Button>
          </div>

          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="ml-2 h-5 w-5" />
                تصفية المنتجات
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">البحث</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">نطاق السعر</label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={10000} step={50} className="mb-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0]} ر.س</span>
                  <span>{priceRange[1]} ر.س</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">الفئات</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() => toggleCategory(category.name)}
                      />
                      <label htmlFor={category.name} className="text-sm cursor-pointer">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">العلامات التجارية</label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label htmlFor={brand} className="text-sm cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-gray-600">
                  عرض {sortedProducts.length} من {allProducts.length} منتج
                </span>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">المميزة</SelectItem>
                    <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                    <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                    <SelectItem value="rating">التقييم</SelectItem>
                    <SelectItem value="name">الاسم</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-l-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card
                    className={`overflow-hidden hover:shadow-lg transition-all duration-300 group ${viewMode === "list" ? "flex" : ""} h-full`}
                  >
                    <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "h-48"} overflow-hidden`}>
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
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">نفد المخزون</span>
                        </div>
                      )}
                    </div>

                    <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>

                      {viewMode === "list" && (
                        <div className="mb-3">
                          <ul className="text-sm text-gray-600 space-y-1">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="w-1 h-1 bg-brand-primary rounded-full ml-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div
                        className={`flex items-center ${viewMode === "list" ? "justify-between" : "justify-between"}`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-lg font-bold text-brand-primary">
                              {product.price.toLocaleString()} ر.س
                            </span>
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
                          disabled={!product.inStock}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleAddToCart(product)
                          }}
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
                </Link>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">لم يتم العثور على منتجات</h3>
                <p className="text-gray-600">جرب تعديل معايير البحث أو التصفية</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
