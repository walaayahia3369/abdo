import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Product {
  id: number
  name: string
  price: number
  original_price?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  features: string[]
  in_stock: boolean
  badge?: string | null
  description: string
  specifications: Record<string, string>
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  description: string
  image: string
  slug: string
  product_count: number
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  username: string
  password: string
  role: "admin" | "user"
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id?: number
  hero_title: string
  hero_subtitle: string
  hero_background_image: string
  featured_section_title: string
  featured_section_subtitle: string
  created_at: string
  updated_at: string
}

export interface ContactInfo {
  id?: number
  phone: string
  email: string
  address: string
  working_hours: string
  whatsapp?: string
  facebook?: string
  twitter?: string
  instagram?: string
  created_at: string
  updated_at: string
}
