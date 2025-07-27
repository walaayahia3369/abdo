"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Package, ShoppingCart, TrendingUp, Plus, Edit, Trash2, LogOut, Settings, Eye, Star } from "lucide-react"
import { db, type Product, type Category, type SiteSettings } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({} as SiteSettings)

  // Product Dialog States
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    category: "",
    brand: "",
    rating: 5,
    reviews: 0,
    features: [""],
    inStock: true,
    badge: "",
    description: "",
    specifications: {} as Record<string, string>,
    isFeatured: false,
  })

  // Category Dialog States
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
    slug: "",
    productCount: 0,
  })

  // Site Settings States
  const [tempSiteSettings, setTempSiteSettings] = useState<SiteSettings>({} as SiteSettings)

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    if (isLoggedIn === "true") {
      setIsAuthenticated(true)
      setProducts(db.getProducts())
      setCategories(db.getCategories())
      const settings = db.getSiteSettings()
      setSiteSettings(settings)
      setTempSiteSettings(settings)
    } else {
      window.location.href = "/admin"
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    window.location.href = "/admin"
  }

  // Product Functions
  const handleAddProduct = () => {
    const product = db.addProduct({
      ...newProduct,
      features: newProduct.features.filter((f) => f.trim() !== ""),
    })
    setProducts(db.getProducts())
    setIsAddProductOpen(false)
    resetProductForm()
  }

  const handleUpdateProduct = () => {
    if (editingProduct) {
      db.updateProduct(editingProduct.id, {
        ...newProduct,
        features: newProduct.features.filter((f) => f.trim() !== ""),
      })
      setProducts(db.getProducts())
      setEditingProduct(null)
      resetProductForm()
    }
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      db.deleteProduct(id)
      setProducts(db.getProducts())
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      category: product.category,
      brand: product.brand,
      rating: product.rating,
      reviews: product.reviews,
      features: product.features,
      inStock: product.inStock,
      badge: product.badge || "",
      description: product.description,
      specifications: product.specifications,
      isFeatured: product.isFeatured,
    })
  }

  const resetProductForm = () => {
    setNewProduct({
      name: "",
      price: 0,
      originalPrice: 0,
      image: "",
      category: "",
      brand: "",
      rating: 5,
      reviews: 0,
      features: [""],
      inStock: true,
      badge: "",
      description: "",
      specifications: {},
      isFeatured: false,
    })
  }

  // Category Functions
  const handleAddCategory = () => {
    const category = db.addCategory(newCategory)
    setCategories(db.getCategories())
    setIsAddCategoryOpen(false)
    resetCategoryForm()
  }

  const handleUpdateCategory = () => {
    if (editingCategory) {
      db.updateCategory(editingCategory.id, newCategory)
      setCategories(db.getCategories())
      setEditingCategory(null)
      resetCategoryForm()
    }
  }

  const handleDeleteCategory = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا القسم؟")) {
      db.deleteCategory(id)
      setCategories(db.getCategories())
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      image: category.image,
      slug: category.slug,
      productCount: category.productCount,
    })
  }

  const resetCategoryForm = () => {
    setNewCategory({
      name: "",
      description: "",
      image: "",
      slug: "",
      productCount: 0,
    })
  }

  // Site Settings Functions
  const handleUpdateSiteSettings = () => {
    const updated = db.updateSiteSettings(tempSiteSettings)
    setSiteSettings(updated)
    alert("تم حفظ إعدادات الموقع بنجاح!")
  }

  // Helper Functions
  const addFeature = () => {
    setNewProduct((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setNewProduct((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }))
  }

  const removeFeature = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  if (!isAuthenticated) {
    return <div>جاري التحميل...</div>
  }

  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.inStock).length
  const outOfStockProducts = totalProducts - inStockProducts
  const featuredProducts = products.filter((p) => p.isFeatured).length

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/" className="flex items-center space-x-2 space-x-reverse">
                <Image src="/logo.png" alt="EazySoft Logo" width={40} height={40} className="h-10 w-auto" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">لوحة التحكم</h1>
                  <p className="text-sm text-gray-600">EazySoft Admin</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  عرض الموقع
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">منتج في المتجر</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">متوفر في المخزون</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{inStockProducts}</div>
              <p className="text-xs text-muted-foreground">منتج متاح</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">نفد من المخزون</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{outOfStockProducts}</div>
              <p className="text-xs text-muted-foreground">منتج غير متاح</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المنتجات المميزة</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{featuredProducts}</div>
              <p className="text-xs text-muted-foreground">منتج مميز</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="categories">الأقسام الرئيسية</TabsTrigger>
            <TabsTrigger value="featured">المنتجات المميزة</TabsTrigger>
            <TabsTrigger value="settings">إعدادات الموقع</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>إدارة المنتجات</CardTitle>
                    <CardDescription>إضافة وتعديل وحذف المنتجات</CardDescription>
                  </div>
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة منتج جديد
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
                      <DialogHeader>
                        <DialogTitle>{editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}</DialogTitle>
                        <DialogDescription>
                          {editingProduct ? "تعديل تفاصيل المنتج" : "أدخل تفاصيل المنتج الجديد"}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">اسم المنتج</Label>
                            <Input
                              id="name"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                              placeholder="أدخل اسم المنتج"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="price">السعر</Label>
                              <Input
                                id="price"
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct((prev) => ({ ...prev, price: Number(e.target.value) }))}
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <Label htmlFor="originalPrice">السعر الأصلي (اختياري)</Label>
                              <Input
                                id="originalPrice"
                                type="number"
                                value={newProduct.originalPrice}
                                onChange={(e) =>
                                  setNewProduct((prev) => ({ ...prev, originalPrice: Number(e.target.value) }))
                                }
                                placeholder="0"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="brand">العلامة التجارية</Label>
                              <Input
                                id="brand"
                                value={newProduct.brand}
                                onChange={(e) => setNewProduct((prev) => ({ ...prev, brand: e.target.value }))}
                                placeholder="أدخل العلامة التجارية"
                              />
                            </div>
                            <div>
                              <Label htmlFor="category">الفئة</Label>
                              <Select
                                value={newProduct.category}
                                onValueChange={(value) => setNewProduct((prev) => ({ ...prev, category: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الفئة" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.name}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="image">رابط الصورة</Label>
                            <Input
                              id="image"
                              value={newProduct.image}
                              onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))}
                              placeholder="/images/product.png"
                            />
                          </div>

                          <div>
                            <Label htmlFor="description">الوصف</Label>
                            <Textarea
                              id="description"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                              placeholder="أدخل وصف المنتج"
                              rows={3}
                            />
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          <div>
                            <Label>المميزات</Label>
                            {newProduct.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2 space-x-reverse mt-2">
                                <Input
                                  value={feature}
                                  onChange={(e) => updateFeature(index, e.target.value)}
                                  placeholder="أدخل ميزة المنتج"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFeature(index)}
                                  disabled={newProduct.features.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addFeature}
                              className="mt-2 bg-transparent"
                            >
                              <Plus className="h-4 w-4 ml-2" />
                              إضافة ميزة
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="badge">الشارة (اختياري)</Label>
                              <Input
                                id="badge"
                                value={newProduct.badge}
                                onChange={(e) => setNewProduct((prev) => ({ ...prev, badge: e.target.value }))}
                                placeholder="الأكثر مبيعاً، جديد، مميز"
                              />
                            </div>
                            <div>
                              <Label htmlFor="rating">التقييم</Label>
                              <Input
                                id="rating"
                                type="number"
                                min="1"
                                max="5"
                                step="0.1"
                                value={newProduct.rating}
                                onChange={(e) => setNewProduct((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="reviews">عدد التقييمات</Label>
                              <Input
                                id="reviews"
                                type="number"
                                value={newProduct.reviews}
                                onChange={(e) =>
                                  setNewProduct((prev) => ({ ...prev, reviews: Number(e.target.value) }))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="inStock">حالة المخزون</Label>
                              <Select
                                value={newProduct.inStock.toString()}
                                onValueChange={(value) =>
                                  setNewProduct((prev) => ({ ...prev, inStock: value === "true" }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="true">متوفر</SelectItem>
                                  <SelectItem value="false">نفد من المخزون</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="isFeatured">منتج مميز</Label>
                            <Select
                              value={newProduct.isFeatured.toString()}
                              onValueChange={(value) =>
                                setNewProduct((prev) => ({ ...prev, isFeatured: value === "true" }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">نعم</SelectItem>
                                <SelectItem value="false">لا</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 space-x-reverse mt-6">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsAddProductOpen(false)
                            setEditingProduct(null)
                            resetProductForm()
                          }}
                        >
                          إلغاء
                        </Button>
                        <Button
                          onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {editingProduct ? "تحديث المنتج" : "إضافة المنتج"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="relative w-16 h-16">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            {product.category} • {product.brand}
                          </p>
                          <div className="flex items-center space-x-2 space-x-reverse mt-1">
                            <span className="font-bold text-red-600">{product.price.toLocaleString()} ر.س</span>
                            {product.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {product.badge}
                              </Badge>
                            )}
                            <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                              {product.inStock ? "متوفر" : "نفد"}
                            </Badge>
                            {product.isFeatured && (
                              <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-200">
                                مميز
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleEditProduct(product)
                            setIsAddProductOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>إدارة الأقسام الرئيسية</CardTitle>
                    <CardDescription>إضافة وتعديل وحذف أقسام المنتجات</CardDescription>
                  </div>
                  <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة قسم جديد
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl" dir="rtl">
                      <DialogHeader>
                        <DialogTitle>{editingCategory ? "تعديل القسم" : "إضافة قسم جديد"}</DialogTitle>
                        <DialogDescription>
                          {editingCategory ? "تعديل تفاصيل القسم" : "أدخل تفاصيل القسم الجديد"}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="categoryName">اسم القسم</Label>
                          <Input
                            id="categoryName"
                            value={newCategory.name}
                            onChange={(e) => {
                              const name = e.target.value
                              setNewCategory((prev) => ({
                                ...prev,
                                name,
                                slug: generateSlug(name),
                              }))
                            }}
                            placeholder="أدخل اسم القسم"
                          />
                        </div>

                        <div>
                          <Label htmlFor="categorySlug">الرابط (Slug)</Label>
                          <Input
                            id="categorySlug"
                            value={newCategory.slug}
                            onChange={(e) => setNewCategory((prev) => ({ ...prev, slug: e.target.value }))}
                            placeholder="category-slug"
                          />
                        </div>

                        <div>
                          <Label htmlFor="categoryDescription">الوصف</Label>
                          <Textarea
                            id="categoryDescription"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="أدخل وصف القسم"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="categoryImage">رابط الصورة</Label>
                          <Input
                            id="categoryImage"
                            value={newCategory.image}
                            onChange={(e) => setNewCategory((prev) => ({ ...prev, image: e.target.value }))}
                            placeholder="/images/category.png"
                          />
                        </div>

                        <div>
                          <Label htmlFor="productCount">عدد المنتجات</Label>
                          <Input
                            id="productCount"
                            type="number"
                            value={newCategory.productCount}
                            onChange={(e) =>
                              setNewCategory((prev) => ({ ...prev, productCount: Number(e.target.value) }))
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 space-x-reverse mt-6">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsAddCategoryOpen(false)
                            setEditingCategory(null)
                            resetCategoryForm()
                          }}
                        >
                          إلغاء
                        </Button>
                        <Button
                          onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {editingCategory ? "تحديث القسم" : "إضافة القسم"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => (
                    <Card key={category.id} className="overflow-hidden">
                      <div className="relative h-32">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {category.productCount} منتج
                          </Badge>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handleEditCategory(category)
                                setIsAddCategoryOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Featured Products Tab */}
          <TabsContent value="featured">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المنتجات المميزة</CardTitle>
                <CardDescription>تحكم في المنتجات التي تظهر في قسم المنتجات المميزة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="relative w-16 h-16">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            {product.category} • {product.brand}
                          </p>
                          <div className="flex items-center space-x-2 space-x-reverse mt-1">
                            <span className="font-bold text-red-600">{product.price.toLocaleString()} ر.س</span>
                            {product.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Badge variant={product.isFeatured ? "default" : "outline"} className="text-xs">
                          {product.isFeatured ? "مميز" : "غير مميز"}
                        </Badge>
                        <Button
                          variant={product.isFeatured ? "destructive" : "default"}
                          size="sm"
                          onClick={() => {
                            db.updateProduct(product.id, { isFeatured: !product.isFeatured })
                            setProducts(db.getProducts())
                          }}
                        >
                          {product.isFeatured ? "إزالة من المميزة" : "إضافة للمميزة"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الموقع</CardTitle>
                <CardDescription>تحكم في النصوص والصور الرئيسية للموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">قسم البطل (Hero Section)</h3>

                  <div>
                    <Label htmlFor="heroTitle">العنوان الرئيسي</Label>
                    <Input
                      id="heroTitle"
                      value={tempSiteSettings.heroTitle}
                      onChange={(e) => setTempSiteSettings((prev) => ({ ...prev, heroTitle: e.target.value }))}
                      placeholder="حلول الأمان المتقدمة"
                    />
                  </div>

                  <div>
                    <Label htmlFor="heroSubtitle">النص الفرعي</Label>
                    <Textarea
                      id="heroSubtitle"
                      value={tempSiteSettings.heroSubtitle}
                      onChange={(e) => setTempSiteSettings((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
                      placeholder="نقدم أحدث تقنيات الأمان والمنازل الذكية..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="heroBackground">صورة الخلفية</Label>
                    <Input
                      id="heroBackground"
                      value={tempSiteSettings.heroBackgroundImage}
                      onChange={(e) =>
                        setTempSiteSettings((prev) => ({ ...prev, heroBackgroundImage: e.target.value }))
                      }
                      placeholder="/images/hero-security.png"
                    />
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-semibold">قسم المنتجات المميزة</h3>

                  <div>
                    <Label htmlFor="featuredTitle">عنوان القسم</Label>
                    <Input
                      id="featuredTitle"
                      value={tempSiteSettings.featuredSectionTitle}
                      onChange={(e) =>
                        setTempSiteSettings((prev) => ({ ...prev, featuredSectionTitle: e.target.value }))
                      }
                      placeholder="المنتجات المميزة"
                    />
                  </div>

                  <div>
                    <Label htmlFor="featuredSubtitle">النص الفرعي</Label>
                    <Input
                      id="featuredSubtitle"
                      value={tempSiteSettings.featuredSectionSubtitle}
                      onChange={(e) =>
                        setTempSiteSettings((prev) => ({ ...prev, featuredSectionSubtitle: e.target.value }))
                      }
                      placeholder="أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleUpdateSiteSettings} className="bg-red-600 hover:bg-red-700">
                    <Settings className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
