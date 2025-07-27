import { supabase } from "./supabase"
import type { Product, Category, User, SiteSettings, ContactInfo } from "./supabase"

export type { Product, Category, User, SiteSettings, ContactInfo }

// Database functions
export const db = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return data || []
  },

  getProductById: async (id: number): Promise<Product | null> => {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching product:", error)
      return null
    }

    return data
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products by category:", error)
      return []
    }

    return data || []
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching featured products:", error)
      return []
    }

    return data || []
  },

  addProduct: async (product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product | null> => {
    const { data, error } = await supabase.from("products").insert([product]).select().single()

    if (error) {
      console.error("Error adding product:", error)
      return null
    }

    return data
  },

  updateProduct: async (id: number, updates: Partial<Product>): Promise<Product | null> => {
    const { data, error } = await supabase
      .from("products")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating product:", error)
      return null
    }

    return data
  },

  deleteProduct: async (id: number): Promise<boolean> => {
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error("Error deleting product:", error)
      return false
    }

    return true
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    const { data, error } = await supabase.from("categories").select("*").order("name")

    if (error) {
      console.error("Error fetching categories:", error)
      return []
    }

    return data || []
  },

  getCategoryBySlug: async (slug: string): Promise<Category | null> => {
    const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single()

    if (error) {
      console.error("Error fetching category:", error)
      return null
    }

    return data
  },

  getCategoryById: async (id: number): Promise<Category | null> => {
    const { data, error } = await supabase.from("categories").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching category:", error)
      return null
    }

    return data
  },

  addCategory: async (category: Omit<Category, "id" | "created_at" | "updated_at">): Promise<Category | null> => {
    const { data, error } = await supabase.from("categories").insert([category]).select().single()

    if (error) {
      console.error("Error adding category:", error)
      return null
    }

    return data
  },

  updateCategory: async (id: number, updates: Partial<Category>): Promise<Category | null> => {
    const { data, error } = await supabase
      .from("categories")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating category:", error)
      return null
    }

    return data
  },

  deleteCategory: async (id: number): Promise<boolean> => {
    const { error } = await supabase.from("categories").delete().eq("id", id)

    if (error) {
      console.error("Error deleting category:", error)
      return false
    }

    return true
  },

  // Users
  getUserByCredentials: async (username: string, password: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single()

    if (error) {
      console.error("Error fetching user:", error)
      return null
    }

    return data
  },

  updateUserPassword: async (username: string, newPassword: string): Promise<boolean> => {
    const { error } = await supabase
      .from("users")
      .update({ password: newPassword, updated_at: new Date().toISOString() })
      .eq("username", username)

    if (error) {
      console.error("Error updating password:", error)
      return false
    }

    return true
  },

  // Site Settings
  getSiteSettings: async (): Promise<SiteSettings | null> => {
    const { data, error } = await supabase.from("site_settings").select("*").limit(1).single()

    if (error) {
      console.error("Error fetching site settings:", error)
      return null
    }

    return data
  },

  updateSiteSettings: async (updates: Partial<SiteSettings>): Promise<SiteSettings | null> => {
    // First check if settings exist
    const { data: existing } = await supabase.from("site_settings").select("id").limit(1).single()

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from("site_settings")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating site settings:", error)
        return null
      }

      return data
    } else {
      // Insert new
      const { data, error } = await supabase.from("site_settings").insert([updates]).select().single()

      if (error) {
        console.error("Error creating site settings:", error)
        return null
      }

      return data
    }
  },

  // Contact Info
  getContactInfo: async (): Promise<ContactInfo | null> => {
    const { data, error } = await supabase.from("contact_info").select("*").limit(1).single()

    if (error) {
      console.error("Error fetching contact info:", error)
      return null
    }

    return data
  },

  updateContactInfo: async (updates: Partial<ContactInfo>): Promise<ContactInfo | null> => {
    // First check if contact info exists
    const { data: existing } = await supabase.from("contact_info").select("id").limit(1).single()

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from("contact_info")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating contact info:", error)
        return null
      }

      return data
    } else {
      // Insert new
      const { data, error } = await supabase.from("contact_info").insert([updates]).select().single()

      if (error) {
        console.error("Error creating contact info:", error)
        return null
      }

      return data
    }
  },
}
