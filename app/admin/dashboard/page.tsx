"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Plus, Edit, Trash2, Save, X, Settings, Package, BarChart3, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { db, type Product, type Category, type SiteSettings, type ContactInfo } from "@/lib/db"

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    heroTitle: "",
    heroSubtitle: "",
    heroBackgroundImage: "",
    featuredSectionTitle: "",
    featuredSectionSubtitle: "",
  })
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "",
    email: "",
    address: "",
    workingHours: "",
  })
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  useEffect(() => {
    // Check if user is authenticated (simple check)
    const isAuthenticated = sessionStorage.getItem("admin_authenticated")
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    loadData()
  }, [router])

  const loadData = () => {
    setProducts(db.getProducts())
    setCategories(db.getCategories())
    setSiteSettings(db.getSiteSettings())
    setContactInfo(db.getContactInfo())
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated")
    router.push("/admin")
  }

  const handleSaveProduct = (productData: Omit<Product, "id"> | Product) => {
    try {
      if ("id" in productData) {
        // Update existing product
        db.updateProduct(productData.id, productData)
        toast({
          title: "تم التحديث",
          description: "تم تحديث المنتج بنجاح",
        })
      } else {
        // Add new product
        db.addProduct(productData)
        toast({
          title: "تم الإضافة",
          description: "تم إضافة المنتج بنجاح",
        })
      }
      loadData()
      setEditingProduct(null)
      setIsAddingProduct(false)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المنتج",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = (id: number) => {
    try {
      db.deleteProduct(id)
      loadData()
      toast({
        title: "تم الحذف",
        description: "تم حذف المنتج بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المنتج",
        variant: "destructive",
      })
    }
  }

  const handleSaveCategory = (categoryData: Omit<Category, "id"> | Category) => {
    try {
      if ("id" in categoryData) {
        // Update existing category
        db.updateCategory(categoryData.id, categoryData)
        toast({
          title: "تم التحديث",
          description: "تم تحديث الفئة بنجاح",
        })
      } else {
        // Add new category
        db.addCategory(categoryData)
        toast({
          title: "تم الإضافة",
          description: "تم إضافة الفئة بنجاح",
        })
      }
      loadData()
      setEditingCategory(null)
      setIsAddingCategory(false)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الفئة",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = (id: number) => {
    try {
      db.deleteCategory(id)
      loadData()
      toast({
        title: "تم الحذف",
        description: "تم حذف الفئة بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الفئة",
        variant: "destructive",
      })
    }
  }

  const handleSaveSiteSettings = (settings: SiteSettings) => {
    try {
      db.updateSiteSettings(settings)
      setSiteSettings(settings)
      toast({
        title: "تم التحديث",
        description: "تم تحديث إعدادات الموقع بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      })
    }
  }

  const handleSaveContactInfo = (info: ContactInfo) => {
    try {
      db.updateContactInfo(info)
      setContactInfo(info)
      toast({
        title: "تم التحديث",
        description: "تم تحديث معلومات التواصل بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ معلومات التواصل",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image src="/easyoft-logo.png" alt="EASYoft" width={120} height={40} className="h-8 w-auto" />
              <h1 className="mr-4 text-xl font-semibold text-easyoft-dark">لوحة التحكم</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              الفئات
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              إعدادات الموقع
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              معلومات التواصل
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              الإحصائيات
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة المنتجات</CardTitle>
                    <CardDescription>إضافة وتعديل وحذف المنتجات</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddingProduct(true)} className="bg-easyoft-light hover:bg-easyoft-dark">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة منتج جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold text-easyoft-dark">{product.price} ر.س</span>
                            {product.badge && <Badge className="bg-easyoft-aqua text-white">{product.badge}</Badge>}
                            <Badge variant={product.inStock ? "default" : "destructive"}>
                              {product.inStock ? "متوفر" : "نفد المخزون"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>حذف</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة الفئات</CardTitle>
                    <CardDescription>إضافة وتعديل وحذف فئات المنتجات</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddingCategory(true)} className="bg-easyoft-light hover:bg-easyoft-dark">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة فئة جديدة
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                          <Badge className="mt-1 bg-easyoft-aqua/10 text-easyoft-dark">
                            {category.productCount} منتج
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingCategory(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من حذف هذه الفئة؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>
                                حذف
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
                <CardDescription>تخصيص محتوى الصفحة الرئيسية</CardDescription>
              </CardHeader>
              <CardContent>
                <SiteSettingsForm settings={siteSettings} onSave={handleSaveSiteSettings} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>معلومات التواصل</CardTitle>
                <CardDescription>إدارة معلومات التواصل والشبكات الاجتماعية</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactInfoForm contactInfo={contactInfo} onSave={handleSaveContactInfo} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-easyoft-dark">{products.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الفئات</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-easyoft-dark">{categories.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المنتجات المميزة</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-easyoft-dark">
                    {products.filter((p) => p.isFeatured).length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المنتجات المتوفرة</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-easyoft-dark">{products.filter((p) => p.inStock).length}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Form Modal */}
      {(editingProduct || isAddingProduct) && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onCancel={() => {
            setEditingProduct(null)
            setIsAddingProduct(false)
          }}
        />
      )}

      {/* Category Form Modal */}
      {(editingCategory || isAddingCategory) && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => {
            setEditingCategory(null)
            setIsAddingCategory(false)
          }}
        />
      )}
    </div>
  )
}

// Product Form Component
function ProductForm({
  product,
  categories,
  onSave,
  onCancel,
}: {
  product: Product | null
  categories: Category[]
  onSave: (product: Omit<Product, "id"> | Product) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: product?.name || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    image: product?.image || "/placeholder.svg?height=300&width=300&text=منتج",
    category: product?.category || "",
    brand: product?.brand || "",
    rating: product?.rating || 5,
    reviews: product?.reviews || 0,
    features: product?.features || [],
    inStock: product?.inStock ?? true,
    badge: product?.badge || "",
    description: product?.description || "",
    specifications: product?.specifications || {},
    isFeatured: product?.isFeatured ?? false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (product) {
      onSave({ ...formData, id: product.id })
    } else {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-easyoft-dark">{product ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">اسم المنتج</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">العلامة التجارية</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">السعر</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">السعر الأصلي (اختياري)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice || ""}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) || undefined })}
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
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">الفئة</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
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
              <div>
                <Label htmlFor="badge">الشارة (اختياري)</Label>
                <Input
                  id="badge"
                  value={formData.badge || ""}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value || null })}
                  placeholder="مثل: جديد، الأكثر مبيعاً"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="features">المميزات (مفصولة بفاصلة)</Label>
              <Input
                id="features"
                value={formData.features.join(", ")}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value.split(", ").filter((f) => f.trim()) })
                }
                placeholder="مميزة 1, مميزة 2, مميزة 3"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                />
                <Label htmlFor="inStock">متوفر في المخزون</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                />
                <Label htmlFor="isFeatured">منتج مميز</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-easyoft-light hover:bg-easyoft-dark">
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Category Form Component
function CategoryForm({
  category,
  onSave,
  onCancel,
}: {
  category: Category | null
  onSave: (category: Omit<Category, "id"> | Category) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Omit<Category, "id">>({
    name: category?.name || "",
    description: category?.description || "",
    image: category?.image || "/placeholder.svg?height=200&width=300&text=فئة",
    slug: category?.slug || "",
    productCount: category?.productCount || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (category) {
      onSave({ ...formData, id: category.id })
    } else {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-easyoft-dark">{category ? "تعديل الفئة" : "إضافة فئة جديدة"}</h2>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">اسم الفئة</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">الرابط (slug)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="category-slug"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="productCount">عدد المنتجات</Label>
              <Input
                id="productCount"
                type="number"
                value={formData.productCount}
                onChange={(e) => setFormData({ ...formData, productCount: Number(e.target.value) })}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-easyoft-light hover:bg-easyoft-dark">
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Site Settings Form Component
function SiteSettingsForm({
  settings,
  onSave,
}: {
  settings: SiteSettings
  onSave: (settings: SiteSettings) => void
}) {
  const [formData, setFormData] = useState<SiteSettings>(settings)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-easyoft-dark">قسم البطل (Hero Section)</h3>
        <div>
          <Label htmlFor="heroTitle">عنوان البطل</Label>
          <Input
            id="heroTitle"
            value={formData.heroTitle}
            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="heroSubtitle">العنوان الفرعي</Label>
          <Textarea
            id="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            rows={3}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-easyoft-dark">قسم المنتجات المميزة</h3>
        <div>
          <Label htmlFor="featuredSectionTitle">عنوان القسم</Label>
          <Input
            id="featuredSectionTitle"
            value={formData.featuredSectionTitle}
            onChange={(e) => setFormData({ ...formData, featuredSectionTitle: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="featuredSectionSubtitle">العنوان الفرعي</Label>
          <Textarea
            id="featuredSectionSubtitle"
            value={formData.featuredSectionSubtitle}
            onChange={(e) => setFormData({ ...formData, featuredSectionSubtitle: e.target.value })}
            rows={2}
            required
          />
        </div>
      </div>

      <Button type="submit" className="bg-easyoft-light hover:bg-easyoft-dark">
        <Save className="h-4 w-4 ml-2" />
        حفظ الإعدادات
      </Button>
    </form>
  )
}

// Contact Info Form Component
function ContactInfoForm({
  contactInfo,
  onSave,
}: {
  contactInfo: ContactInfo
  onSave: (info: ContactInfo) => void
}) {
  const [formData, setFormData] = useState<ContactInfo>(contactInfo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-easyoft-dark">معلومات التواصل الأساسية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address">العنوان</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="workingHours">ساعات العمل</Label>
          <Input
            id="workingHours"
            value={formData.workingHours}
            onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-easyoft-dark">الشبكات الاجتماعية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="whatsapp">واتساب</Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp || ""}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+966 50 123 4567"
            />
          </div>
          <div>
            <Label htmlFor="facebook">فيسبوك</Label>
            <Input
              id="facebook"
              value={formData.facebook || ""}
              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              placeholder="https://facebook.com/username"
            />
          </div>
          <div>
            <Label htmlFor="twitter">تويتر</Label>
            <Input
              id="twitter"
              value={formData.twitter || ""}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <Label htmlFor="instagram">إنستغرام</Label>
            <Input
              id="instagram"
              value={formData.instagram || ""}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="bg-easyoft-light hover:bg-easyoft-dark">
        <Save className="h-4 w-4 ml-2" />
        حفظ معلومات التواصل
      </Button>
    </form>
  )
}
