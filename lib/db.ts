import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export interface Product {
  id: number
  name: string
  description: string
  price: number
  original_price?: number
  image: string
  local_image_path?: string
  category: string
  brand: string
  badge?: string
  rating: number
  reviews: number
  features: string[]
  specifications: Record<string, string>
  in_stock: boolean
  is_featured: boolean
  stock_quantity: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image: string
  local_image_path?: string
  product_count: number
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  email: string
  password: string
  role: string
  name: string
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: number
  hero_title: string
  hero_subtitle: string
  featured_section_title: string
  featured_section_subtitle: string
  created_at: string
  updated_at: string
}

export interface ContactInfo {
  id: number
  phone: string
  email: string
  address: string
  working_hours: string
  whatsapp?: string
  created_at: string
  updated_at: string
}

export interface AboutPage {
  id: number
  hero_title: string
  hero_subtitle: string
  story_title: string
  story_content: string
  story_content_2: string
  mission_title: string
  mission_content: string
  vision_title: string
  vision_content: string
  values_title: string
  team_title: string
  stats_title: string
  created_at: string
  updated_at: string
}

export interface ContactPage {
  id: number
  hero_title: string
  hero_subtitle: string
  hero_description: string
  form_title: string
  form_subtitle: string
  info_title: string
  office_hours: string
  response_time: string
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  position?: string
  image: string
  local_image_path?: string
  bio: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  created_at: string
  updated_at: string
}

export interface Stat {
  id: number
  label: string
  number: string
  value?: string
  icon?: string
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
  created_at: string
  updated_at: string
}

export interface ContactSettings {
  id: number
  hero_title: string
  hero_subtitle: string
  hero_description: string
  form_title: string
  form_description: string
  info_title: string
  info_description: string
  map_title: string
  map_embed_url: string
  office_hours: string
  response_time: string
  created_at: string
  updated_at: string
}

export interface HeroSlide {
  id: number
  title: string
  subtitle?: string
  description?: string
  image_url: string
  button_text?: string
  button_link?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface UploadedImage {
  id: number
  filename: string
  original_name: string
  file_path: string
  file_size: number
  mime_type: string
  alt_text?: string
  category: string
  created_at: string
}

class Database {
  // Users and Authentication
  async getUserByCredentials(email: string, password: string): Promise<User | null> {
    try {
      // For demo purposes, check for hardcoded admin credentials first
      if (email === "admin" && password === "admin123") {
        return {
          id: 1,
          email: "admin@easyoft.com",
          password: "admin123",
          role: "admin",
          name: "مدير النظام",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }

      // Try to get from database
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .eq("password", password)
          .single()

        if (error) {
          console.log("Database query error (expected if table doesn't exist):", error.message)
          return null
        }
        return data
      } catch (dbError) {
        console.log("Database connection error:", dbError)
        return null
      }
    } catch (error) {
      console.error("Error in getUserByCredentials:", error)
      return null
    }
  }

