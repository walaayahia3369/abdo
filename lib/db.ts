// Enhanced database with site settings
export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  features: string[]
  inStock: boolean
  badge?: string | null
  description: string
  specifications: Record<string, string>
  isFeatured: boolean
}

export interface Category {
  id: number
  name: string
  description: string
  image: string
  slug: string
  productCount: number
}

export interface User {
  id: number
  username: string
  password: string
  role: "admin" | "user"
}

export interface SiteSettings {
  heroTitle: string
  heroSubtitle: string
  heroBackgroundImage: string
  featuredSectionTitle: string
  featuredSectionSubtitle: string
}

// Mock data
const products: Product[] = [
  {
    id: 1,
    name: "جهاز بصمة ZKTeco F18 Pro",
    price: 1250,
    originalPrice: 1450,
    image: "/images/fingerprint-device.png",
    category: "أجهزة البصمة",
    brand: "ZKTeco",
    rating: 4.8,
    reviews: 124,
    features: ["تعرف بيومتري دقيق", "ذاكرة 3000 بصمة", "شاشة ملونة"],
    inStock: true,
    badge: "الأكثر مبيعاً",
    description: "جهاز بصمة متطور يوفر أعلى مستويات الأمان مع تقنية التعرف البيومتري الدقيق",
    specifications: {
      السعة: "3000 بصمة",
      الشاشة: "2.8 بوصة ملونة",
      التوصيل: "TCP/IP, USB",
      الطاقة: "12V DC",
      "درجة الحرارة": "-10°C إلى +60°C",
    },
    isFeatured: true,
  },
  {
    id: 2,
    name: "بوابة إلكترونية HID ProxPoint Plus",
    price: 3500,
    originalPrice: 3800,
    image: "/images/smart-gate.png",
    category: "البوابات الإلكترونية",
    brand: "HID",
    rating: 4.9,
    reviews: 89,
    features: ["تحكم متقدم بالوصول", "مقاوم للعوامل الجوية", "تشفير عالي"],
    inStock: true,
    badge: "جديد",
    description: "بوابة إلكترونية ذكية مع نظام تحكم متقدم بالوصول وحماية عالية المستوى",
    specifications: {
      "نوع القارئ": "Proximity",
      المدى: "حتى 15 سم",
      التشفير: "128-bit",
      المقاومة: "IP65",
      التشغيل: "12-24V DC",
    },
    isFeatured: true,
  },
  {
    id: 3,
    name: "كاميرا مراقبة 4K Hikvision",
    price: 850,
    originalPrice: 950,
    image: "/images/surveillance-camera.png",
    category: "كاميرات المراقبة",
    brand: "Hikvision",
    rating: 4.7,
    reviews: 203,
    features: ["دقة 4K", "رؤية ليلية", "مقاومة للماء IP67"],
    inStock: true,
    badge: null,
    description: "كاميرا مراقبة احترافية بدقة 4K مع رؤية ليلية متقدمة ومقاومة للعوامل الجوية",
    specifications: {
      الدقة: "4K (3840×2160)",
      العدسة: "2.8-12mm",
      "الرؤية الليلية": "حتى 30 متر",
      المقاومة: "IP67",
      التسجيل: "H.265+/H.264+",
    },
    isFeatured: true,
  },
  {
    id: 4,
    name: "نظام منزل ذكي SmartLife Pro",
    price: 5200,
    originalPrice: 5800,
    image: "/images/smart-home.png",
    category: "المنازل الذكية",
    brand: "SmartLife",
    rating: 4.9,
    reviews: 67,
    features: ["تحكم كامل بالإضاءة", "إدارة التكييف", "نظام أمان متكامل"],
    inStock: true,
    badge: "مميز",
    description: "نظام منزل ذكي متكامل يوفر التحكم الكامل في جميع أجهزة المنزل",
    specifications: {
      المكونات: "Hub + 10 أجهزة ذكية",
      التوصيل: "WiFi, Zigbee, Bluetooth",
      التطبيق: "SmartLife App",
      التوافق: "Alexa, Google Home",
      الضمان: "سنتان",
    },
    isFeatured: true,
  },
  {
    id: 5,
    name: "جهاز بصمة ZKTeco K40 Pro",
    price: 890,
    originalPrice: 1050,
    image: "/images/fingerprint-device.png",
    category: "أجهزة البصمة",
    brand: "ZKTeco",
    rating: 4.6,
    reviews: 156,
    features: ["شاشة لمس 2.8 بوصة", "ذاكرة 1000 بصمة", "بطارية احتياطية"],
    inStock: true,
    badge: null,
    description: "جهاز بصمة عملي مع شاشة لمس وبطارية احتياطية",
    specifications: {
      السعة: "1000 بصمة",
      الشاشة: "2.8 بوصة لمس",
      البطارية: "احتياطية 4 ساعات",
      التوصيل: "TCP/IP, USB",
      الوزن: "0.8 كجم",
    },
    isFeatured: false,
  },
  {
    id: 6,
    name: "كاميرا PTZ دوارة Dahua",
    price: 1450,
    originalPrice: 1650,
    image: "/images/surveillance-camera.png",
    category: "كاميرات المراقبة",
    brand: "Dahua",
    rating: 4.8,
    reviews: 91,
    features: ["دوران 360 درجة", "زوم بصري 25x", "تتبع ذكي"],
    inStock: false,
    badge: "متقدم",
    description: "كاميرا PTZ متطورة مع إمكانيات دوران وزوم متقدمة",
    specifications: {
      الدوران: "360° أفقي، 90° عمودي",
      الزوم: "25x بصري",
      الدقة: "2MP Full HD",
      "الرؤية الليلية": "حتى 100 متر",
      التحكم: "عن بعد",
    },
    isFeatured: false,
  },
]

