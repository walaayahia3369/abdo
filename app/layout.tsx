import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/hooks/use-cart"
import Link from "next/link"
import { ShoppingCart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchDialog } from "@/components/search-dialog"
import { MobileNav } from "@/components/mobile-nav"
import Image from "next/image"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "EazySoft - حلول الأمان والتكنولوجيا الذكية",
  description:
    "نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان",
  generator: "easysoft.com",
  icons: {
    icon: "/easyoft-logo.png", // مسار اللوجو كـ favicon
  },
  openGraph: {
    title: "EazySoft - حلول الأمان والتكنولوجيا الذكية",
    description:
      "نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان",
    images: ["/easyoft-logo.png"], // صورة تظهر عند مشاركة الرابط
  },
};

function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
      <Link href="/" className="text-easyoft-navy hover:text-brand-primary transition-colors font-medium">
        الرئيسية
      </Link>
      <Link href="/products" className="text-easyoft-navy hover:text-brand-primary transition-colors font-medium">
        المنتجات
      </Link>
      <Link href="/shop" className="text-easyoft-navy hover:text-brand-primary transition-colors font-medium">
        المتجر
      </Link>
      <Link href="/about" className="text-easyoft-navy hover:text-brand-primary transition-colors font-medium">
        من نحن
      </Link>
      <Link href="/contact" className="text-easyoft-navy hover:text-brand-primary transition-colors font-medium">
        تواصل معنا
      </Link>
    </nav>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-brand-primary to-easyoft-blue text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@easyoft.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>مرحباً بكم في EazySoft - خدمة عملاء 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <Image src="/easyoft-logo.png" alt="EazySoft" width={120} height={40} className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Search and Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <SearchDialog />
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-easyoft-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/easyoft-logo.png"
              alt="EazySoft"
              width={120}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              نقدم أحدث حلول الأمان والتكنولوجيا الذكية للمنازل والشركات مع خدمة عملاء متميزة على مدار الساعة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link
                href="#"
                className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center hover:bg-brand-secondary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center hover:bg-brand-secondary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center hover:bg-brand-secondary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center hover:bg-brand-secondary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">الفئات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/cameras" className="text-gray-300 hover:text-white transition-colors">
                  كاميرات المراقبة
                </Link>
              </li>
              <li>
                <Link href="/category/alarms" className="text-gray-300 hover:text-white transition-colors">
                  أنظمة الإنذار
                </Link>
              </li>
              <li>
                <Link href="/category/smart-locks" className="text-gray-300 hover:text-white transition-colors">
                  الأقفال الذكية
                </Link>
              </li>
              <li>
                <Link href="/category/smart-home" className="text-gray-300 hover:text-white transition-colors">
                  المنازل الذكية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات التواصل</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-primary" />
                <span className="text-gray-300">+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-primary" />
                <span className="text-gray-300">info@easyoft.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-primary mt-0.5" />
                <span className="text-gray-300">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2024 EazySoft. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