  // Hero Slides
  async getHeroSlides(): Promise<HeroSlide[]> {
    try {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (error) {
        console.error("Error fetching hero slides:", error)
        // Return default slides if database fails
        return [
          {
            id: 1,
            title: "حلول الأمان المتقدمة",
            subtitle: "تقنيات ذكية لحماية شاملة",
            description: "نقدم أحدث أنظمة الأمان والمراقبة لحماية منزلك وعملك بأعلى معايير الجودة والتقنية",
            image_url: "/placeholder.svg?height=600&width=1200&text=Security+Solutions",
            button_text: "تصفح المنتجات",
            button_link: "/products",
            is_active: true,
            sort_order: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            title: "كاميرات المراقبة الذكية",
            subtitle: "مراقبة عالية الدقة على مدار الساعة",
            description: "كاميرات بدقة 4K مع الرؤية الليلية والذكاء الاصطناعي لحماية أفضل",
            image_url: "/placeholder.svg?height=600&width=1200&text=Smart+Cameras",
            button_text: "اكتشف المزيد",
            button_link: "/category/cameras",
            is_active: true,
            sort_order: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 3,
            title: "أنظمة الإنذار المتطورة",
            subtitle: "حماية فورية ضد التسلل والحرائق",
            description: "أنظمة إنذار ذكية مع إشعارات فورية على هاتفك المحمول",
            image_url: "/placeholder.svg?height=600&width=1200&text=Alarm+Systems",
            button_text: "اطلب الآن",
            button_link: "/contact",
            is_active: true,
            sort_order: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]
      }
      return data || []
    } catch (error) {
      console.error("Error fetching hero slides:", error)
      return []
    }
  }

  async addHeroSlide(slideData: Omit<HeroSlide, "id" | "created_at" | "updated_at">): Promise<HeroSlide> {
    try {
      const { data, error } = await supabase
        .from("hero_slides")
        .insert([
          {
            title: slideData.title,
            subtitle: slideData.subtitle || null,
            description: slideData.description || null,
            image_url: slideData.image_url,
            button_text: slideData.button_text || null,
            button_link: slideData.button_link || null,
            is_active: slideData.is_active !== undefined ? slideData.is_active : true,
            sort_order: slideData.sort_order || 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error adding hero slide:", error)
        throw new Error(`Failed to add hero slide: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error adding hero slide:", error)
      throw error
    }
  }

  async updateHeroSlide(
    id: number,
    slideData: Partial<Omit<HeroSlide, "id" | "created_at" | "updated_at">>,
  ): Promise<HeroSlide> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      if (slideData.title !== undefined) updateData.title = slideData.title
      if (slideData.subtitle !== undefined) updateData.subtitle = slideData.subtitle
      if (slideData.description !== undefined) updateData.description = slideData.description
      if (slideData.image_url !== undefined) updateData.image_url = slideData.image_url
      if (slideData.button_text !== undefined) updateData.button_text = slideData.button_text
      if (slideData.button_link !== undefined) updateData.button_link = slideData.button_link
      if (slideData.is_active !== undefined) updateData.is_active = slideData.is_active
      if (slideData.sort_order !== undefined) updateData.sort_order = slideData.sort_order

      const { data, error } = await supabase.from("hero_slides").update(updateData).eq("id", id).select().single()

      if (error) {
        console.error("Error updating hero slide:", error)
        throw new Error(`Failed to update hero slide: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error updating hero slide:", error)
      throw error
    }
  }

  async deleteHeroSlide(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("hero_slides").delete().eq("id", id)

      if (error) {
        console.error("Error deleting hero slide:", error)
        throw new Error(`Failed to delete hero slide: ${error.message}`)
      }
    } catch (error) {
      console.error("Error deleting hero slide:", error)
      throw error
    }
  }

  // Products
  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching products:", error)
        return []
      }
      return data || []
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      // First try to get products marked as featured
      const { data: featuredData, error: featuredError } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(8)

      if (!featuredError && featuredData && featuredData.length > 0) {
        return featuredData
      }

      // Fallback to products with badges
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .not("badge", "is", null)
        .order("created_at", { ascending: false })
        .limit(8)

      if (error) {
        console.error("Error fetching featured products:", error)
        return []
      }
      return data || []
    } catch (error) {
      console.error("Error fetching featured products:", error)
      return []
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching product:", error)
        return null
      }
      return data
    } catch (error) {
      console.error("Error fetching product:", error)
      return null
    }
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", categorySlug)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching products by category:", error)
        return []
      }
      return data || []
    } catch (error) {
      console.error("Error fetching products by category:", error)
      return []
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error searching products:", error)
        return []
      }
      return data || []
    } catch (error) {
      console.error("Error searching products:", error)
      return []
    }
  }

  // Product CRUD operations
  async addProduct(productData: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: productData.name,
            description: productData.description || "",
            price: productData.price,
            original_price: productData.original_price || null,
            image: productData.image || "/placeholder.svg?height=400&width=400",
            local_image_path: productData.local_image_path || null,
            category: productData.category,
            brand: productData.brand,
            badge: productData.badge || null,
            rating: productData.rating || 0,
            reviews: productData.reviews || 0,
            features: productData.features || [],
            specifications: productData.specifications || {},
            in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
            is_featured: productData.is_featured !== undefined ? productData.is_featured : false,
            stock_quantity: productData.stock_quantity || 10,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error adding product:", error)
        throw new Error(`Failed to add product: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error adding product:", error)
      throw error
    }
  }

  async updateProduct(
    id: number,
    productData: Partial<Omit<Product, "id" | "created_at" | "updated_at">>,
  ): Promise<Product> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      // Only include fields that are provided
      if (productData.name !== undefined) updateData.name = productData.name
      if (productData.description !== undefined) updateData.description = productData.description
      if (productData.price !== undefined) updateData.price = productData.price
      if (productData.original_price !== undefined) updateData.original_price = productData.original_price
      if (productData.image !== undefined) updateData.image = productData.image
      if (productData.local_image_path !== undefined) updateData.local_image_path = productData.local_image_path
      if (productData.category !== undefined) updateData.category = productData.category
      if (productData.brand !== undefined) updateData.brand = productData.brand
      if (productData.badge !== undefined) updateData.badge = productData.badge
      if (productData.rating !== undefined) updateData.rating = productData.rating
      if (productData.reviews !== undefined) updateData.reviews = productData.reviews
      if (productData.features !== undefined) updateData.features = productData.features
      if (productData.specifications !== undefined) updateData.specifications = productData.specifications
      if (productData.in_stock !== undefined) updateData.in_stock = productData.in_stock
      if (productData.is_featured !== undefined) updateData.is_featured = productData.is_featured
      if (productData.stock_quantity !== undefined) updateData.stock_quantity = productData.stock_quantity

      const { data, error } = await supabase.from("products").update(updateData).eq("id", id).select().single()

      if (error) {
        console.error("Error updating product:", error)
        throw new Error(`Failed to update product: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) {
        console.error("Error deleting product:", error)
        throw new Error(`Failed to delete product: ${error.message}`)
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

      if (error) {
        console.error("Error fetching categories:", error)
        // Return default categories if database fails
        return [
          {
            id: 1,
            name: "كاميرات المراقبة",
            slug: "cameras",
            description: "كاميرات مراقبة عالية الجودة",
            image: "/placeholder.svg?height=200&width=200&text=Cameras",
            product_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: "أنظمة الإنذار",
            slug: "alarms",
            description: "أنظمة إنذار متطورة",
            image: "/placeholder.svg?height=200&width=200&text=Alarms",
            product_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 3,
            name: "الأقفال الذكية",
            slug: "smart-locks",
            description: "أقفال ذكية آمنة",
            image: "/placeholder.svg?height=200&width=200&text=Smart+Locks",
            product_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 4,
            name: "المنازل الذكية",
            slug: "smart-home",
            description: "حلول المنازل الذكية",
            image: "/placeholder.svg?height=200&width=200&text=Smart+Home",
            product_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]
      }
      return data || []
    } catch (error) {
      console.error("Error fetching categories:", error)
      return []
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single()

      if (error) {
        console.error("Error fetching category:", error)
        return null
      }
      return data
    } catch (error) {
      console.error("Error fetching category:", error)
      return null
    }
  }

  // Category CRUD operations
  async addCategory(categoryData: Omit<Category, "id" | "created_at" | "updated_at">): Promise<Category> {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([
          {
            name: categoryData.name,
            slug: categoryData.slug,
            description: categoryData.description || "",
            image: categoryData.image || "/placeholder.svg?height=200&width=200",
            local_image_path: categoryData.local_image_path || null,
            product_count: categoryData.product_count || 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error adding category:", error)
        throw new Error(`Failed to add category: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error adding category:", error)
      throw error
    }
  }

  async updateCategory(
    id: number,
    categoryData: Partial<Omit<Category, "id" | "created_at" | "updated_at">>,
  ): Promise<Category> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      if (categoryData.name !== undefined) updateData.name = categoryData.name
      if (categoryData.slug !== undefined) updateData.slug = categoryData.slug
      if (categoryData.description !== undefined) updateData.description = categoryData.description
      if (categoryData.image !== undefined) updateData.image = categoryData.image
      if (categoryData.local_image_path !== undefined) updateData.local_image_path = categoryData.local_image_path
      if (categoryData.product_count !== undefined) updateData.product_count = categoryData.product_count

      const { data, error } = await supabase.from("categories").update(updateData).eq("id", id).select().single()

      if (error) {
        console.error("Error updating category:", error)
        throw new Error(`Failed to update category: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error updating category:", error)
      throw error
    }
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id)

      if (error) {
        console.error("Error deleting category:", error)
        throw new Error(`Failed to delete category: ${error.message}`)
      }
    } catch (error) {
      console.error("Error deleting category:", error)
      throw error
    }
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings | null> {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).single()

      if (error) {
        console.error("Error fetching site settings:", error)
        return {
          id: 1,
          hero_title: "حلول الأمان المتقدمة",
          hero_subtitle: "نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان",
          featured_section_title: "المنتجات المميزة",
          featured_section_subtitle: "أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return data
    } catch (error) {
      console.error("Error fetching site settings:", error)
      return {
        id: 1,
        hero_title: "حلول الأمان المتقدمة",
        hero_subtitle: "نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان",
        featured_section_title: "المنتجات المميزة",
        featured_section_subtitle: "أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  }

  async updateSiteSettings(
    settingsData: Partial<Omit<SiteSettings, "id" | "created_at" | "updated_at">>,
  ): Promise<void> {
    try {
      const { error } = await supabase.from("site_settings").upsert({
        id: 1,
        ...settingsData,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error updating site settings:", error)
        throw new Error(`Failed to update site settings: ${error.message}`)
      }
    } catch (error) {
      console.error("Error updating site settings:", error)
      throw error
    }
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfo | null> {
    try {
      const { data, error } = await supabase.from("contact_info").select("*").limit(1).single()

      if (error) {
        console.error("Error fetching contact info:", error)
        return {
          id: 1,
          phone: "+966 50 123 4567",
          email: "info@easyoft.com",
          address: "الرياض، المملكة العربية السعودية",
          working_hours: "الأحد - الخميس: 9:00 ص - 6:00 م",
          whatsapp: "+966 50 123 4567",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return data
    } catch (error) {
      console.error("Error fetching contact info:", error)
      return {
        id: 1,
        phone: "+966 50 123 4567",
        email: "info@easyoft.com",
        address: "الرياض، المملكة العربية السعودية",
        working_hours: "الأحد - الخميس: 9:00 ص - 6:00 م",
        whatsapp: "+966 50 123 4567",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  }

  async updateContactInfo(contactData: Partial<Omit<ContactInfo, "id" | "created_at" | "updated_at">>): Promise<void> {
    try {
      const { error } = await supabase.from("contact_info").upsert({
        id: 1,
        ...contactData,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error updating contact info:", error)
        throw new Error(`Failed to update contact info: ${error.message}`)
      }
    } catch (error) {
      console.error("Error updating contact info:", error)
      throw error
    }
  }

  // About Page
  async getAboutPage(): Promise<AboutPage | null> {
    try {
      const { data, error } = await supabase.from("about_settings").select("*").limit(1).single()

      if (error) {
        console.error("Error fetching about page:", error)
        return {
          id: 1,
          hero_title: "من نحن",
          hero_subtitle: "نحن شركة رائدة في مجال التكنولوجيا",
          story_title: "قصتنا",
          story_content: "بدأت رحلتنا في عام 2020 برؤية واضحة لتقديم حلول تقنية مبتكرة",
          story_content_2: "نسعى لتكون الخيار الأول للعملاء في المنطقة",
          mission_title: "مهمتنا",
          mission_content: "تقديم أفضل الحلول التقنية بأعلى معايير الجودة",
          vision_title: "رؤيتنا",
          vision_content: "أن نكون الشركة الرائدة في مجال التكنولوجيا",
          values_title: "قيمنا",
          team_title: "فريق العمل",
          stats_title: "إنجازاتنا",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return data
    } catch (error) {
      console.error("Error fetching about page:", error)
      return null
    }
  }

  async updateAboutPage(aboutData: Partial<Omit<AboutPage, "id" | "created_at" | "updated_at">>): Promise<void> {
    try {
      const { error } = await supabase.from("about_settings").upsert({
        id: 1,
        ...aboutData,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error updating about page:", error)
        throw new Error(`Failed to update about page: ${error.message}`)
      }
    } catch (error) {
      console.error("Error updating about page:", error)
      throw error
    }
  }

  // Contact Page
  async getContactPage(): Promise<ContactPage | null> {
    try {
      const { data, error } = await supabase.from("contact_settings").select("*").limit(1).single()

      if (error) {
        console.error("Error fetching contact page:", error)
        return {
          id: 1,
          hero_title: "تواصل معنا",
          hero_subtitle: "نحن هنا لمساعدتك",
          hero_description: "لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة",
          form_title: "أرسل لنا رسالة",
          form_subtitle: "سنقوم بالرد عليك في أقرب وقت ممكن",
          info_title: "معلومات التواصل",
          office_hours: "الأحد - الخميس: 9:00 ص - 6:00 م",
          response_time: "نرد خلال 24 ساعة",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return data
    } catch (error) {
      console.error("Error fetching contact page:", error)
      return null
    }
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const { data, error } = await supabase.from("team_members").select("*").order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching team members:", error)
        return []
      }
      return data || []
    } catch (error) {
      console.error("Error fetching team members:", error)
      return []
    }
  }

  async addTeamMember(memberData: Omit<TeamMember, "id" | "created_at" | "updated_at">): Promise<TeamMember> {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .insert([
          {
            name: memberData.name,
            role: memberData.role,
            position: memberData.position || memberData.role,
            image: memberData.image || "/placeholder-user.jpg",
            local_image_path: memberData.local_image_path || null,
            bio: memberData.bio || "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error adding team member:", error)
        throw new Error(`Failed to add team member: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error adding team member:", error)
      throw error
    }
  }

  async updateTeamMember(
    id: number,
    memberData: Partial<Omit<TeamMember, "id" | "created_at" | "updated_at">>,
  ): Promise<TeamMember> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      if (memberData.name !== undefined) updateData.name = memberData.name
      if (memberData.role !== undefined) updateData.role = memberData.role
      if (memberData.position !== undefined) updateData.position = memberData.position
      if (memberData.image !== undefined) updateData.image = memberData.image
      if (memberData.local_image_path !== undefined) updateData.local_image_path = memberData.local_image_path
      if (memberData.bio !== undefined) updateData.bio = memberData.bio

      const { data, error } = await supabase.from("team_members").update(updateData).eq("id", id).select().single()

      if (error) {
        console.error("Error updating team member:", error)
        throw new Error(`Failed to update team member: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error updating team member:", error)
      throw error
    }
  }

  async deleteTeamMember(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("team_members").delete().eq("id", id)

      if (error) {
        console.error("Error deleting team member:", error)
        throw new Error(`Failed to delete team member: ${error.message}`)
      }
    } catch (error) {
      console.error("Error deleting team member:", error)
      throw error
    }
  }

  // Services
  async getServices(): Promise<Service[]> {
    try {
      const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching services:", error)
        return []
      }
      return data || []
    } catch (error) {
      console.error("Error fetching services:", error)
      return []
    }
  }

  async addService(serviceData: Omit<Service, "id" | "created_at" | "updated_at">): Promise<Service> {
    try {
      const { data, error } = await supabase
        .from("services")
        .insert([
          {
            title: serviceData.title,
            description: serviceData.description || "",
            icon: serviceData.icon || "Settings",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error adding service:", error)
        throw new Error(`Failed to add service: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error adding service:", error)
      throw error
    }
  }

  async updateService(
    id: number,
    serviceData: Partial<Omit<Service, "id" | "created_at" | "updated_at">>,
  ): Promise<Service> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      if (serviceData.title !== undefined) updateData.title = serviceData.title
      if (serviceData.description !== undefined) updateData.description = serviceData.description
      if (serviceData.icon !== undefined) updateData.icon = serviceData.icon

      const { data, error } = await supabase.from("services").update(updateData).eq("id", id).select().single()

      if (error) {
        console.error("Error updating service:", error)
        throw new Error(`Failed to update service: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error updating service:", error)
      throw error
    }
  }

  async deleteService(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id)

      if (error) {
        console.error("Error deleting service:", error)
        throw new Error(`Failed to delete service: ${error.message}`)
      }
    } catch (error) {
      console.error("Error deleting service:", error)
      throw error
    }
  }

  // Stats
  async getStats(): Promise<Stat[]> {
    try {
      const { data, error } = await supabase.from("stats").select("*").order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching stats:", error)
        return []
      }
      return data || []
    } catch (error) {
      console.error("Error fetching stats:", error)
      return []
    }
  }

  async addStat(statData: Omit<Stat, "id" | "created_at" | "updated_at">): Promise<Stat> {
    try {
      const { data, error } = await supabase
        .from("stats")
        .insert([
          {
            label: statData.label,
            number: statData.number,
            value: statData.value || statData.number,
            icon: statData.icon || "TrendingUp",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error adding stat:", error)
        throw new Error(`Failed to add stat: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error adding stat:", error)
      throw error
    }
  }

  async updateStat(id: number, statData: Partial<Omit<Stat, "id" | "created_at" | "updated_at">>): Promise<Stat> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      if (statData.label !== undefined) updateData.label = statData.label
      if (statData.number !== undefined) updateData.number = statData.number
      if (statData.value !== undefined) updateData.value = statData.value
      if (statData.icon !== undefined) updateData.icon = statData.icon

      const { data, error } = await supabase.from("stats").update(updateData).eq("id", id).select().single()

      if (error) {
        console.error("Error updating stat:", error)
        throw new Error(`Failed to update stat: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error updating stat:", error)
      throw error
    }
  }

  async deleteStat(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("stats").delete().eq("id", id)

      if (error) {
        console.error("Error deleting stat:", error)
        throw new Error(`Failed to delete stat: ${error.message}`)
      }
    } catch (error) {
      console.error("Error deleting stat:", error)
      throw error
    }
  }

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    try {
      const { data, error } = await supabase.from("faqs").select("*").order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching FAQs:", error)
        return []
      }
      return data || []
    } catch (error) {
      console.error("Error fetching FAQs:", error)
      return []
    }
  }

  async addFAQ(faqData: Omit<FAQ, "id" | "created_at" | "updated_at">): Promise<FAQ> {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .insert([
          {
            question: faqData.question,
            answer: faqData.answer,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error adding FAQ:", error)
        throw new Error(`Failed to add FAQ: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error adding FAQ:", error)
      throw error
    }
  }

  async updateFAQ(id: number, faqData: Partial<Omit<FAQ, "id" | "created_at" | "updated_at">>): Promise<FAQ> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      if (faqData.question !== undefined) updateData.question = faqData.question
      if (faqData.answer !== undefined) updateData.answer = faqData.answer

      const { data, error } = await supabase.from("faqs").update(updateData).eq("id", id).select().single()

      if (error) {
        console.error("Error updating FAQ:", error)
        throw new Error(`Failed to update FAQ: ${error.message}`)
      }
      return data
    } catch (error) {
      console.error("Error updating FAQ:", error)
      throw error
    }
  }

  async deleteFAQ(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("faqs").delete().eq("id", id)

      if (error) {
        console.error("Error deleting FAQ:", error)
        throw new Error(`Failed to delete FAQ: ${error.message}`)
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error)
      throw error
    }
  }

  // Contact Settings
  async getContactSettings(): Promise<ContactSettings | null> {
    try {
      const { data, error } = await supabase.from("contact_settings").select("*").limit(1).single()

      if (error) {
        console.error("Error fetching contact settings:", error)
        return {
          id: 1,
          hero_title: "تواصل معنا",
          hero_subtitle: "نحن هنا لمساعدتك",
          hero_description: "لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة",
          form_title: "أرسل لنا رسالة",
          form_description: "سنقوم بالرد عليك في أقرب وقت ممكن",
          info_title: "معلومات التواصل",
          info_description: "يمكنك التواصل معنا من خلال الطرق التالية",
          map_title: "موقعنا",
          map_embed_url: "",
          office_hours: "الأحد - الخميس: 9:00 ص - 6:00 م",
          response_time: "نرد خلال 24 ساعة",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return data
    } catch (error) {
      console.error("Error fetching contact settings:", error)
      return null
    }
  }

  async updateContactSettings(
    contactData: Partial<Omit<ContactSettings, "id" | "created_at" | "updated_at">>,
  ): Promise<void> {
    try {
      const { error } = await supabase.from("contact_settings").upsert({
        id: 1,
        ...contactData,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error updating contact settings:", error)
        throw new Error(`Failed to update contact settings: ${error.message}`)
      }
    } catch (error) {
      console.error("Error updating contact settings:", error)
      throw error
    }
  }
}

export const db = new Database()
