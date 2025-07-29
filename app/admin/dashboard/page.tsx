"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Settings,
  Database,
  Star,
  Users,
  FileText,
  Wrench,
  MessageCircle,
  TrendingUp,
  ImageIcon,
  Presentation,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ImageUploadDialog } from "@/components/image-upload-dialog"
import {
  db,
  type Product,
  type Category,
  type AboutPage,
  type ContactSettings,
  type ContactInfo,
  type TeamMember,
  type Service,
  type Stat,
  type FAQ,
  type HeroSlide,
} from "@/lib/db"
import { toast } from "@/hooks/use-toast"
import type { UploadedImage } from "@/lib/image-upload"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null)
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [faqs, setFAQs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedHeroSlide, setSelectedHeroSlide] = useState<HeroSlide | null>(null)
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null)
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null)
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [showHeroSlideDialog, setShowHeroSlideDialog] = useState(false)
  const [showTeamDialog, setShowTeamDialog] = useState(false)
  const [showServiceDialog, setShowServiceDialog] = useState(false)
  const [showStatDialog, setShowStatDialog] = useState(false)
  const [showFAQDialog, setShowFAQDialog] = useState(false)
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
    local_image_path: "",
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
    local_image_path: "",
    product_count: "0",
  })

  const [heroSlideForm, setHeroSlideForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    button_text: "",
    button_link: "",
    is_active: true,
    sort_order: "1",
  })

  const [aboutForm, setAboutForm] = useState({
    hero_title: "",
    hero_subtitle: "",
    story_title: "",
    story_content: "",
    story_content_2: "",
    mission_title: "",
    mission_content: "",
    vision_title: "",
    vision_content: "",
    values_title: "",
    team_title: "",
    stats_title: "",
  })

  const [contactSettingsForm, setContactSettingsForm] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_description: "",
    form_title: "",
    form_description: "",
    info_title: "",
    info_description: "",
    map_title: "",
    map_embed_url: "",
    office_hours: "",
    response_time: "",
  })

  const [contactInfoForm, setContactInfoForm] = useState({
    phone: "",
    email: "",
    address: "",
    working_hours: "",
    whatsapp: "",
  })

  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "",
    image: "",
    local_image_path: "",
    bio: "",
  })

  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    icon: "",
  })

  const [statForm, setStatForm] = useState({
    number: "",
    label: "",
  })

  const [faqForm, setFAQForm] = useState({
    question: "",
    answer: "",
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
      const [
        productsData,
        categoriesData,
        heroSlidesData,
        aboutData,
        contactSettingsData,
        contactInfoData,
        teamData,
        servicesData,
        statsData,
        faqsData,
      ] = await Promise.all([
        db.getProducts(),
        db.getCategories(),
        db.getHeroSlides(),
        db.getAboutPage(),
        db.getContactSettings(),
        db.getContactInfo(),
        db.getTeamMembers(),
        db.getServices(),
        db.getStats(),
        db.getFAQs(),
      ])

      setProducts(productsData)
      setCategories(categoriesData)
      setHeroSlides(heroSlidesData)
      setAboutPage(aboutData)
      setContactSettings(contactSettingsData)
      setContactInfo(contactInfoData)
      setTeamMembers(teamData)
      setServices(servicesData)
      setStats(statsData)
      setFAQs(faqsData)

      // Set form data
      if (aboutData) {
        setAboutForm({
          hero_title: aboutData.hero_title || "",
          hero_subtitle: aboutData.hero_subtitle || "",
          story_title: aboutData.story_title || "",
          story_content: aboutData.story_content || "",
          story_content_2: aboutData.story_content_2 || "",
          mission_title: aboutData.mission_title || "",
          mission_content: aboutData.mission_content || "",
          vision_title: aboutData.vision_title || "",
          vision_content: aboutData.vision_content || "",
          values_title: aboutData.values_title || "",
          team_title: aboutData.team_title || "",
          stats_title: aboutData.stats_title || "",
        })
      }

      if (contactSettingsData) {
        setContactSettingsForm({
          hero_title: contactSettingsData.hero_title || "",
          hero_subtitle: contactSettingsData.hero_subtitle || "",
          hero_description: contactSettingsData.hero_description || "",
          form_title: contactSettingsData.form_title || "",
          form_description: contactSettingsData.form_description || "",
          info_title: contactSettingsData.info_title || "",
          info_description: contactSettingsData.info_description || "",
          map_title: contactSettingsData.map_title || "",
          map_embed_url: contactSettingsData.map_embed_url || "",
          office_hours: contactSettingsData.office_hours || "",
          response_time: contactSettingsData.response_time || "",
        })
      }

      if (contactInfoData) {
        setContactInfoForm({
          phone: contactInfoData.phone || "",
          email: contactInfoData.email || "",
          address: contactInfoData.address || "",
          working_hours: contactInfoData.working_hours || "",
          whatsapp: contactInfoData.whatsapp || "",
        })
      }
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

  // Image selection handlers
  const handleProductImageSelect = (image: UploadedImage) => {
    setProductForm({ ...productForm, local_image_path: image.file_path, image: image.file_path })
  }

  const handleCategoryImageSelect = (image: UploadedImage) => {
    setCategoryForm({ ...categoryForm, local_image_path: image.file_path, image: image.file_path })
  }

  const handleHeroSlideImageSelect = (image: UploadedImage) => {
    setHeroSlideForm({ ...heroSlideForm, image_url: image.file_path })
  }

  const handleTeamImageSelect = (image: UploadedImage) => {
    setTeamForm({ ...teamForm, local_image_path: image.file_path, image: image.file_path })
  }

  // Hero Slide handlers
  const handleHeroSlideSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const slideData = {
        ...heroSlideForm,
        sort_order: Number.parseInt(heroSlideForm.sort_order),
      }

      if (selectedHeroSlide) {
        await db.updateHeroSlide(selectedHeroSlide.id, slideData)
        toast({
          title: "تم تحديث الشريحة بنجاح! ✅",
          description: `تم تحديث ${slideData.title}`,
        })
      } else {
        await db.addHeroSlide(slideData)
        toast({
          title: "تم إضافة الشريحة بنجاح! 🎉",
          description: `تم إضافة ${slideData.title}`,
        })
      }

      setShowHeroSlideDialog(false)
      resetHeroSlideForm()
      loadData()
    } catch (error) {
      console.error("Error saving hero slide:", error)
      toast({
        title: "خطأ في حفظ الشريحة",
        description: "حدث خطأ أثناء حفظ الشريحة",
        variant: "destructive",
      })
    }
  }

  const handleDeleteHeroSlide = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الشريحة؟")) {
      try {
        await db.deleteHeroSlide(id)
        toast({
          title: "تم حذف الشريحة بنجاح! 🗑️",
          description: "تم حذف الشريحة من قاعدة البيانات",
        })
        loadData()
      } catch (error) {
        console.error("Error deleting hero slide:", error)
        toast({
          title: "خطأ في حذف الشريحة",
          description: "حدث خطأ أثناء حذف الشريحة",
          variant: "destructive",
        })
      }
    }
  }

  const editHeroSlide = (slide: HeroSlide) => {
    setSelectedHeroSlide(slide)
    setHeroSlideForm({
      title: slide.title,
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      image_url: slide.image_url,
      button_text: slide.button_text || "",
      button_link: slide.button_link || "",
      is_active: slide.is_active,
      sort_order: slide.sort_order.toString(),
    })
    setShowHeroSlideDialog(true)
  }

  const resetHeroSlideForm = () => {
    setHeroSlideForm({
      title: "",
      subtitle: "",
      description: "",
      image_url: "",
      button_text: "",
      button_link: "",
      is_active: true,
      sort_order: "1",
    })
    setSelectedHeroSlide(null)
  }

  // Product handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...productForm,
        price: Number.parseFloat(productForm.price),
        original_price: productForm.original_price ? Number.parseFloat(productForm.original_price) : undefined,
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

  // About page handlers
  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await db.updateAboutPage(aboutForm)
      toast({
        title: "تم تحديث صفحة من نحن بنجاح! ✅",
        description: "تم حفظ التغييرات",
      })
      loadData()
    } catch (error) {
      console.error("Error updating about page:", error)
      toast({
        title: "خطأ في تحديث الصفحة",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive",
      })
    }
  }

  // Contact handlers
  const handleContactSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await db.updateContactSettings(contactSettingsForm)
      toast({
        title: "تم تحديث إعدادات التواصل بنجاح! ✅",
        description: "تم حفظ التغييرات",
      })
      loadData()
    } catch (error) {
      console.error("Error updating contact settings:", error)
      toast({
        title: "خطأ في تحديث الإعدادات",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive",
      })
    }
  }

  const handleContactInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await db.updateContactInfo(contactInfoForm)
      toast({
        title: "تم تحديث معلومات التواصل بنجاح! ✅",
        description: "تم حفظ التغييرات",
      })
      loadData()
    } catch (error) {
      console.error("Error updating contact info:", error)
      toast({
        title: "خطأ في تحديث المعلومات",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive",
      })
    }
  }

  // Team member handlers
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedTeamMember) {
        await db.updateTeamMember(selectedTeamMember.id, teamForm)
        toast({
          title: "تم تحديث عضو الفريق بنجاح! ✅",
          description: `تم تحديث ${teamForm.name}`,
        })
      } else {
        await db.addTeamMember(teamForm)
        toast({
          title: "تم إضافة عضو الفريق بنجاح! 🎉",
          description: `تم إضافة ${teamForm.name}`,
        })
      }

      setShowTeamDialog(false)
      resetTeamForm()
      loadData()
    } catch (error) {
      console.error("Error saving team member:", error)
      toast({
        title: "خطأ في حفظ عضو الفريق",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      })
    }
  }

  // Service handlers
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedService) {
        await db.updateService(selectedService.id, serviceForm)
        toast({
          title: "تم تحديث الخدمة بنجاح! ✅",
          description: `تم تحديث ${serviceForm.title}`,
        })
      } else {
        await db.addService(serviceForm)
        toast({
          title: "تم إضافة الخدمة بنجاح! 🎉",
          description: `تم إضافة ${serviceForm.title}`,
        })
      }

      setShowServiceDialog(false)
      resetServiceForm()
      loadData()
    } catch (error) {
      console.error("Error saving service:", error)
      toast({
        title: "خطأ في حفظ الخدمة",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      })
    }
  }

  // Stat handlers
  const handleStatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedStat) {
        await db.updateStat(selectedStat.id, statForm)
        toast({
          title: "تم تحديث الإحصائية بنجاح! ✅",
          description: `تم تحديث ${statForm.label}`,
        })
      } else {
        await db.addStat(statForm)
        toast({
          title: "تم إضافة الإحصائية بنجاح! 🎉",
          description: `تم إضافة ${statForm.label}`,
        })
      }

      setShowStatDialog(false)
      resetStatForm()
      loadData()
    } catch (error) {
      console.error("Error saving stat:", error)
      toast({
        title: "خطأ في حفظ الإحصائية",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      })
    }
  }

  // FAQ handlers
  const handleFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedFAQ) {
        await db.updateFAQ(selectedFAQ.id, faqForm)
        toast({
          title: "تم تحديث السؤال بنجاح! ✅",
          description: "تم تحديث السؤال والإجابة",
        })
      } else {
        await db.addFAQ(faqForm)
        toast({
          title: "تم إضافة السؤال بنجاح! 🎉",
          description: "تم إضافة السؤال والإجابة",
        })
      }

      setShowFAQDialog(false)
      resetFAQForm()
      loadData()
    } catch (error) {
      console.error("Error saving FAQ:", error)
      toast({
        title: "خطأ في حفظ السؤال",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      })
    }
  }

  // Delete handlers
  const handleDeleteProduct = async (id: number) => {
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

  const handleDeleteCategory = async (id: number) => {
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

  const handleDeleteTeamMember = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف عضو الفريق؟")) {
      try {
        await db.deleteTeamMember(id)
        toast({
          title: "تم حذف عضو الفريق بنجاح! 🗑️",
          description: "تم حذف عضو الفريق من قاعدة البيانات",
        })
        loadData()
      } catch (error) {
        console.error("Error deleting team member:", error)
        toast({
          title: "خطأ في حذف عضو الفريق",
          description: "حدث خطأ أثناء حذف عضو الفريق",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteService = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      try {
        await db.deleteService(id)
        toast({
          title: "تم حذف الخدمة بنجاح! 🗑️",
          description: "تم حذف الخدمة من قاعدة البيانات",
        })
        loadData()
      } catch (error) {
        console.error("Error deleting service:", error)
        toast({
          title: "خطأ في حذف الخدمة",
          description: "حدث خطأ أثناء حذف الخدمة",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteStat = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الإحصائية؟")) {
      try {
        await db.deleteStat(id)
        toast({
          title: "تم حذف الإحصائية بنجاح! 🗑️",
          description: "تم حذف الإحصائية من قاعدة البيانات",
        })
        loadData()
      } catch (error) {
        console.error("Error deleting stat:", error)
        toast({
          title: "خطأ في حذف الإحصائية",
          description: "حدث خطأ أثناء حذف الإحصائية",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteFAQ = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا السؤال؟")) {
      try {
        await db.deleteFAQ(id)
        toast({
          title: "تم حذف السؤال بنجاح! 🗑️",
          description: "تم حذف السؤال من قاعدة البيانات",
        })
        loadData()
      } catch (error) {
        console.error("Error deleting FAQ:", error)
        toast({
          title: "خطأ في حذف السؤال",
          description: "حدث خطأ أثناء حذف السؤال",
          variant: "destructive",
        })
      }
    }
  }

  // Reset form functions
  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      original_price: "",
      category: "",
      brand: "",
      image: "",
      local_image_path: "",
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
      local_image_path: "",
      product_count: "0",
    })
    setSelectedCategory(null)
  }

  const resetTeamForm = () => {
    setTeamForm({
      name: "",
      role: "",
      image: "",
      local_image_path: "",
      bio: "",
    })
    setSelectedTeamMember(null)
  }

  const resetServiceForm = () => {
    setServiceForm({
      title: "",
      description: "",
      icon: "",
    })
    setSelectedService(null)
  }

  const resetStatForm = () => {
    setStatForm({
      number: "",
      label: "",
    })
    setSelectedStat(null)
  }

  const resetFAQForm = () => {
    setFAQForm({
      question: "",
      answer: "",
    })
    setSelectedFAQ(null)
  }

  // Edit functions
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
      local_image_path: product.local_image_path || "",
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
      local_image_path: category.local_image_path || "",
      product_count: category.product_count.toString(),
    })
    setShowCategoryDialog(true)
  }

  const editTeamMember = (member: TeamMember) => {
    setSelectedTeamMember(member)
    setTeamForm({
      name: member.name,
      role: member.role,
      image: member.image || "",
      local_image_path: member.local_image_path || "",
      bio: member.bio || "",
    })
    setShowTeamDialog(true)
  }

  const editService = (service: Service) => {
    setSelectedService(service)
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
    })
    setShowServiceDialog(true)
  }

  const editStat = (stat: Stat) => {
    setSelectedStat(stat)
    setStatForm({
      number: stat.number,
      label: stat.label,
    })
    setShowStatDialog(true)
  }

  const editFAQ = (faq: FAQ) => {
    setSelectedFAQ(faq)
    setFAQForm({
      question: faq.question,
      answer: faq.answer,
    })
    setShowFAQDialog(true)
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
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          {[
            { title: "إجمالي المنتجات", value: products.length, icon: Package, color: "from-blue-500 to-blue-600" },
            { title: "الفئات", value: categories.length, icon: Database, color: "from-green-500 to-green-600" },
            { title: "شرائح الهيرو", value: heroSlides.length, icon: Presentation, color: "from-purple-500 to-purple-600" },
            {
              title: "أعضاء الفريق",
              value: teamMembers.length,
              icon: Users,
              color: "from-red-500 to-red-600",
            },
            {
              title: "الخدمات",
              value: services.length,
              icon: Wrench,
              color: "from-orange-500 to-orange-600",
            },
            {
              title: "الإحصائيات",
              value: stats.length,
              icon: TrendingUp,
              color: "from-pink-500 to-pink-600",
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-easyoft-sky p-1 rounded-xl grid grid-cols-7 w-full">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-easyoft-blue data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <TrendingUp className="h-4 w-4 ml-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger
              value="hero"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-easyoft-blue data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Presentation className="h-4 w-4 ml-2" />
              سلايدر الهيرو
            </TabsTrigger>
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
              value="about"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-easyoft-blue data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <FileText className="h-4 w-4 ml-2" />
              من نحن
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-easyoft-blue data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 ml-2" />
              التواصل
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-easyoft-blue data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Settings className="h-4 w-4 ml-2" />
              إعدادات
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-easyoft-navy flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    المنتجات الحديثة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                        <Badge variant={product.badge ? "default" : "secondary"}>{product.badge || "عادي"}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-easyoft-navy flex items-center gap-2">
                    <Presentation className="h-5 w-5" />
                    شرائح الهيرو
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {heroSlides.slice(0, 5).map((slide) => (
                      <div key={slide.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-easyoft-blue rounded-full flex items-center justify-center">
                          <Presentation className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{slide.title}</p>
                          <p className="text-sm text-gray-600">ترتيب: {slide.sort_order}</p>
                        </div>
                        <Badge variant={slide.is_active ? "default" : "secondary"}>
                          {slide.is_active ? "نشط" : "غير نشط"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Hero Slider Tab */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-easyoft-navy flex items-center gap-2">
                    <Presentation className="h-5 w-5" />
                    إدارة سلايدر الهيرو
                  </CardTitle>
                  <CardDescription className="text-easyoft-darkBlue">إضافة وتعديل شرائح الهيرو</CardDescription>
                </div>
                <Dialog open={showHeroSlideDialog} onOpenChange={setShowHeroSlideDialog}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      onClick={resetHeroSlideForm}
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة شريحة جديدة
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-easyoft-navy">
                        {selectedHeroSlide ? "تعديل الشريحة" : "إضافة شريحة جديدة"}
                      </DialogTitle>
                      <DialogDescription className="text-easyoft-darkBlue">
                        {selectedHeroSlide ? "قم بتعديل بيانات الشريحة" : "أدخل بيانات الشريحة الجديدة"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleHeroSlideSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="slide-title" className="text-easyoft-navy">
                            العنوان الرئيسي
                          </Label>
                          <Input
                            id="slide-title"
                            value={heroSlideForm.title}
                            onChange={(e) => setHeroSlideForm({ ...heroSlideForm, title: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="slide-subtitle" className="text-easyoft-navy">
                            العنوان الفرعي
                          </Label>
                          <Input
                            id="slide-subtitle"
                            value={heroSlideForm.subtitle}
                            onChange={(e) => setHeroSlideForm({ ...heroSlideForm, subtitle: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="slide-description" className="text-easyoft-navy">
                          الوصف
                        </Label>
                        <Textarea
                          id="slide-description"
                          value={heroSlideForm.description}
                          onChange={(e) => setHeroSlideForm({ ...heroSlideForm, description: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label className="text-easyoft-navy mb-2 block">صورة الشريحة</Label>
                        <div className="flex gap-4">
                          <ImageUploadDialog
                            category="hero"
                            onImageSelect={handleHeroSlideImageSelect}
                          >
                            <Button type="button" variant="outline" className="flex-1 bg-transparent">
                              <ImageIcon className="h-4 w-4 ml-2" />
                              اختيار صورة
                            </Button>
                          </ImageUploadDialog>
                          {heroSlideForm.image_url && (
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                              <Image
                                src={heroSlideForm.image_url || "/placeholder.svg"}
                                alt="معاينة الصورة"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="slide-button-text" className="text-easyoft-navy">
                            نص الزر
                          </Label>
                          <Input
                            id="slide-button-text"
                            value={heroSlideForm.button_text}
                            onChange={(e) => setHeroSlideForm({ ...heroSlideForm, button_text: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="slide-button-link" className="text-easyoft-navy">
                            رابط الزر
                          </Label>
                          <Input
                            id="slide-button-link"
                            value={heroSlideForm.button_link}
                            onChange={(e) => setHeroSlideForm({ ...heroSlideForm, button_link: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                            placeholder="/products, /contact, etc."
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="slide-sort-order" className="text-easyoft-navy">
                            ترتيب العرض
                          </Label>
                          <Input
                            id="slide-sort-order"
                            type="number"
                            min="1"
                            value={heroSlideForm.sort_order}
                            onChange={(e) => setHeroSlideForm({ ...heroSlideForm, sort_order: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                          <Switch
                            id="slide-active"
                            checked={heroSlideForm.is_active}
                            onCheckedChange={(checked) => setHeroSlideForm({ ...heroSlideForm, is_active: checked })}
                          />
                          <Label htmlFor="slide-active" className="text-easyoft-navy">
                            نشط
                          </Label>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex-1"
                        >
                          {selectedHeroSlide ? "تحديث الشريحة" : "إضافة الشريحة"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowHeroSlideDialog(false)}
                          className="border-easyoft-sky text-easyoft-darkBlue hover:bg-easyoft-sky"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {heroSlides.map((slide, index) => (
                    <Card
                      key={slide.id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={slide.image_url || "/placeholder.svg?height=128&width=240"}
                            alt={slide.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant={slide.is_active ? "default" : "secondary"}>
                              {slide.is_active ? "نشط" : "غير نشط"}
                            </Badge>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              #{slide.sort_order}
                            </Badge>
                          </div>
                        </div>
                        <h3 className="font-semibold text-easyoft-navy mb-2 line-clamp-2">{slide.title}</h3>
                        {slide.subtitle && (
                          <p className="text-sm text-easyoft-darkBlue mb-2 line-clamp-1">{slide.subtitle}</p>
                        )}
                        {slide.button_text && (
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs bg-easyoft-sky px-2 py-1 rounded-full">{slide.button_text}</span>
                            <span className="text-xs text-gray-500">{slide.button_link}</span>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editHeroSlide(slide)}
                            className="border-easyoft-blue text-easyoft-blue hover:bg-easyoft-sky flex-1"
                          >
                            <Edit className="h-4 w-4 ml-1" />
                            تعديل
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteHeroSlide(slide.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-easyoft-navy flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    إدارة المنتجات
                  </CardTitle>
                  <CardDescription className="text-easyoft-darkBlue">إضافة وتعديل المنتجات</CardDescription>
                </div>
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
                  <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-easyoft-navy">
                        {selectedProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
                      </DialogTitle>
                      <DialogDescription className="text-easyoft-darkBlue">
                        {selectedProduct ? "قم بتعديل بيانات المنتج" : "أدخل بيانات المنتج الجديد"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="product-name" className="text-easyoft-navy">
                            اسم المنتج
                          </Label>
                          <Input
                            id="product-name"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="product-brand" className="text-easyoft-navy">
                            العلامة التجارية
                          </Label>
                          <Input
                            id="product-brand"
                            value={productForm.brand}
                            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="product-description" className="text-easyoft-navy">
                          وصف المنتج
                        </Label>
                        <Textarea
                          id="product-description"
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          rows={3}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="product-price" className="text-easyoft-navy">
                            السعر
                          </Label>
                          <Input
                            id="product-price"
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="product-original-price" className="text-easyoft-navy">
                            السعر الأصلي
                          </Label>
                          <Input
                            id="product-original-price"
                            type="number"
                            step="0.01"
                            value={productForm.original_price}
                            onChange={(e) => setProductForm({ ...productForm, original_price: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="product-category" className="text-easyoft-navy">
                            الفئة
                          </Label>
                          <Input
                            id="product-category"
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-easyoft-navy mb-2 block">صورة المنتج</Label>
                        <div className="flex gap-4">
                          <ImageUploadDialog
                            category="products"
                            onImageSelect={handleProductImageSelect}
                          >
                            <Button type="button" variant="outline" className="flex-1 bg-transparent">
                              <ImageIcon className="h-4 w-4 ml-2" />
                              اختيار صورة
                            </Button>
                          </ImageUploadDialog>
                          {(productForm.local_image_path || productForm.image) && (
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                              <Image
                                src={productForm.local_image_path || productForm.image}
                                alt="معاينة الصورة"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="product-features" className="text-easyoft-navy">
                          المميزات (كل مميزة في سطر منفصل)
                        </Label>
                        <Textarea
                          id="product-features"
                          value={productForm.features}
                          onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          rows={4}
                          placeholder="مميزة 1&#10;مميزة 2&#10;مميزة 3"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="product-rating" className="text-easyoft-navy">
                            التقييم
                          </Label>
                          <Input
                            id="product-rating"
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
                          <Label htmlFor="product-reviews" className="text-easyoft-navy">
                            عدد المراجعات
                          </Label>
                          <Input
                            id="product-reviews"
                            type="number"
                            min="0"
                            value={productForm.reviews}
                            onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="product-badge" className="text-easyoft-navy">
                            الشارة
                          </Label>
                          <Input
                            id="product-badge"
                            value={productForm.badge}
                            onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                            className="border-easyoft-sky focus:border-brand-primary"
                            placeholder="جديد، أفضل مبيعات، إلخ"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="product-in-stock"
                            checked={productForm.in_stock}
                            onCheckedChange={(checked) => setProductForm({ ...productForm, in_stock: checked })}
                          />
                          <Label htmlFor="product-in-stock" className="text-easyoft-navy">
                            متوفر في المخزون
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="product-featured"
                            checked={productForm.is_featured}
                            onCheckedChange={(checked) => setProductForm({ ...productForm, is_featured: checked })}
                          />
                          <Label htmlFor="product-featured" className="text-easyoft-navy">
                            منتج مميز
                          </Label>
                        </div>
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
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <Card
                      key={product.id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={product.local_image_path || product.image || "/placeholder.svg?height=160&width=240"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          {product.badge && (
                            <Badge className="absolute top-2 right-2 bg-brand-primary text-white">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-easyoft-navy mb-2">{product.name}</h3>
                        <p className="text-sm text-easyoft-darkBlue mb-2">{product.brand}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-brand-primary">{product.price} ر.س</span>
                            {product.original_price && (
                              <span className="text-sm text-gray-500 line-through">{product.original_price} ر.س</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editProduct(product)}
                            className="border-easyoft-blue text-easyoft-blue hover:bg-easyoft-sky flex-1"
                          >
                            <Edit className="h-4 w-4 ml-1" />
                            تعديل
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-easyoft-navy flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    إدارة الفئات
                  </CardTitle>
                  <CardDescription className="text-easyoft-darkBlue">إضافة وتعديل فئات المنتجات</CardDescription>
                </div>
                <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                        <Label htmlFor="category-name" className="text-easyoft-navy">
                          اسم الفئة
                        </Label>
                        <Input
                          id="category-name"
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="category-slug" className="text-easyoft-navy">
                          الرابط المختصر
                        </Label>
                        <Input
                          id="category-slug"
                          value={categoryForm.slug}
                          onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          placeholder="cameras, alarms, etc."
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="category-description" className="text-easyoft-navy">
                          وصف الفئة
                        </Label>
                        <Textarea
                          id="category-description"
                          value={categoryForm.description}
                          onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label className="text-easyoft-navy mb-2 block">صورة الفئة</Label>
                        <div className="flex gap-4">
                          <ImageUploadDialog
                            category="categories"
                            onImageSelect={handleCategoryImageSelect}
                          >
                            <Button type="button" variant="outline" className="flex-1 bg-transparent">
                              <ImageIcon className="h-4 w-4 ml-2" />
                              اختيار صورة
                            </Button>
                          </ImageUploadDialog>
                          {(categoryForm.local_image_path || categoryForm.image) && (
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                              <Image
                                src={categoryForm.local_image_path || categoryForm.image}
                                alt="معاينة الصورة"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="category-product-count" className="text-easyoft-navy">
                          عدد المنتجات
                        </Label>
                        <Input
                          id="category-product-count"
                          type="number"
                          min="0"
                          value={categoryForm.product_count}
                          onChange={(e) => setCategoryForm({ ...categoryForm, product_count: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                        />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex-1"
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
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, index) => (
                    <Card
                      key={category.id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={category.local_image_path || category.image || "/placeholder.svg?height=128&width=240"}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-easyoft-navy mb-2">{category.name}</h3>
                        <p className="text-sm text-easyoft-darkBlue mb-2 line-clamp-2">{category.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary">{category.product_count} منتج</Badge>
                          <span className="text-xs text-gray-500">/{category.slug}</span>
                        </div>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Page Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-easyoft-navy flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  إدارة صفحة "من نحن"
                </CardTitle>
                <CardDescription className="text-easyoft-darkBlue">قم بتخصيص محتوى صفحة من نحن</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAboutSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero_title" className="text-easyoft-navy">
                        عنوان البطل
                      </Label>
                      <Input
                        id="hero_title"
                        value={aboutForm.hero_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, hero_title: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero_subtitle" className="text-easyoft-navy">
                        العنوان الفرعي للبطل
                      </Label>
                      <Input
                        id="hero_subtitle"
                        value={aboutForm.hero_subtitle}
                        onChange={(e) => setAboutForm({ ...aboutForm, hero_subtitle: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="story_title" className="text-easyoft-navy">
                        عنوان القصة
                      </Label>
                      <Input
                        id="story_title"
                        value={aboutForm.story_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, story_title: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="values_title" className="text-easyoft-navy">
                        عنوان القيم
                      </Label>
                      <Input
                        id="values_title"
                        value={aboutForm.values_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, values_title: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="story_content" className="text-easyoft-navy">
                      محتوى القصة - الجزء الأول
                    </Label>
                    <Textarea
                      id="story_content"
                      value={aboutForm.story_content}
                      onChange={(e) => setAboutForm({ ...aboutForm, story_content: e.target.value })}
                      className="border-easyoft-sky focus:border-brand-primary"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="story_content_2" className="text-easyoft-navy">
                      محتوى القصة - الجزء الثاني
                    </Label>
                    <Textarea
                      id="story_content_2"
                      value={aboutForm.story_content_2}
                      onChange={(e) => setAboutForm({ ...aboutForm, story_content_2: e.target.value })}
                      className="border-easyoft-sky focus:border-brand-primary"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mission_title" className="text-easyoft-navy">
                        عنوان المهمة
                      </Label>
                      <Input
                        id="mission_title"
                        value={aboutForm.mission_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, mission_title: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vision_title" className="text-easyoft-navy">
                        عنوان الرؤية
                      </Label>
                      <Input
                        id="vision_title"
                        value={aboutForm.vision_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, vision_title: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mission_content" className="text-easyoft-navy">
                        محتوى المهمة
                      </Label>
                      <Textarea
                        id="mission_content"
                        value={aboutForm.mission_content}
                        onChange={(e) => setAboutForm({ ...aboutForm, mission_content: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vision_content" className="text-easyoft-navy">
                        محتوى الرؤية
                      </Label>
                      <Textarea
                        id="vision_content"
                        value={aboutForm.vision_content}
                        onChange={(e) => setAboutForm({ ...aboutForm, vision_content: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="team_title" className="text-easyoft-navy">
                        عنوان الفريق
                      </Label>
                      <Input
                        id="team_title"
                        value={aboutForm.team_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, team_title: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stats_title" className="text-easyoft-navy">
                        عنوان الإحصائيات
                      </Label>
                      <Input
                        id="stats_title"
                        value={aboutForm.stats_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, stats_title: e.target.value })}
                        className="border-easyoft-sky focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white w-full"
                  >
                    حفظ التغييرات
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Team Members Management */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-easyoft-navy flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    إدارة أعضاء الفريق
                  </CardTitle>
                  <CardDescription className="text-easyoft-darkBlue">إضافة وتعديل أعضاء الفريق</CardDescription>
                </div>
                <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      onClick={resetTeamForm}
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة عضو جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg bg-white/95 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle className="text-easyoft-navy">
                        {selectedTeamMember ? "تعديل عضو الفريق" : "إضافة عضو جديد"}
                      </DialogTitle>
                      <DialogDescription className="text-easyoft-darkBlue">
                        {selectedTeamMember ? "قم بتعديل بيانات عضو الفريق" : "أدخل بيانات عضو الفريق الجديد"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleTeamSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="member-name" className="text-easyoft-navy">
                          الاسم
                        </Label>
                        <Input
                          id="member-name"
                          value={teamForm.name}
                          onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="member-role" className="text-easyoft-navy">
                          المنصب
                        </Label>
                        <Input
                          id="member-role"
                          value={teamForm.role}
                          onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-easyoft-navy mb-2 block">صورة العضو</Label>
                        <div className="flex gap-4">
                          <ImageUploadDialog
                            category="team"
                            onImageSelect={handleTeamImageSelect}
                          >
                            <Button type="button" variant="outline" className="flex-1 bg-transparent">
                              <ImageIcon className="h-4 w-4 ml-2" />
                              اختيار صورة
                            </Button>
                          </ImageUploadDialog>
                          {(teamForm.local_image_path || teamForm.image) && (
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                              <Image
                                src={teamForm.local_image_path || teamForm.image}
                                alt="معاينة الصورة"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="member-bio" className="text-easyoft-navy">
                          النبذة الشخصية
                        </Label>
                        <Textarea
                          id="member-bio"
                          value={teamForm.bio}
                          onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                          className="border-easyoft-sky focus:border-brand-primary"
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white flex-1"
                        >
                          {selectedTeamMember ? "تحديث العضو" : "إضافة العضو"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowTeamDialog(false)}
                          className="border-easyoft-sky text-easyoft-darkBlue hover:bg-easyoft-sky"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((member, index) => (
                    <Card
                      key={member.id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                          <Image
                            src={member.local_image_path || member.image || "/placeholder-user.jpg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-easyoft-navy mb-1">{member.name}</h3>
                        <p className="text-sm text-easyoft-blue mb-2">{member.role}</p>
                        {member.bio && <p className="text-xs text-easyoft-darkBlue mb-4 line-clamp-2">{member.bio}</p>}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editTeamMember(member)}
                            className="border-easyoft-blue text-easyoft-blue hover:bg-easyoft-sky flex-1"
                          >
                            <Edit className="h-4 w-4 ml-1" />
                            تعديل
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteTeamMember(member.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                \
