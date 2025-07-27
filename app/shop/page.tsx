"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Search, Filter, Grid, List, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const allProducts = [
    {
      id: 1,
      name: "جهاز بصمة ZKTeco F18 Pro",
      price: 1250,
      originalPrice: 1450,
      image: "/images/zkteco-f18.png",
      category: "أجهزة البصمة",
      brand: "ZKTeco",
      rating: 4.8,
      reviews: 124,
      features: ["تعرف بيومتري دقيق", "ذاكرة 3000 بصمة", "شاشة ملونة"],
      inStock: true,
      badge: "الأكثر مبيعاً",
    },
    {
      id: 2,
      name: "بوابة إلكترونية HID ProxPoint Plus",
      price: 3500,
      originalPrice: 3800,
      image: "/images/hid-proxpoint.png",
      category: "البوابات الإلكترونية",
      brand: "HID",
      rating: 4.9,
      reviews: 89,
      features: ["تحكم متقدم بالوصول", "مقاوم للعوامل الجوية", "تشفير عالي"],
      inStock: true,
      badge: "جديد",
    },
    {
      id: 3,
      name: "كاميرا مراقبة 4K Hikvision DS-2CD2143G0-I",
      price: 850,
      originalPrice: 950,
      image: "/images/hikvision-4k.png",
      category: "كاميرات المراقبة",
      brand: "Hikvision",
      rating: 4.7,
      reviews: 203,
      features: ["دقة 4K", "رؤية ليلية", "مقاومة للماء IP67"],
      inStock: true,
      badge: null,
    },
    {
      id: 4,
      name: "نظام منزل ذكي SmartLife Pro Complete",
      price: 5200,
      originalPrice: 5800,
      image: "/images/smartlife-pro.png",
      category: "المنازل الذكية",
      brand: "SmartLife",
      rating: 4.9,
      reviews: 67,
      features: ["تحكم كامل بالإضاءة", "إدارة التكييف", "نظام أمان متكامل"],
      inStock: true,
      badge: "مميز",
    },
    {
      id: 5,
      name: "جهاز بصمة ZKTeco K40 Pro Touch",
      price: 890,
      originalPrice: 1050,
      image: "/images/zkteco-k40.png",
      category: "أجهزة البصمة",
      brand: "ZKTeco",
      rating: 4.6,
      reviews: 156,
      features: ["شاشة لمس 2.8 بوصة", "ذاكرة 1000 بصمة", "بطارية احتياطية"],
      inStock: true,
      badge: null,
    },
    {
      id: 6,
      name: "كاميرا PTZ دوارة Dahua SD59225U-HNI",
      price: 1450,
      originalPrice: 1650,
      image: "/images/dahua-ptz.png",
      category: "كاميرات المراقبة",
      brand: "Dahua",
      rating: 4.8,
      reviews: 91,
      features: ["دوران 360 درجة", "زوم بصري 25x", "تتبع ذكي"],
      inStock: false,
      badge: "متقدم",
    },
  ]

  const categories = ["أجهزة البصمة", "البوابات الإلكترونية", "كاميرات المراقبة", "المنازل الذكية"]
  const brands = ["ZKTeco", "HID", "Hikvision", "Dahua", "SmartLife"]

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
      {/* Header - Same as homepage */}
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

            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link href="/" className="text-gray-700 hover:text-red-600">
                الرئيسية
              </Link>
              <Link href="/shop" className="text-red-600 font-medium">
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
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
              <span className="text-sm font-medium">0,00 ر.س</span>
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
          <span className="text-gray-900">المتجر</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card className="p-6">
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
                    <div key={category} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
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
                <Card
                  key={product.id}
                  className={`overflow-hidden hover:shadow-lg transition-all duration-300 group ${viewMode === "list" ? "flex" : ""}`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "h-48"} overflow-hidden`}>
                    <Image
                      src={product.image || "/placeholder.svg?height=200&width=300&query=security device"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs">{product.badge}</Badge>
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
                              <span className="w-1 h-1 bg-red-500 rounded-full ml-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className={`flex items-center ${viewMode === "list" ? "justify-between" : "justify-between"}`}>
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
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "أضف للسلة" : "نفد المخزون"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
