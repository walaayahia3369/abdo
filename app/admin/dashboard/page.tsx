"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Settings,
  Database,
  Star,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { db, type Product, type Category } from "@/lib/db"
import { toast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const router = useRouter()

  // Form states
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "",
    brand: "",
    image: "",
    features: "",
    rating: "4.5",
    reviews: "0",
    badge: "",
    in_stock: true,
    is_featured: false,
  })

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    slug: "",
    image: "",
    product_count: "0",
  })

  useEffect(() => {
    checkAuth()
    loadData()
  }, [])

  const checkAuth = () => {
    const adminUser = localStorage.getItem("adminUser")
    if (!adminUser) {
      router.push("/admin")
    }
  }

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([db.getProducts(), db.getCategories()])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل البيانات",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminUser")
    router.push("/admin")
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...productForm,
        price: Number.parseFloat(productForm.price),
        original_price: productForm.original_price ? Number.parseFloat(productForm.original_price) : null,
        features: productForm.features.split("\n").filter((f) => f.trim()),
        rating: Number.parseFloat(productForm.rating),
        reviews: Number.parseInt(productForm.reviews),
      }

      if (selectedProduct) {
        await db.updateProduct(selectedProduct.id, productData)
        toast({
          title: "تم تحديث المنتج بنجاح! ✅",
          description: `تم تحديث ${productData.name}`,
        })
      } else {
        await db.addProduct(productData)
        toast({
          title: "تم إضافة المنتج بنجاح! 🎉",
          description: `تم إضافة ${productData.name}`,
        })
      }

      setShowProductDialog(false)
      resetProductForm()
      loadData()
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "خطأ في حفظ المنتج",
        description: "حدث خطأ أثناء حفظ المنتج",
        variant: "destructive",
      })
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const categoryData = {
        ...categoryForm,
        product_count: Number.parseInt(categoryForm.product_count),
      }

      if (selectedCategory) {
        await db.updateCategory(selectedCategory.id, categoryData)
        toast({
          title: "تم تحديث الفئة بنجاح! ✅",
          description: `تم تحديث ${categoryData.name}`,
        })
      } else {
        await db.addCategory(categoryData)
        toast({
          title: "تم إضافة الفئة بنجاح! 🎉",
          description: `تم إضافة ${categoryData.name}`,
        })
      }

      setShowCategoryDialog(false)
      resetCategoryForm()
      loadData()
    } catch (error) {
      console.error("Error saving category:", error)
      toast({
        title: "خطأ في حفظ الفئة",
        description: "حدث خطأ أثناء حفظ الفئة",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      try {
        await db.deleteProduct(id)
        toast({
          title: "تم حذف المنتج بنجاح! 🗑️",
          description: "تم حذف المنتج من قاعدة البيانات",
        })
        loadData()
      } catch (error) {
        console.error("Error deleting product:", error)
        toast({
          title: "خطأ في حذف المنتج",
          description: "حدث خطأ أثناء حذف المنتج",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الفئة؟")) {
      try {
        await db.deleteCategory(id)
        toast({
          title: "تم حذف الفئة بنجاح! 🗑️",
          description: "تم حذف الفئة من قاعدة البيانات",
        })
        loadData()
      } catch (error) {
        console.error("Error deleting category:", error)
        toast({
          title: "خطأ في حذف الفئة",
          description: "حدث خطأ أثناء حذف الفئة",
          variant: "destructive",
        })
      }
    }
  }

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      original_price: "",
      category: "",
      brand: "",
      image: "",
      features: "",
      rating: "4.5",
      reviews: "0",
      badge: "",
      in_stock: true,
      is_featured: false,
    })
    setSelectedProduct(null)
  }

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      description: "",
      slug: "",
      image: "",
      product_count: "0",
    })
    setSelectedCategory(null)
  }

  const editProduct = (product: Product) => {
    setSelectedProduct(product)
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      original_price: product.original_price?.toString() || "",
      category: product.category,
      brand: product.brand,
      image: product.image || "",
      features: product.features.join("\n"),
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
      badge: product.badge || "",
      in_stock: product.in_stock,
      is_featured: product.is_featured || false,
    })
    setShowProductDialog(true)
  }

  const editCategory = (category: Category) => {
    setSelectedCategory(category)
    setCategoryForm({
      name: category.name,
      description: category.description || "",
      slug: category.slug,
      image: category.image || "",
      product_count: category.product_count.toString(),
    })
    setShowCategoryDialog(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-easyoft-sky to-white flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-easyoft-sky border-t-brand-primary mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-easyoft-lightBlue animate-ping mx-auto"></div>
          </div>
          <p className="text-easyoft-darkBlue font-medium text-lg animate-pulse-soft">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-easyoft-sky to-white" dir="rtl">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-easyoft-sky sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Image src="/easyoft-logo.png" alt="EASYoft" width={120} height={40} className="h-10 w-auto" />
              <div className="h-8 w-px bg-easyoft-sky"></div>
              <h1 className="text-xl font-bold text-easyoft-navy">لوحة التحكم</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-easyoft-blue text-easyoft-blue hover:bg-easyoft-sky bg-transparent"
                >
                  <Eye className="h-4 w-4 ml-2" />
                  عرض الموقع
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "إجمالي المنتجات", value: products.length, icon: Package, color: "from-blue-500 to-blue-600" },
            { title: "الفئات", value: categories.length, icon: Database, color: "from-green-500 to-green-600" },
            {
              title: "المنتجات المميزة",
              value: products.filter((p) => p.is_featured).length,
              icon: TrendingUp,
              color: "from-purple-500 to-purple-600",
            },
            {
              title: "نفد المخزون",
              value: products.filter((p) => !p.in_stock).length,
              icon: ShoppingCart,
              color: "from-red-500 to-red-600",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-easyoft-darkBlue mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-easyoft-navy">{stat.value}</p>
                  </div>
                  <div
                    className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-full flex items-center justify-center`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-easyoft-sky p-1 rounded-xl">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-easyoft-blue data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Package className="h-4 w-4 ml-2" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-easyoft-blue data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Database className="h-4 w-4 ml-2" />
              الفئات
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-easyoft-blue data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Settings className="h-4 w-4 ml-2" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-easyoft-navy">إدارة المنتجات</h2>
              <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onClick={resetProductForm}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة منتج جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle className="text-easyoft-navy">
                      {selectedProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
                    </DialogTitle>
                    <DialogDescription className="text-easyoft-darkBlue">
                      {selectedProduct ? "قم بتعديل بيانات المنتج" : "أدخل بيانات المنتج الجديد"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-easyoft-navy">
                          اسم المنتج
                        </Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="brand" className="text-easyoft-navy">
                          العلامة التجارية
                        </Label>
                        <Input
                          id="brand"
                          value={productForm.brand}
                          onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-easyoft-navy">
                        الوصف
                      </Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="price" className="text-easyoft-navy">
                          السعر
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="original_price" className="text-easyoft-navy">
                          السعر الأصلي
                        </Label>
                        <Input
                          id="original_price"
                          type="number"
                          value={productForm.original_price}
                          onChange={(e) => setProductForm({ ...productForm, original_price: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-easyoft-navy">
                          الفئة
                        </Label>
                        <Select
                          value={productForm.category}
                          onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                        >
                          <SelectTrigger className="border-easyoft-sky focus:border-brand-primary">
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
                      <Label htmlFor="image" className="text-easyoft-navy">
                        رابط الصورة
                      </Label>
                      <Input
                        id="image"
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="features" className="text-easyoft-navy">
                        المميزات (كل مميزة في سطر منفصل)
                      </Label>
                      <Textarea
                        id="features"
                        value={productForm.features}
                        onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        rows={4}
                        placeholder="مميزة 1&#10;مميزة 2&#10;مميزة 3"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="rating" className="text-easyoft-navy">
                          التقييم
                        </Label>
                        <Input
                          id="rating"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={productForm.rating}
                          onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviews" className="text-easyoft-navy">
                          عدد المراجعات
                        </Label>
                        <Input
                          id="reviews"
                          type="number"
                          value={productForm.reviews}
                          onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="badge" className="text-easyoft-navy">
                          الشارة
                        </Label>
                        <Input
                          id="badge"
                          value={productForm.badge}
                          onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          placeholder="جديد، مميز، إلخ"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productForm.in_stock}
                          onChange={(e) => setProductForm({ ...productForm, in_stock: e.target.checked })}
                          className="rounded border-easyoft-sky"
                        />
                        <span className="text-easyoft-navy">متوفر في المخزون</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productForm.is_featured}
                          onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked })}
                          className="rounded border-easyoft-sky"
                        />
                        <span className="text-easyoft-navy">منتج مميز</span>
                      </label>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white flex-1"
                      >
                        {selectedProduct ? "تحديث المنتج" : "إضافة المنتج"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowProductDialog(false)}
                        className="border-easyoft-sky text-easyoft-darkBlue hover:bg-easyoft-sky"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-easyoft-sky">
                        {product.image ? (
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-easyoft-blue" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-easyoft-navy">{product.name}</h3>
                          {product.badge && (
                            <Badge className="bg-gradient-to-r from-brand-primary to-easyoft-blue text-white text-xs">
                              {product.badge}
                            </Badge>
                          )}
                          {product.is_featured && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs">
                              مميز
                            </Badge>
                          )}
                          {!product.in_stock && (
                            <Badge variant="destructive" className="text-xs">
                              نفد المخزون
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-easyoft-darkBlue mb-2">
                          {product.category} • {product.brand}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-brand-primary">{product.price.toLocaleString()} ر.س</span>
                          {product.original_price && (
                            <span className="text-sm text-gray-400 line-through">
                              {product.original_price.toLocaleString()} ر.س
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-easyoft-darkBlue">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editProduct(product)}
                          className="border-easyoft-blue text-easyoft-blue hover:bg-easyoft-sky"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-easyoft-navy">إدارة الفئات</h2>
              <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onClick={resetCategoryForm}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة فئة جديدة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-white/95 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle className="text-easyoft-navy">
                      {selectedCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}
                    </DialogTitle>
                    <DialogDescription className="text-easyoft-darkBlue">
                      {selectedCategory ? "قم بتعديل بيانات الفئة" : "أدخل بيانات الفئة الجديدة"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="cat-name" className="text-easyoft-navy">
                        اسم الفئة
                      </Label>
                      <Input
                        id="cat-name"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cat-slug" className="text-easyoft-navy">
                        الرابط (Slug)
                      </Label>
                      <Input
                        id="cat-slug"
                        value={categoryForm.slug}
                        onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        placeholder="category-slug"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cat-description" className="text-easyoft-navy">
                        الوصف
                      </Label>
                      <Textarea
                        id="cat-description"
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cat-image" className="text-easyoft-navy">
                        رابط الصورة
                      </Label>
                      <Input
                        id="cat-image"
                        value={categoryForm.image}
                        onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cat-count" className="text-easyoft-navy">
                        عدد المنتجات
                      </Label>
                      <Input
                        id="cat-count"
                        type="number"
                        value={categoryForm.product_count}
                        onChange={(e) => setCategoryForm({ ...categoryForm, product_count: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white flex-1"
                      >
                        {selectedCategory ? "تحديث الفئة" : "إضافة الفئة"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCategoryDialog(false)}
                        className="border-easyoft-sky text-easyoft-darkBlue hover:bg-easyoft-sky"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Card
                  key={category.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-32 overflow-hidden rounded-t-lg">
                    {category.image ? (
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-easyoft-sky to-easyoft-lightBlue flex items-center justify-center">
                        <Database className="h-8 w-8 text-easyoft-blue" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-easyoft-navy">{category.name}</h3>
                      <Badge className="bg-gradient-to-r from-brand-primary to-easyoft-blue text-white text-xs">
                        {category.product_count} منتج
                      </Badge>
                    </div>
                    <p className="text-sm text-easyoft-darkBlue mb-4 line-clamp-2">{category.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => editCategory(category)}
                        className="border-easyoft-blue text-easyoft-blue hover:bg-easyoft-sky flex-1"
                      >
                        <Edit className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-easyoft-navy flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  إعدادات الموقع
                </CardTitle>
                <CardDescription className="text-easyoft-darkBlue">قم بتخصيص إعدادات الموقع العامة</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="border-easyoft-blue/20 bg-easyoft-sky/50">
                  <AlertDescription className="text-easyoft-darkBlue">
                    ستتم إضافة المزيد من الإعدادات قريباً...
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
