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
  category: string
  brand: string
  badge?: string
  rating: number
  reviews: number
  features: string[]
  specifications: Record<string, string>
  in_stock: boolean
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
  position: string
  image: string
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
  value: string
  icon: string
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
  title: string
  subtitle: string
  description: string
  created_at: string
  updated_at: string
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

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

      if (error) {
        console.error("Error fetching categories:", error)
        return []
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

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings | null> {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).single()

      if (error) {
        console.error("Error fetching site settings:", error)
        return {
          id: 1,
          hero_title: "مرحباً بكم في EASYoft",
          hero_subtitle: "حلول تقنية متطورة لحياة أكثر أماناً وراحة",
          featured_section_title: "المنتجات المميزة",
          featured_section_subtitle: "اكتشف أحدث منتجاتنا التقنية عالية الجودة",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return data
    } catch (error) {
      console.error("Error fetching site settings:", error)
      return null
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return data
    } catch (error) {
      console.error("Error fetching contact info:", error)
      return null
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

  // Contact Settings
  async getContactSettings(): Promise<ContactSettings | null> {
    try {
      const { data, error } = await supabase.from("contact_settings").select("*").limit(1).single()

      if (error) {
        console.error("Error fetching contact settings:", error)
        return null
      }
      return data
    } catch (error) {
      console.error("Error fetching contact settings:", error)
      return null
    }
  }
}

export const db = new Database()