const categories: Category[] = [
  {
    id: 1,
    name: "أجهزة البصمة",
    description: "حلول أمنية عالية المستوى بتقنية التعرف البيومتري الدقيق",
    image: "/images/fingerprint-device.png",
    slug: "fingerprint-devices",
    productCount: 15,
  },
  {
    id: 2,
    name: "البوابات الإلكترونية",
    description: "حلول آمنة وفعالة لتنظيم الدخول والخروج",
    image: "/images/smart-gate.png",
    slug: "electronic-gates",
    productCount: 12,
  },
  {
    id: 3,
    name: "كاميرات المراقبة",
    description: "أنظمة مراقبة متقدمة بأحدث التقنيات",
    image: "/images/surveillance-camera.png",
    slug: "surveillance-cameras",
    productCount: 25,
  },
  {
    id: 4,
    name: "المنازل الذكية",
    description: "تحويل المنازل إلى بيئات ذكية متكاملة",
    image: "/images/smart-home.png",
    slug: "smart-homes",
    productCount: 18,
  },
]

const users: User[] = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
  },
]

let siteSettings: SiteSettings = {
  heroTitle: "حلول الأمان المتقدمة",
  heroSubtitle: "نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان",
  heroBackgroundImage: "/images/hero-security.png",
  featuredSectionTitle: "المنتجات المميزة",
  featuredSectionSubtitle: "أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية",
}

// Database functions
export const db = {
  // Products
  getProducts: () => products,
  getProductById: (id: number) => products.find((p) => p.id === id),
  getProductsByCategory: (category: string) => products.filter((p) => p.category === category),
  getFeaturedProducts: () => products.filter((p) => p.isFeatured),
  addProduct: (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Math.max(...products.map((p) => p.id)) + 1 }
    products.push(newProduct)
    return newProduct
  },
  updateProduct: (id: number, updates: Partial<Product>) => {
    const index = products.findIndex((p) => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...updates }
      return products[index]
    }
    return null
  },
  deleteProduct: (id: number) => {
    const index = products.findIndex((p) => p.id === id)
    if (index !== -1) {
      products.splice(index, 1)
      return true
    }
    return false
  },

  // Categories
  getCategories: () => categories,
  getCategoryBySlug: (slug: string) => categories.find((c) => c.slug === slug),
  getCategoryById: (id: number) => categories.find((c) => c.id === id),
  addCategory: (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: Math.max(...categories.map((c) => c.id)) + 1 }
    categories.push(newCategory)
    return newCategory
  },
  updateCategory: (id: number, updates: Partial<Category>) => {
    const index = categories.findIndex((c) => c.id === id)
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates }
      return categories[index]
    }
    return null
  },
  deleteCategory: (id: number) => {
    const index = categories.findIndex((c) => c.id === id)
    if (index !== -1) {
      categories.splice(index, 1)
      return true
    }
    return false
  },

  // Users
  getUserByCredentials: (username: string, password: string) =>
    users.find((u) => u.username === username && u.password === password),
  updateUserPassword: (username: string, newPassword: string) => {
    const user = users.find((u) => u.username === username)
    if (user) {
      user.password = newPassword
      return true
    }
    return false
  },

  // Site Settings
  getSiteSettings: () => siteSettings,
  updateSiteSettings: (updates: Partial<SiteSettings>) => {
    siteSettings = { ...siteSettings, ...updates }
    return siteSettings
  },
}
