"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { db, type Product, type Category } from "@/lib/db"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"


import { SearchDialog } from "@/components/search-dialog"
import { MobileNav } from "@/components/mobile-nav"
import { HeroSlider, type HeroSlide } from "@/components/hero-slider"


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)

  // const { addItem } = useCart()
  const { cart, addToCart } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [productsData, categoriesData] = await Promise.all([db.getProducts(), db.getCategories()])

        setProducts(productsData)
        setCategories(categoriesData)

        // Set initial price range based on products
        if (productsData.length > 0) {
          const prices = productsData.map((p) => p.price)
          const minPrice = Math.min(...prices)
          const maxPrice = Math.max(...prices)
          setPriceRange([minPrice, maxPrice])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("حدث خطأ في تحميل البيانات")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.in_stock && product.stock_quantity > 0)
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name, "ar"))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, selectedBrands, priceRange, sortBy, inStockOnly])

  // const handleAddToCart = (product: Product) => {
  //   addItem({
  //     id: product.id.toString(),
  //     name: product.name,
  //     price: product.price,
  //     image: product.image,
  //     quantity: 1,
  //   })
  //   toast.success(`تم إضافة ${product.name} إلى السلة`)
  // }
  
      const handleAddToCart = (product: Product) => {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.local_image_path || product.image,
          category: product.category,
          brand: product.brand,
        })
      toast.success(`تم إضافة ${product.name} إلى السلة`)
    }

          const handleAddToCartWith = (product: Product) => {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.installation_price,
          image: product.local_image_path || product.image,
          category: product.category,
          brand: product.brand,
        })
      toast.success(`تم إضافة ${product.name} إلى السلة`)
    }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedBrands([])
    setInStockOnly(false)
    if (products.length > 0) {
      const prices = products.map((p) => p.price)
      setPriceRange([Math.min(...prices), Math.max(...prices)])
    }
  }

  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand))).sort()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
                    {/* Header */}
            {/* <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-easyoft-sky sticky top-0 z-50">
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
            </header> */}
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
          
          {/* عرض أول 3 فئات فقط */}
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative group"
            >
              {category.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          
          {/* عرض قائمة "المزيد" عند وجود أكثر من 3 فئات */}
          {categories.length > 3 && (
            <div className="relative group">
              <button className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative">
                المزيد
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
              </button>
              
              {/* القائمة المنسدلة */}
              <div className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl bg-white border border-easyoft-sky overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
                {categories.slice(3).map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block px-4 py-3 text-sm text-easyoft-darkBlue hover:bg-easyoft-sky/50 hover:text-brand-primary transition-colors duration-200 border-b border-easyoft-sky/20 last:border-0"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* الروابط الثابتة */}
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
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">جميع المنتجات</h1>
          <p className="text-gray-600">اكتشف مجموعتنا الكاملة من المنتجات التقنية المتطورة</p>
        </div> */}

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                الفلاتر
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                  <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                  <SelectItem value="name">الاسم</SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">الفئة</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">العلامة التجارية</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {uniqueBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label htmlFor={brand} className="text-sm">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    نطاق السعر: {priceRange[0]} - {priceRange[1]} ريال
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={Math.max(...products.map((p) => p.price)) || 10000}
                    min={Math.min(...products.map((p) => p.price)) || 0}
                    step={50}
                    className="mt-2"
                  />
                </div>

                {/* Stock Filter */}
                <div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {/* <Checkbox id="inStock" checked={inStockOnly} onCheckedChange={setInStockOnly} /> */}
                    <Checkbox
                      id="inStock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(checked === true)}
                    />
                    <label htmlFor="inStock" className="text-sm">
                      متوفر فقط
                    </label>
                  </div>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4 w-full bg-transparent">
                    مسح الفلاتر
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            عرض {filteredProducts.length} من أصل {products.length} منتج
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-600">جرب تغيير معايير البحث أو الفلاتر</p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className={`p-0 ${viewMode === "list" ? "flex" : ""}`}>
                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48" : "aspect-square"}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && <Badge className="absolute top-2 right-2 bg-red-500">{product.badge}</Badge>}
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-medium">غير متوفر</span>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0" asChild>
                          <Link href={`/product/${product.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        <Link href={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
                    </div>

                    {viewMode === "list" && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()} ريال</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.original_price.toLocaleString()} ريال
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.in_stock}
                      className="w-full mb-2"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      {product.in_stock ? "أضف للسلة" : "غير متوفر"}
                    </Button>
                    
                    <Button
                      onClick={() => handleAddToCartWith(product)}
                      disabled={!product.in_stock}
                      className="w-full"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      {product.in_stock ? " بالتركيب أضف للسلة" : "غير متوفر"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
